import React from "react";
import { motion } from "motion/react";
import { Check, ChevronDown, Truck, Plane, Download } from "lucide-react";
import { useCart, type CartLine } from "../shop/CartContext";
import { formatPrice, getProductCover, isDigital, downloadProduct } from "../shop/products";

interface CheckoutProps {
  /** Back to the shop (breadcrumb + empty-state CTA). */
  onBack: () => void;
}

/** Snapshot of a placed order, captured before the cart is cleared. */
interface PlacedOrder {
  orderNo: number;
  email: string;
  lines: CartLine[];
  subtotal: number;
  shipping: number;
  total: number;
  deliveryLabel: string;
  deliveryNote: string;
  country: string;
}

const DELIVERY_OPTIONS = [
  { id: "standard", label: "Standard", note: "3–5 business days", price: 0, Icon: Truck },
  { id: "express", label: "Express", note: "1–2 business days", price: 9, Icon: Plane },
] as const;

const COUNTRIES = [
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Ireland",
  "France",
  "Germany",
  "Netherlands",
  "Spain",
  "Italy",
  "Sweden",
  "Singapore",
  "Japan",
  "Myanmar",
];

export function Checkout({ onBack }: CheckoutProps) {
  const { lines, subtotal, clear } = useCart();
  const [delivery, setDelivery] = React.useState<(typeof DELIVERY_OPTIONS)[number]["id"]>("standard");
  const [country, setCountry] = React.useState("United Kingdom");
  const [placed, setPlaced] = React.useState<PlacedOrder | null>(null);

  // Digital-only carts need no shipping address or delivery option.
  const allDigital = lines.length > 0 && lines.every((l) => isDigital(l.product));
  const currency = lines[0]?.product.currency ?? "£";
  const shipping = allDigital ? 0 : DELIVERY_OPTIONS.find((d) => d.id === delivery)!.price;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO(backend): submit to Stripe/Shopify here. For now, confirm the demo order.
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    const opt = DELIVERY_OPTIONS.find((d) => d.id === delivery)!;
    setPlaced({
      orderNo: Math.floor(100000 + Math.random() * 900000),
      email,
      lines,
      subtotal,
      shipping,
      total,
      deliveryLabel: allDigital ? "Instant download" : opt.label,
      deliveryNote: allDigital ? "Sent to your email" : opt.note,
      country: allDigital ? "" : country,
    });
    clear();
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // Order confirmation screen
  if (placed) {
    const cur = placed.lines[0]?.product.currency ?? "£";
    const placedAllDigital = placed.lines.every((l) => isDigital(l.product));
    return (
      <div className="relative min-h-screen bg-background text-foreground font-display w-full pt-page pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[640px]"
        >
          {/* Success header */}
          <div className="flex flex-col items-center gap-5 text-center">
            <div className="flex size-16 items-center justify-center rounded-full border border-foreground/15">
              <Check className="size-6 text-foreground" strokeWidth={1.5} />
            </div>
            <h1 className="font-serif font-light text-h1">
              {placedAllDigital ? "You're all set." : "Order placed."}
            </h1>
            <p className="max-w-[440px] font-display font-light text-body-lg text-foreground/60">
              Thanks — your order{" "}
              <span className="text-foreground">#{placed.orderNo}</span> is confirmed.{" "}
              {placedAllDigital ? (
                <>
                  Your download links have been sent to{" "}
                  <span className="text-foreground">{placed.email || "your inbox"}</span> —
                  grab your files below.
                </>
              ) : (
                <>
                  A confirmation has been sent to{" "}
                  <span className="text-foreground">{placed.email || "your inbox"}</span>.
                </>
              )}
            </p>
          </div>

          {/* Order details */}
          <div className="mt-12 rounded-[20px] border border-foreground/10 bg-foreground/[0.02] p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="font-display font-light text-h4 text-foreground">Order #{placed.orderNo}</h2>
              <span className="font-display text-caption text-foreground/45">
                {placed.deliveryLabel} · {placed.deliveryNote}
              </span>
            </div>

            <ul className="flex flex-col gap-4">
              {placed.lines.map((line) => {
                const cover = getProductCover(line.product);
                return (
                  <li key={line.key} className="flex gap-4">
                    <div className="relative size-[60px] shrink-0">
                      <div className="size-full overflow-hidden rounded-[6px] bg-foreground/[0.06]">
                        {cover ? (
                          <img src={cover} alt={line.product.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <span className="font-display text-caption text-foreground/20">
                              {line.product.name.split("_")[0]}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="absolute -right-2 -top-2 flex size-[20px] items-center justify-center rounded-full bg-foreground text-[10px] font-medium leading-none text-background tabular-nums ring-2 ring-background">
                        {line.quantity}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                      <p className="truncate font-display text-body-sm text-foreground">{line.product.name}</p>
                      {line.variant && (
                        <p className="font-display text-caption text-foreground/45">{line.variant.label}</p>
                      )}
                      {isDigital(line.product) && (
                        <button
                          type="button"
                          onClick={() => downloadProduct(line.product)}
                          className="mt-1.5 inline-flex w-fit items-center gap-1.5 font-display text-caption text-foreground/70 transition-colors hover:text-foreground cursor-pointer"
                        >
                          <Download className="size-3.5" strokeWidth={1.5} />
                          Download {line.product.download?.format ?? "file"}
                        </button>
                      )}
                    </div>
                    <span className="self-center font-display text-body-sm text-foreground tabular-nums">
                      {formatPrice(line.product.price * line.quantity, line.product.currency)}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex flex-col gap-2 border-t border-foreground/10 pt-5">
              <Row label="Subtotal" value={formatPrice(placed.subtotal, cur)} />
              {placedAllDigital ? (
                <Row label="Delivery" value="Instant download" />
              ) : (
                <>
                  <Row label="Shipping" value={placed.shipping === 0 ? "Free" : formatPrice(placed.shipping, cur)} />
                  <Row label="Ship to" value={placed.country} />
                </>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-foreground/10 pt-4">
              <span className="font-display text-body text-foreground">Total</span>
              <span className="font-display text-body text-foreground tabular-nums">
                {formatPrice(placed.total, cur)}
              </span>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={onBack}
              className="group/cs relative flex h-[48px] items-center justify-center overflow-hidden rounded-full border border-foreground/25 px-8 font-display font-light text-body-sm text-foreground transition-colors hover:border-foreground cursor-pointer"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/cs:scale-y-100"
              />
              <span className="relative transition-colors duration-500 group-hover/cs:text-background">
                Continue shopping
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Empty-cart guard
  if (lines.length === 0) {
    return (
      <div className="relative min-h-screen bg-background text-foreground font-display w-full pt-page pb-24">
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <p className="font-display text-body text-foreground/60">Nothing to check out yet.</p>
          <button
            onClick={onBack}
            className="border-b border-foreground/20 pb-px font-display font-light text-body-sm text-foreground/60 transition-colors hover:border-foreground hover:text-foreground cursor-pointer"
          >
            Browse the shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground font-display w-full pt-page pb-24">
      <div className="mx-auto w-full max-w-[960px]">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 font-display text-body-sm text-foreground/50">
        <button onClick={onBack} className="transition-colors hover:text-foreground cursor-pointer">
          Shop
        </button>
        <span className="text-foreground/30">›</span>
        <span className="text-foreground/70">Checkout</span>
      </nav>

      <h1 className="mb-10 font-serif font-light text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-0.02em] md:mb-14">
        Checkout
      </h1>

      <form
        onSubmit={handlePlaceOrder}
        className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px] lg:gap-x-12"
      >
        {/* Left — form sections */}
        <div className="flex flex-col gap-14">
          <Section title="Contact" step="01">
            <Field label="Email*" name="email" type="email" placeholder="you@email.com" />
          </Section>

          {!allDigital && (
            <Section title="Shipping address" step="02">
              <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
                <Field label="Full name*" name="name" placeholder="First and last name" />
                <SelectField
                  label="Country*"
                  value={country}
                  onChange={setCountry}
                  options={COUNTRIES}
                />
                <div className="sm:col-span-2">
                  <Field label="Address*" name="address1" placeholder="Street address" />
                </div>
                <div className="sm:col-span-2">
                  <Field label="Apartment, suite, etc." name="address2" placeholder="Optional" required={false} />
                </div>
                <Field label="City*" name="city" placeholder="City" />
                <Field label="Postcode*" name="postcode" placeholder="Postcode" />
              </div>
            </Section>
          )}

          {!allDigital && (
            <Section title="Delivery" step="03">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {DELIVERY_OPTIONS.map((opt) => {
                  const active = delivery === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDelivery(opt.id)}
                      className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition-colors cursor-pointer ${
                        active
                          ? "border-foreground/40 bg-foreground/[0.04]"
                          : "border-foreground/10 hover:border-foreground/25"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                            active ? "border-foreground" : "border-foreground/30"
                          }`}
                        >
                          {active && <span className="size-2 rounded-full bg-foreground" />}
                        </span>
                        <span className="flex flex-col gap-2.5">
                          <opt.Icon className="size-[18px] text-foreground/70" strokeWidth={1.5} />
                          <span className="flex flex-col">
                            <span className="font-display text-body-sm text-foreground">{opt.label}</span>
                            <span className="font-display text-caption text-foreground/45">{opt.note}</span>
                          </span>
                        </span>
                      </span>
                      <span className="font-display text-body-sm text-foreground/80">
                        {opt.price === 0 ? "Free" : formatPrice(opt.price, currency)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Section>
          )}

          {allDigital && (
            <Section title="Delivery" step="02">
              <div className="flex items-center gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-5 py-4">
                <Download className="size-[18px] text-foreground/70" strokeWidth={1.5} />
                <span className="flex flex-col">
                  <span className="font-display text-body-sm text-foreground">Instant download</span>
                  <span className="font-display text-caption text-foreground/45">
                    Download links sent to your email — nothing ships.
                  </span>
                </span>
              </div>
            </Section>
          )}

          <Section title="Payment" step={allDigital ? "03" : "04"}>
            <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Card number*" name="card" placeholder="1234 1234 1234 1234" inputMode="numeric" />
              </div>
              <Field label="Expiry*" name="expiry" placeholder="MM / YY" />
              <Field label="CVC*" name="cvc" placeholder="123" inputMode="numeric" />
            </div>
            <p className="mt-5 font-display text-caption text-foreground/40">
              Demo checkout — payments aren't live yet. Connect Stripe or Shopify to process real orders.
            </p>
          </Section>
        </div>

        {/* Right — order summary */}
        <aside className="lg:sticky lg:top-[128px] lg:self-start">
          <div className="rounded-[20px] border border-foreground/10 bg-foreground/[0.02] p-6">
            <h2 className="mb-5 font-display font-light text-h4 text-foreground">Order summary</h2>

            <ul className="flex flex-col gap-4">
              {lines.map((line) => {
                const cover = getProductCover(line.product);
                return (
                  <li key={line.key} className="flex gap-4">
                    <div className="relative size-[60px] shrink-0">
                      <div className="size-full overflow-hidden rounded-[6px] bg-foreground/[0.06]">
                        {cover ? (
                          <img src={cover} alt={line.product.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <span className="font-display text-caption text-foreground/20">
                              {line.product.name.split("_")[0]}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="absolute -right-2 -top-2 flex size-[20px] items-center justify-center rounded-full bg-foreground text-[10px] font-medium leading-none text-background tabular-nums ring-2 ring-background">
                        {line.quantity}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                      <p className="truncate font-display text-body-sm text-foreground">{line.product.name}</p>
                      {line.variant && (
                        <p className="font-display text-caption text-foreground/45">{line.variant.label}</p>
                      )}
                    </div>
                    <span className="self-center font-display text-body-sm text-foreground tabular-nums">
                      {formatPrice(line.product.price * line.quantity, line.product.currency)}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex flex-col gap-2 border-t border-foreground/10 pt-5">
              <Row label="Subtotal" value={formatPrice(subtotal, currency)} />
              {allDigital ? (
                <Row label="Delivery" value="Instant download" />
              ) : (
                <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping, currency)} />
              )}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-foreground/10 pt-4">
              <span className="font-display text-body text-foreground">Total</span>
              <span className="font-display text-body text-foreground tabular-nums">
                {formatPrice(total, currency)}
              </span>
            </div>

            <button
              type="submit"
              className="group/pay relative mt-6 flex h-[52px] w-full items-center justify-center overflow-hidden rounded-full border border-foreground/25 font-display font-light text-body-sm text-foreground transition-colors hover:border-brand cursor-pointer"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/pay:scale-y-100"
              />
              <span className="relative transition-colors duration-500 group-hover/pay:text-brand-foreground">
                Place order · {formatPrice(total, currency)}
              </span>
            </button>
          </div>
        </aside>
      </form>
      </div>
    </div>
  );
}

function Section({ title, step, children }: { title: string; step: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <span className="font-display text-micro text-foreground/40 tabular-nums">{step}</span>
        <h2 className="font-display font-light text-h4 text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <div className="flex flex-col gap-3">
      <label className="font-display text-eyebrow text-foreground/80">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        inputMode={inputMode}
        className="border-b border-foreground/10 bg-transparent py-2 font-display font-light text-body-lg text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-foreground"
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-display text-body-sm text-foreground/55">{label}</span>
      <span className="font-display text-body-sm text-foreground/90 tabular-nums">{value}</span>
    </div>
  );
}

/** Dropdown styled to match the underline form fields (used for Country). */
function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col gap-3">
      <label className="font-display text-eyebrow text-foreground/80">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex w-full items-center justify-between border-b border-foreground/10 py-2 text-left font-display font-light text-body-lg text-foreground outline-none transition-colors hover:border-foreground/40 cursor-pointer"
        >
          <span>{value}</span>
          <ChevronDown className={`size-4 shrink-0 text-foreground/50 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <>
            <button
              type="button"
              aria-hidden
              tabIndex={-1}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 cursor-default"
            />
            <ul
              role="listbox"
              className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-[260px] overflow-y-auto rounded-2xl border border-foreground/10 bg-background/95 py-1 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] [scrollbar-width:thin] [scrollbar-color:rgba(127,127,127,0.3)_transparent] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-foreground/25 hover:[&::-webkit-scrollbar-thumb]:bg-foreground/40"
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
                        onChange(opt);
                        setOpen(false);
                      }}
                      className="flex w-full items-center justify-between px-4 py-2.5 text-left font-display font-light text-body-sm text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground cursor-pointer"
                    >
                      <span>{opt}</span>
                      {selected && <Check className="size-4 text-foreground" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
