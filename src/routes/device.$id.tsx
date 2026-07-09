import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { getDevice, getVariants, inventory, type Device } from "@/lib/inventory";
import { addToCart, useCart } from "@/lib/cart";
import vaultMark from "@/assets/vault-mark.asset.json";

export const Route = createFileRoute("/device/$id")({
  loader: ({ params }) => {
    const device = getDevice(params.id);
    if (!device) throw notFound();
    return { device };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Device not found — The Vault" }, { name: "robots", content: "noindex" }] };
    }
    const { device } = loaderData;
    const title = `${device.model} — ${device.grade} · The Vault`;
    const description = `${device.model} · ${device.storage} · ${device.color}. ${device.grade} grade, ${device.warrantyMonths}-month Vault warranty. £${device.price.toLocaleString()}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: device.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: device.image },
      ],
    };
  },
  component: DevicePage,
  notFoundComponent: () => (
    <div className="flex min-h-dvh items-center justify-center bg-canvas px-6 text-center">
      <div>
        <div className="text-micro mb-4">404</div>
        <h1 className="text-display text-[40px]">Device not found</h1>
        <p className="mt-3 text-muted-foreground">It may have sold, or the link has moved.</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-foreground px-6 py-3 text-[13px] font-medium text-background">
          Return to the collection
        </Link>
      </div>
    </div>
  ),
});

function DevicePage() {
  const { device } = Route.useLoaderData();
  const related = inventory.filter((d) => d.id !== device.id && d.category === device.category).slice(0, 3);
  const [tab, setTab] = useState<"specs" | "warranty" | "trade">("specs");
  const [activeImage, setActiveImage] = useState(0);
  const gallery = [device.image, device.image, device.image, device.image];

  const { storages, colors, variant } = useMemo(() => getVariants(device), [device]);
  const [storage, setStorage] = useState(device.storage);
  const [color, setColor] = useState(device.color);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { count: cartCount } = useCart();

  const current = variant(storage, color);
  const sold = current.stock === 0;
  const low = current.stock > 0 && current.stock <= 2;
  const maxQty = Math.max(1, current.stock);
  const effectiveQty = Math.min(qty, maxQty);

  const handleAdd = () => {
    if (sold) return;
    addToCart({
      key: `${device.id}|${storage}|${color}`,
      deviceId: device.id,
      model: device.model,
      storage,
      color,
      price: current.price,
      image: device.image,
      qty: effectiveQty,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="min-h-dvh bg-canvas text-foreground grain">
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 h-[720px] w-[1100px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(ellipse at center, oklch(0.35 0.06 280 / 0.5), transparent 60%)" }}
        />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50 pt-5 pb-4">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="glass flex items-center justify-between rounded-full px-4 py-2.5">
            <Link to="/" className="flex items-center gap-2.5 pl-2">
              <img src={vaultMark.url} alt="" className="h-6 w-6 invert" width={24} height={24} />
              <span className="text-[13px] font-medium tracking-[0.24em]">THE VAULT</span>
            </Link>
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="rounded-full glass px-4 py-1.5 text-[12px] text-muted-foreground transition hover:text-foreground"
              >
                ← Back to collection
              </Link>
              <div
                className="relative hairline flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px]"
                aria-label={`Bag: ${cartCount} items`}
              >
                <BagGlyph />
                <span className="tabular-nums">{cartCount}</span>
                {cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold" />}
              </div>
            </div>
          </div>
        </div>
      </header>



      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1400px] px-6 pt-8 md:px-10">
        <nav className="text-[12px] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Collection</Link>
          <span className="mx-2 opacity-40">/</span>
          <span>{device.category}</span>
          <span className="mx-2 opacity-40">/</span>
          <span className="text-foreground">{device.model}</span>
        </nav>
      </div>

      {/* Main product */}
      <section className="relative mx-auto max-w-[1400px] px-6 py-10 md:px-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          {/* Gallery */}
          <div>
            <div className="glass relative aspect-[4/5] overflow-hidden rounded-[36px]">
              <img
                src={gallery[activeImage]}
                alt={device.model}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute left-5 top-5 flex gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-medium tracking-wider backdrop-blur-xl ${
                    device.grade === "Pristine"
                      ? "bg-gold/25 text-gold"
                      : device.grade === "Excellent"
                        ? "bg-white/10 text-foreground"
                        : "bg-white/5 text-muted-foreground"
                  }`}
                >
                  {device.grade.toUpperCase()}
                </span>
                {low && (
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium tracking-wider backdrop-blur-xl">
                    ONLY {device.stock} LEFT
                  </span>
                )}
              </div>
              <div className="absolute bottom-4 right-4 rounded-full bg-black/40 px-3 py-1.5 text-[10px] tracking-wider text-white/70 backdrop-blur-xl">
                GALLERY · PLACEHOLDER
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square overflow-hidden rounded-2xl border transition ${
                    activeImage === i ? "border-gold" : "border-hairline hover:border-hairline-strong"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
                </button>
              ))}
            </div>
          </div>

          {/* Buy panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="text-micro mb-4">{device.category}</div>
            <h1 className="text-display text-[44px] md:text-[56px]">{device.model}</h1>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">{device.tagline}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <div className="text-display text-[36px]">£{current.price.toLocaleString()}</div>
              {device.was && current.price === device.price && (
                <div className="text-[15px] text-muted-foreground line-through">
                  £{device.was.toLocaleString()}
                </div>
              )}
              {device.was && current.price === device.price && (
                <div className="rounded-full bg-gold/20 px-2.5 py-1 text-[11px] font-medium tracking-wider text-gold">
                  SAVE £{(device.was - device.price).toLocaleString()}
                </div>
              )}
            </div>

            {/* Storage */}
            <div className="mt-8">
              <div className="mb-3 flex items-baseline justify-between">
                <span className="text-[12px] font-medium">Storage</span>
                <span className="text-[11px] text-muted-foreground">{storage}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {storages.map((s) => {
                  const v = variant(s, color);
                  const active = s === storage;
                  const oos = v.stock === 0;
                  return (
                    <button
                      key={s}
                      onClick={() => setStorage(s)}
                      disabled={oos}
                      className={`hairline relative rounded-xl px-3 py-2.5 text-left transition ${
                        active
                          ? "border-foreground bg-foreground/10"
                          : "hover:border-hairline-strong"
                      } ${oos ? "opacity-40" : ""}`}
                    >
                      <div className="text-[12px] font-medium">{s}</div>
                      <div className="mt-0.5 text-[10px] text-muted-foreground">
                        {oos ? "Sold out" : `£${v.price.toLocaleString()}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colour */}
            <div className="mt-6">
              <div className="mb-3 flex items-baseline justify-between">
                <span className="text-[12px] font-medium">Colour</span>
                <span className="text-[11px] text-muted-foreground">{color}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {colors.map((c) => {
                  const v = variant(storage, c);
                  const active = c === color;
                  const oos = v.stock === 0;
                  return (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      disabled={oos}
                      title={c}
                      aria-label={c}
                      className={`hairline relative h-9 w-9 rounded-full transition ${
                        active ? "ring-2 ring-foreground ring-offset-2 ring-offset-canvas" : ""
                      } ${oos ? "opacity-30" : ""}`}
                      style={{ background: colorSwatch(c) }}
                    >
                      {oos && (
                        <span className="absolute inset-x-1 top-1/2 h-px -translate-y-1/2 rotate-45 bg-foreground" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="mt-6 hairline flex items-center gap-3 rounded-2xl bg-surface/40 px-4 py-3">
              <span
                className={`relative flex h-2 w-2 items-center justify-center ${
                  sold ? "" : "animate-pulse"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    sold ? "bg-destructive" : low ? "bg-gold" : "bg-emerald-400"
                  }`}
                />
              </span>
              <div className="flex-1">
                <div className="text-[13px] font-medium">
                  {sold
                    ? "Sold out — restocking soon"
                    : low
                      ? `Low stock — only ${current.stock} left`
                      : `In stock · ${current.stock} available`}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {sold
                    ? "Join the waitlist for a next-batch alert"
                    : `Order within 4 hrs for next-day dispatch`}
                </div>
              </div>
            </div>

            {/* Qty + Add */}
            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-stretch gap-3">
                <div className="hairline flex items-center rounded-full bg-surface/40">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={sold || effectiveQty <= 1}
                    aria-label="Decrease quantity"
                    className="h-11 w-11 text-[16px] text-muted-foreground transition hover:text-foreground disabled:opacity-30"
                  >
                    −
                  </button>
                  <span className="min-w-8 text-center text-[14px] font-medium tabular-nums">
                    {effectiveQty}
                  </span>
                  <button
                    onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                    disabled={sold || effectiveQty >= maxQty}
                    aria-label="Increase quantity"
                    className="h-11 w-11 text-[16px] text-muted-foreground transition hover:text-foreground disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAdd}
                  disabled={sold}
                  className="flex-1 rounded-full bg-foreground px-6 py-3.5 text-[14px] font-medium text-background transition hover:opacity-90 disabled:opacity-40"
                >
                  {sold ? "Sold out" : added ? "Added to bag ✓" : `Add to bag · £${(current.price * effectiveQty).toLocaleString()}`}
                </button>
              </div>
              <button className="glass w-full rounded-full px-6 py-3.5 text-[14px] font-medium">
                Reserve for in-store pickup
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-muted-foreground">
              <span>Free insured delivery</span>
              <span>·</span>
              <span>14-day returns</span>
              <span>·</span>
              <span>{device.warrantyMonths}-mo warranty</span>
            </div>


            {/* Tabs */}
            <div className="mt-10 border-t border-hairline pt-6">
              <div className="glass inline-flex rounded-full p-1">
                {(
                  [
                    ["specs", "Specifications"],
                    ["warranty", "Warranty"],
                    ["trade", "Trade-in"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className={`rounded-full px-4 py-1.5 text-[12px] font-medium transition-all ${
                      tab === id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                {tab === "specs" && (
                  <dl className="divide-y divide-hairline">
                    {device.specs.map((s: { label: string; value: string }) => (
                      <div key={s.label} className="flex items-start justify-between gap-6 py-3">
                        <dt className="text-[13px] text-muted-foreground">{s.label}</dt>
                        <dd className="text-right text-[13px] font-medium">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {tab === "warranty" && (
                  <div className="space-y-4 text-[14px] leading-relaxed text-muted-foreground">
                    <p>
                      Every Vault device is covered by our{" "}
                      <span className="text-foreground">{device.warrantyMonths}-month Vault warranty</span>,
                      protecting against hardware defects, battery failure below rated performance, and
                      manufacturing faults.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Free repairs at any Vault facility",
                        "Prepaid, insured return shipping",
                        "AppleCare+ eligibility retained where applicable",
                        "Transferable if the device is resold",
                      ].map((line) => (
                        <li key={line} className="flex items-start gap-3">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                          <span className="text-foreground/90">{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {tab === "trade" && (
                  <div className="space-y-4 text-[14px] leading-relaxed">
                    {device.tradeInEligible ? (
                      <>
                        <div className="flex items-center gap-2 text-gold">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                          <span className="text-[12px] font-medium tracking-wider uppercase">
                            Trade-in eligible
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          Trade in your current device toward the {device.model} and receive your
                          valuation as an instant credit at checkout
                          {device.tradeInBonus
                            ? `, plus a £${device.tradeInBonus} Vault bonus on this model.`
                            : "."}
                        </p>
                        <Link
                          to="/"
                          hash="trade"
                          className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[13px] font-medium text-background"
                        >
                          Get an instant valuation
                        </Link>
                      </>
                    ) : (
                      <p className="text-muted-foreground">
                        This device is not currently trade-in eligible. Speak with a Vault
                        specialist for a bespoke assessment.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-32">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-display text-[28px] md:text-[36px]">More {device.category}</h2>
            <Link to="/" hash="shop" className="text-[13px] text-muted-foreground hover:text-foreground">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {related.map((d) => (
              <RelatedCard key={d.id} device={d} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="hairline rounded-2xl bg-surface/40 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
      <div className="mt-1 text-[13px] font-medium">{v}</div>
    </div>
  );
}

function RelatedCard({ device }: { device: Device }) {
  return (
    <Link
      to="/device/$id"
      params={{ id: device.id }}
      className="group relative overflow-hidden rounded-[24px] border border-hairline bg-surface transition-all duration-500 hover:-translate-y-1"
      style={{ transitionTimingFunction: "var(--ease-spring)" }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={device.image}
          alt={device.model}
          className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
      </div>
      <div className="p-4">
        <div className="text-[14px] font-medium">{device.model}</div>
        <div className="mt-0.5 text-[12px] text-muted-foreground">{device.storage}</div>
        <div className="text-display mt-2 text-[18px]">£{device.price.toLocaleString()}</div>
      </div>
    </Link>
  );
}
