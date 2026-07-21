import React from "react";

const HELP_LINKS = ["Work together", "See my work", "Just say hello"];
const SOCIAL = ["Linkedin", "Instagram", "X", "Medium"];
const COMPANY = ["Careers", "Contact"];
const LEGAL = ["Privacy", "Accessibility"];

const linkClass =
  "text-foreground/40 hover:text-foreground cursor-pointer transition-colors font-display text-body";

/**
 * Shared site footer — identical across every page.
 * Sits inside the app shell's horizontal gutter (px-[14px] lg:px-6),
 * so its blocks are full-width with no extra padding of their own.
 */
export function Footer() {
  return (
    <>
      {/* Help Section */}
      <div className="w-full pt-10 pb-16 md:py-24 lg:py-40 border-t border-foreground/10 flex flex-col lg:flex-row justify-between gap-10 md:gap-20">
        <h2 className="font-display font-light text-display-md text-foreground">
          How can<br />I help?
        </h2>
        <div className="flex flex-col w-full lg:w-[448px] divide-y divide-foreground/10">
          {HELP_LINKS.map((item) => (
            <div
              key={item}
              className="group py-8 flex items-center justify-between cursor-pointer hover:opacity-60 transition-all"
            >
              <span className="font-display text-h3 text-foreground font-light">{item}</span>
              <svg
                className="size-4 transform group-hover:translate-x-1 transition-transform"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  d="M1.49333 15.6267L0.373333 14.5067L13.0133 1.86667H5.6V0.266665H15.7333V10.4H14.1333V2.98667L1.49333 15.6267Z"
                  className="text-foreground"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* Final Footer Links */}
      <div className="w-full border-t border-foreground/10 py-10 flex flex-wrap gap-x-24 gap-y-12">
        <div className="flex flex-col gap-3">
          {SOCIAL.map((l) => (
            <span key={l} className={linkClass}>{l}</span>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {COMPANY.map((l) => (
            <span key={l} className={linkClass}>{l}</span>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {LEGAL.map((l) => (
            <span key={l} className={linkClass}>{l}</span>
          ))}
        </div>
        <div className="ml-auto text-foreground/20 font-light font-display text-body">© 2026 Hein Htet</div>
      </div>
    </>
  );
}
