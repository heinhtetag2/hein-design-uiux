import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Check, Mail } from "lucide-react";

type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
};

function SelectField({ label, name, value, onChange, options, placeholder = "Select one", required }: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className="flex flex-col gap-4 group" ref={ref}>
      <label className="text-eyebrow text-foreground/80 font-light">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={`w-full flex items-center justify-between bg-transparent border-b py-2 text-left text-body-lg font-light outline-none cursor-pointer transition-colors ${
            open ? "border-foreground" : "border-foreground/10 group-hover:border-foreground/40"
          } ${value ? "text-foreground" : "text-foreground/40"}`}
        >
          <span className="truncate pr-4">{value || placeholder}</span>
          <ChevronDown className={`size-4 text-foreground/40 transition-transform duration-200 ${open ? "rotate-180 text-foreground/70" : ""}`} />
        </button>

        {/* Hidden native input for form validation */}
        {required && (
          <input
            tabIndex={-1}
            aria-hidden
            className="absolute left-0 bottom-0 w-px h-px opacity-0 pointer-events-none"
            value={value}
            onChange={() => {}}
            required
          />
        )}

        <AnimatePresence>
          {open && (
            <motion.ul
              role="listbox"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="absolute z-50 left-0 right-0 top-[calc(100%+8px)] max-h-[280px] overflow-y-auto rounded-2xl border border-foreground/10 bg-background/80 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] py-1.5"
            >
              {options.map((opt) => {
                const selected = opt === value;
                return (
                  <li key={opt}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        onChange(name, opt);
                        setOpen(false);
                      }}
                      className={`w-full flex items-center justify-between gap-4 px-4 py-2.5 text-left text-body-sm font-light transition-colors cursor-pointer ${
                        selected
                          ? "text-foreground bg-foreground/[0.04]"
                          : "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04]"
                      }`}
                    >
                      <span className="truncate">{opt}</span>
                      {selected && <Check className="size-3.5 text-brand shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Get your free access key at https://web3forms.com (enter heindsgn@gmail.com)
const WEB3FORMS_KEY = "944603d9-98d2-4a2e-b037-25ed4e107fb0";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelect = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValid = formData.name.trim() && formData.email.trim() && formData.service && formData.message.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || status === "sending") return;

    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New inquiry from ${formData.name} — ${formData.service}`,
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          service: formData.service,
          budget: formData.budget || "Not specified",
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", service: "", budget: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-display pt-page pb-20 w-screen ml-[calc(-50vw+50%)]">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 px-6">
        {/* Left Side */}
        <div className="flex flex-col items-start pt-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif font-light text-display-lg mb-16"
          >
            Let's talk.
          </motion.h1>

          <div className="flex flex-col gap-8 max-w-[400px]">
            <div className="flex flex-col gap-4">
              <h3 className="text-h3 font-light text-foreground">Have a project in mind?</h3>
              <p className="text-body-lg text-foreground/60 font-light">
                Tell me about your product, the problem you're solving, and where you need design support — from early concepts to full product experiences.
              </p>
              <p className="text-body-lg text-foreground/60 font-light">
                I read every message and typically reply within 24 hours.
              </p>
            </div>

            <a href="mailto:heindsgn@gmail.com" className="group inline-flex items-center gap-2 text-body-lg text-foreground/80 w-fit hover:text-foreground transition-colors cursor-pointer font-light">
              <Mail className="size-[18px] shrink-0" strokeWidth={1.5} aria-hidden />
              <span className="border-b border-foreground/40 pb-px group-hover:border-foreground transition-colors">
                heindsgn@gmail.com
              </span>
            </a>
          </div>

          {/* Social Links Bottom Left */}
          <div className="mt-auto pt-16 md:pt-40 flex flex-row gap-6 text-body text-foreground font-light lowercase">
            <a href="#" className="hover:opacity-60 transition-opacity">Linkedin</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Instagram</a>
            <a href="#" className="hover:opacity-60 transition-opacity">X</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Medium</a>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col gap-12 pt-10">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center gap-6 py-32 text-center"
              >
                <div className="size-16 rounded-full border border-foreground/15 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h2 className="font-serif font-light text-h1">
                  Message sent.
                </h2>
                <p className="text-body-lg text-foreground/60 font-light max-w-[360px]">
                  Thanks for reaching out — I'll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-body-sm text-foreground/60 border-b border-foreground/20 pb-px hover:text-foreground hover:border-foreground transition-colors cursor-pointer font-light"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 w-full"
              >
                <div className="flex flex-col gap-4 group">
                  <label className="text-eyebrow text-foreground/80 font-light">Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="bg-transparent border-b border-foreground/10 py-2 focus:border-foreground outline-none transition-colors text-body-lg font-light placeholder:text-foreground/40"
                  />
                </div>

                <div className="flex flex-col gap-4 group">
                  <label className="text-eyebrow text-foreground/80 font-light">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="bg-transparent border-b border-foreground/10 py-2 focus:border-foreground outline-none transition-colors text-body-lg font-light placeholder:text-foreground/40"
                  />
                </div>

                <SelectField
                  label="What do you need help with?*"
                  name="service"
                  value={formData.service}
                  onChange={handleSelect}
                  required
                  options={[
                    "Product Design",
                    "UX/UI Design",
                    "Design System",
                    "App Design",
                    "Brand & Visual Design",
                    "Other",
                  ]}
                />

                <SelectField
                  label="Budget range"
                  name="budget"
                  value={formData.budget}
                  onChange={handleSelect}
                  options={["Under $5k", "$5k – $15k", "$15k – $50k", "$50k+"]}
                />

                <div className="flex flex-col gap-4 group md:col-span-2">
                  <label className="text-eyebrow text-foreground/80 font-light">Message*</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your project..."
                    rows={4}
                    className="bg-transparent border-b border-foreground/10 py-2 focus:border-foreground outline-none transition-colors text-body-lg font-light placeholder:text-foreground/40 resize-none"
                  />
                </div>

                <div className="md:col-span-2 flex flex-row items-center justify-between pt-8">
                  {status === "error" && (
                    <p className="text-body-sm text-destructive font-light">
                      Something went wrong — try again or email me directly.
                    </p>
                  )}
                  <div className="ml-auto">
                    <button
                      type="submit"
                      disabled={!isValid || status === "sending"}
                      className="bg-brand text-brand-foreground px-8 h-[40px] rounded-full font-light text-body-sm hover:opacity-85 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {status === "sending" ? (
                        <>
                          <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="opacity-25" />
                            <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Send message"
                      )}
                    </button>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
