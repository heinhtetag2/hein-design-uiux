// NOTE: the Supabase client (~50KB gzipped) is imported lazily inside the async
// functions below so it never lands in the initial bundle. These calls only run
// after a user interaction (saving a visitor card / opening the gallery), so the
// dynamic import adds no perceptible latency and keeps first paint lean.

export const VISITOR_STORAGE_KEY = "26p:visitor:v1";
export const VISITORS_LIST_KEY = "26p:visitors:v1";
// Set once the onboarding intro has been shown — so it appears only on the true
// first visit, not on every refresh when a visitor neither fills nor skips.
export const VISITOR_INTRO_SEEN_KEY = "26p:visitor:intro-seen:v1";

const MAX_VISITORS = 200;
const SUPABASE_TABLE = "visitors";
// Names used by setup/connectivity probes — filtered out of the gallery on read so
// leftover test rows never appear even before they're deleted from the table.
const TEST_ROW_NAMES = new Set(["__conn_test__", "__upsert_probe__"]);

export type Visitor = {
  name: string;
  color: string;
  no: string;
  issuedAt: string;
  role?: string;
  createdAt?: number;
};

// Synchronous local read — used as a fast first paint before the network call resolves.
export function readVisitorsLocal(): Visitor[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(VISITORS_LIST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isVisitor) : [];
  } catch {
    return [];
  }
}

// Backwards-compatible alias (older callers).
export const readVisitors = readVisitorsLocal;

// Remote-aware read. Falls back to local list when Supabase isn't configured or the call fails.
export async function fetchVisitors(): Promise<Visitor[]> {
  const { isSupabaseConfigured, supabase } = await import("./supabase");
  if (!isSupabaseConfigured || !supabase) return readVisitorsLocal();
  try {
    const { data, error } = await supabase
      .from(SUPABASE_TABLE)
      .select("name,color,no,issued_at,role,created_at")
      .order("created_at", { ascending: false })
      .limit(MAX_VISITORS);
    if (error) throw error;
    const mapped: Visitor[] = (data ?? [])
      // Hide setup/connectivity probe rows that can't be deleted via the anon key.
      .filter((row: any) => !TEST_ROW_NAMES.has(row.name))
      .map((row: any) => ({
        name: row.name,
        color: row.color,
        no: String(row.no),
        issuedAt: row.issued_at,
        role: row.role ?? undefined,
        createdAt: row.created_at ? new Date(row.created_at).getTime() : undefined,
      }));
    // Collapse cards that share a pass no. to the newest one. Editing a card without
    // an UPDATE policy inserts a fresh row, so the table can hold older copies —
    // rows come back newest-first, so the first `no` we see is the one to keep.
    return dedupeByNo(mapped);
  } catch (err) {
    console.warn("[visitors] remote fetch failed, using local list", err);
    return readVisitorsLocal();
  }
}

// Outcome of the remote half of a save:
//   "ok"      — stored in Supabase, visible to everyone
//   "skipped" — Supabase not configured (local-only preview)
//   "failed"  — Supabase configured but the insert errored (dead project, RLS, offline)
export type RemoteStatus = "ok" | "skipped" | "failed";

export type AppendResult = {
  visitors: Visitor[];
  remote: RemoteStatus;
};

// Save a card to the local list (always) AND remote table (if configured).
// Upserts by pass `no`: a first save inserts, and "Edit my card" replaces the
// existing card in place instead of piling up duplicates.
export async function appendVisitor(v: Visitor): Promise<AppendResult> {
  const stamped: Visitor = { ...v, createdAt: v.createdAt ?? Date.now() };

  // Local write — always. Drop any prior card with the same pass no. first so an
  // edit updates in place rather than adding a second copy.
  const list = readVisitorsLocal().filter((x) => x.no !== stamped.no);
  const next = [stamped, ...list].slice(0, MAX_VISITORS);
  try {
    window.localStorage.setItem(VISITORS_LIST_KEY, JSON.stringify(next));
  } catch {
    // ignore quota errors
  }

  // Remote write — best-effort. Client is imported on demand (see note above).
  const { isSupabaseConfigured, supabase } = await import("./supabase");
  if (!isSupabaseConfigured || !supabase) {
    return { visitors: next, remote: "skipped" };
  }

  const row = {
    name: stamped.name,
    color: stamped.color,
    no: stamped.no,
    issued_at: stamped.issuedAt,
    role: stamped.role ?? null,
  };

  try {
    // Preferred path: upsert by pass no. so an edit updates the row in place.
    // Requires a unique index on visitors.no (scripts/supabase-fix-edit-card.sql).
    const { error } = await supabase.from(SUPABASE_TABLE).upsert(row, { onConflict: "no" });
    if (!error) return { visitors: next, remote: "ok" };

    // 42P10 = no unique/exclusion constraint matching ON CONFLICT: the index hasn't
    // been added. Fall back to a plain insert so the save still lands; fetchVisitors
    // dedupes by no. on read, so the gallery still shows just the latest card.
    if (error.code === "42P10") {
      const { error: insertError } = await supabase.from(SUPABASE_TABLE).insert(row);
      if (insertError) throw insertError;
      return { visitors: next, remote: "ok" };
    }
    throw error;
  } catch (err) {
    console.warn("[visitors] remote save failed", err);
    return { visitors: next, remote: "failed" };
  }
}

// Keep the first card seen for each pass no. Callers pass a newest-first list, so
// "first" is the most recent version of a card that was edited into new rows.
function dedupeByNo(list: Visitor[]): Visitor[] {
  const seen = new Set<string>();
  const out: Visitor[] = [];
  for (const v of list) {
    if (seen.has(v.no)) continue;
    seen.add(v.no);
    out.push(v);
  }
  return out;
}

function isVisitor(x: unknown): x is Visitor {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.name === "string" &&
    typeof o.color === "string" &&
    typeof o.no === "string" &&
    typeof o.issuedAt === "string"
  );
}
