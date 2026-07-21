import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, X, ArrowUpRight } from "lucide-react";

// Passcode gate for a project's "View Prototype" button. Casual protection only:
// the prototype URL still ships in the client bundle, so this deters normal
// visitors, not someone digging through dev tools. A correct code unlocks the
// prototype persistently on that device (localStorage) so refreshes and repeat
// visits don't re-prompt.

export interface PrototypeGateState {
  open: boolean;
  code: string;
  error: boolean;
  setCode: (v: string) => void;
  submit: () => void;
  close: () => void;
}

export interface PrototypeGate {
  /** True when a passcode is configured for this project. */
  locked: boolean;
  /** True once the visitor has entered the correct code on this device. */
  unlocked: boolean;
  /** Attach to the "View Prototype" link's onClick — opens the gate when locked. */
  onProtoClick: (e: React.MouseEvent) => void;
  state: PrototypeGateState;
}

export function usePrototypeGate(
  view: string,
  prototypeUrl: string,
  passcode?: string,
): PrototypeGate {
  const locked = !!passcode;
  const unlockKey = `26p:proto-unlock:${view}`;
  const [unlocked, setUnlocked] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    try {
      setUnlocked(localStorage.getItem(unlockKey) === "1");
    } catch {
      /* localStorage unavailable — stays locked */
    }
  }, [unlockKey]);

  const onProtoClick = (e: React.MouseEvent) => {
    if (!locked || unlocked) return; // public or already unlocked → normal link
    e.preventDefault();
    setCode("");
    setError(false);
    setOpen(true);
  };

  const submit = () => {
    if (code.trim() === passcode) {
      try {
        localStorage.setItem(unlockKey, "1");
      } catch {
        /* ignore */
      }
      setUnlocked(true);
      setOpen(false);
      window.open(prototypeUrl, "_blank", "noopener,noreferrer");
    } else {
      setError(true);
    }
  };

  return {
    locked,
    unlocked,
    onProtoClick,
    state: {
      open,
      code,
      error,
      setCode: (v: string) => {
        setCode(v);
        if (error) setError(false);
      },
      submit,
      close: () => setOpen(false),
    },
  };
}

export function PrototypeGateModal({ label, state }: { label: string; state: PrototypeGateState }) {
  return (
    <AnimatePresence>
      {state.open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9000] flex items-center justify-center px-6 bg-background/70 backdrop-blur-md"
          onClick={state.close}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[380px] rounded-3xl border border-foreground/15 bg-background/90 px-8 pb-8 pt-9 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]"
          >
            <button
              type="button"
              onClick={state.close}
              aria-label="Close"
              className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-foreground/40 transition-colors hover:bg-foreground/5 hover:text-foreground cursor-pointer"
            >
              <X className="size-3.5" />
            </button>

            {/* Centered lock badge */}
            <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.06]">
              <Lock className="size-5 text-foreground/80" strokeWidth={1.5} />
            </div>

            <p className="mt-6 font-display text-eyebrow uppercase tracking-[0.2em] text-foreground/40">
              Protected Prototype
            </p>
            <h3 className="mt-2 font-serif font-light text-h3 text-foreground leading-tight">
              {label}
            </h3>
            <p className="mx-auto mt-2 max-w-[260px] font-display font-light text-body-sm text-foreground/55">
              This prototype is private. Enter the passcode to continue.
            </p>

            <input
              type="password"
              autoFocus
              value={state.code}
              onChange={(e) => state.setCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") state.submit();
              }}
              placeholder="Passcode"
              className={`mt-7 w-full rounded-full border bg-transparent px-5 py-3 text-center font-display text-body-sm tracking-[0.08em] text-foreground outline-none transition-colors placeholder:tracking-normal placeholder:text-foreground/30 ${
                state.error ? "border-[#c8456a]" : "border-foreground/20 focus:border-foreground"
              }`}
            />

            {/* Reserve the error line's height so the button doesn't jump on error */}
            <p
              className={`mt-2 h-[16px] font-display text-caption text-[#c8456a] transition-opacity ${
                state.error ? "opacity-100" : "opacity-0"
              }`}
            >
              Wrong passcode. Try again.
            </p>

            <button
              type="button"
              onClick={state.submit}
              disabled={!state.code.trim()}
              className="mt-3 flex h-[46px] w-full items-center justify-center gap-2 rounded-full bg-foreground font-display text-body-sm text-background transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Unlock
              <ArrowUpRight className="size-4" strokeWidth={1.75} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
