import { isSupabaseConfigured, supabase } from "./supabase";

export const VISITOR_STORAGE_KEY = "26p:visitor:v1";
export const VISITORS_LIST_KEY = "26p:visitors:v1";

const MAX_VISITORS = 200;
const SUPABASE_TABLE = "visitors";

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
  if (!isSupabaseConfigured || !supabase) return readVisitorsLocal();
  try {
    const { data, error } = await supabase
      .from(SUPABASE_TABLE)
      .select("name,color,no,issued_at,role,created_at")
      .order("created_at", { ascending: false })
      .limit(MAX_VISITORS);
    if (error) throw error;
    return (data ?? []).map((row: any) => ({
      name: row.name,
      color: row.color,
      no: String(row.no),
      issuedAt: row.issued_at,
      role: row.role ?? undefined,
      createdAt: row.created_at ? new Date(row.created_at).getTime() : undefined,
    }));
  } catch (err) {
    console.warn("[visitors] remote fetch failed, using local list", err);
    return readVisitorsLocal();
  }
}

// Append to local list (always) AND remote table (if configured).
export async function appendVisitor(v: Visitor): Promise<Visitor[]> {
  const stamped: Visitor = { ...v, createdAt: v.createdAt ?? Date.now() };

  // Local write — always
  const list = readVisitorsLocal();
  const next = [stamped, ...list].slice(0, MAX_VISITORS);
  try {
    window.localStorage.setItem(VISITORS_LIST_KEY, JSON.stringify(next));
  } catch {
    // ignore quota errors
  }

  // Remote write — best-effort
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from(SUPABASE_TABLE).insert({
        name: stamped.name,
        color: stamped.color,
        no: stamped.no,
        issued_at: stamped.issuedAt,
        role: stamped.role ?? null,
      });
      if (error) throw error;
    } catch (err) {
      console.warn("[visitors] remote insert failed", err);
    }
  }

  return next;
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
