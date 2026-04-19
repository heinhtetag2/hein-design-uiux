import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

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
    <div className="min-h-screen bg-background text-foreground selection:bg-[#584dff] selection:text-white font-['Clash_Grotesk_Variable',sans-serif] pt-[120px] pb-20 w-screen ml-[calc(-50vw+50%)]">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 px-4 md:px-6">
        {/* Left Side */}
        <div className="flex flex-col items-start pt-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-['Cormorant',serif] font-light text-[clamp(60px,10vw,120px)] leading-[0.9] tracking-tight mb-16"
          >
            Let's talk.
          </motion.h1>

          <div className="flex flex-col gap-8 max-w-[400px]">
            <div className="flex flex-col gap-4">
              <h3 className="text-[20px] font-normal text-foreground">Have a project in mind?</h3>
              <p className="text-[18px] text-foreground/60 font-light leading-relaxed">
                Tell me about your product, the problem you're solving, and where you need design support — from early concepts to full product experiences.
              </p>
              <p className="text-[18px] text-foreground/60 font-light leading-relaxed">
                I read every message and typically reply within 24 hours.
              </p>
            </div>

            <a href="mailto:heindsgn@gmail.com" className="text-[18px] text-foreground/80 border-b border-foreground/40 pb-px w-fit hover:border-foreground transition-colors cursor-pointer font-light">
              heindsgn@gmail.com
            </a>
          </div>

          {/* Social Links Bottom Left */}
          <div className="mt-auto pt-16 md:pt-40 flex flex-row gap-6 text-[16px] text-white font-light lowercase">
            <a href="#" className="hover:text-foreground transition-colors">Linkedin</a>
            <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
            <a href="#" className="hover:text-foreground transition-colors">X</a>
            <a href="#" className="hover:text-foreground transition-colors">Medium</a>
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
                <h2 className="font-['Cormorant',serif] font-light text-[48px] leading-tight tracking-tight">
                  Message sent.
                </h2>
                <p className="text-[18px] text-foreground/60 font-light max-w-[360px]">
                  Thanks for reaching out — I'll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-[14px] text-foreground/60 border-b border-foreground/20 pb-px hover:text-foreground hover:border-foreground transition-colors cursor-pointer font-light"
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
                  <label className="text-[14px] text-foreground/80 uppercase tracking-widest font-light">Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="bg-transparent border-b border-foreground/10 py-2 focus:border-foreground outline-none transition-colors text-[18px] font-light placeholder:text-foreground/40"
                  />
                </div>

                <div className="flex flex-col gap-4 group">
                  <label className="text-[14px] text-foreground/80 uppercase tracking-widest font-light">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="bg-transparent border-b border-foreground/10 py-2 focus:border-foreground outline-none transition-colors text-[18px] font-light placeholder:text-foreground/40"
                  />
                </div>

                <div className="flex flex-col gap-4 group">
                  <label className="text-[14px] text-foreground/80 uppercase tracking-widest font-light">What do you need help with?*</label>
                  <div className="relative border-b border-foreground/10 py-2 cursor-pointer group-hover:border-foreground transition-colors">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="bg-transparent w-full appearance-none outline-none text-[18px] font-light cursor-pointer pr-8 text-foreground"
                    >
                      <option value="" className="bg-background text-foreground">Select one</option>
                      <option className="bg-background text-foreground" value="Product Design">Product Design</option>
                      <option className="bg-background text-foreground" value="UX/UI Design">UX/UI Design</option>
                      <option className="bg-background text-foreground" value="Design System">Design System</option>
                      <option className="bg-background text-foreground" value="App Design">App Design</option>
                      <option className="bg-background text-foreground" value="Brand & Visual Design">Brand & Visual Design</option>
                      <option className="bg-background text-foreground" value="Other">Other</option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/40">
                      <ChevronDown className="size-4" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 group">
                  <label className="text-[14px] text-foreground/80 uppercase tracking-widest font-light">Budget range</label>
                  <div className="relative border-b border-foreground/10 py-2 cursor-pointer group-hover:border-foreground transition-colors">
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="bg-transparent w-full appearance-none outline-none text-[18px] font-light cursor-pointer pr-8 text-foreground"
                    >
                      <option value="" className="bg-background text-foreground">Select one</option>
                      <option className="bg-background text-foreground" value="Under $5k">Under $5k</option>
                      <option className="bg-background text-foreground" value="$5k – $15k">$5k – $15k</option>
                      <option className="bg-background text-foreground" value="$15k – $50k">$15k – $50k</option>
                      <option className="bg-background text-foreground" value="$50k+">$50k+</option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/40">
                      <ChevronDown className="size-4" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 group md:col-span-2">
                  <label className="text-[14px] text-foreground/80 uppercase tracking-widest font-light">Message*</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your project..."
                    rows={4}
                    className="bg-transparent border-b border-foreground/10 py-2 focus:border-foreground outline-none transition-colors text-[18px] font-light placeholder:text-foreground/40 resize-none"
                  />
                </div>

                <div className="md:col-span-2 flex flex-row items-center justify-between pt-8">
                  {status === "error" && (
                    <p className="text-[14px] text-red-400 font-light">
                      Something went wrong — try again or email me directly.
                    </p>
                  )}
                  <div className="ml-auto">
                    <button
                      type="submit"
                      disabled={!isValid || status === "sending"}
                      className="bg-[#584dff] text-white px-8 h-[40px] rounded-full font-light text-[14px] hover:opacity-85 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
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
