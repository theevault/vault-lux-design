import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import vaultMark from "@/assets/vault-mark.asset.json";
import heroDevice from "@/assets/hero-device.jpg";
import deviceMacbook from "@/assets/device-macbook.jpg";
import deviceWatch from "@/assets/device-watch.jpg";
import deviceAirpods from "@/assets/device-airpods.jpg";
import deviceIpad from "@/assets/device-ipad.jpg";
import deviceImac from "@/assets/device-imac.jpg";
import { inventory, type Device } from "@/lib/inventory";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Vault — Certified Apple, refined." },
      {
        name: "description",
        content:
          "Pre-owned Apple devices, meticulously verified. Two-year Vault warranty. Next-day dispatch, worldwide.",
      },
      { property: "og:title", content: "The Vault — Certified Apple, refined." },
      {
        property: "og:description",
        content:
          "Pre-owned Apple devices, meticulously verified. Two-year Vault warranty.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Vault,
});


const categories = ["All", "iPhone", "Mac", "iPad", "Watch", "Audio"];

function Vault() {
  const [scrollY, setScrollY] = useState(0);
  const [activeCat, setActiveCat] = useState("All");

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navCondensed = scrollY > 32;
  const heroDim = Math.min(scrollY / 600, 0.5);
  const filtered =
    activeCat === "All" ? inventory : inventory.filter((d) => d.category === activeCat);

  return (
    <div className="min-h-dvh bg-canvas text-foreground grain">
      {/* Ambient gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 h-[720px] w-[1100px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.35 0.06 280 / 0.55), transparent 60%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 h-[560px] w-[720px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.55 0.12 45 / 0.35), transparent 65%)",
          }}
        />
      </div>

      {/* Nav */}
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
        style={{
          transitionTimingFunction: "var(--ease-spring)",
          paddingTop: navCondensed ? 10 : 20,
          paddingBottom: navCondensed ? 10 : 20,
        }}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div
            className="glass flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500"
            style={{
              backdropFilter: `blur(${navCondensed ? 48 : 28}px) saturate(180%)`,
              background: `color-mix(in oklab, white ${navCondensed ? 8 : 4}%, transparent)`,
            }}
          >
            <a href="#top" className="flex items-center gap-2.5 pl-2">
              <img src={vaultMark.url} alt="" className="h-6 w-6 invert" width={24} height={24} />
              <span className="text-[13px] font-medium tracking-[0.24em]">THE VAULT</span>
            </a>
            <nav className="hidden items-center gap-1 md:flex">
              {[
                ["Shop", "#shop"],
                ["Trade-in", "#trade"],
                ["Guarantee", "#guarantee"],
                ["Journal", "#journal"],
              ].map(([l, href]) => (
                <a
                  key={l}
                  href={href}
                  className="rounded-full px-4 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-1.5">
              <button
                aria-label="Search"
                className="hairline rounded-full p-2 text-muted-foreground transition hover:text-foreground"
              >
                <SearchIcon />
              </button>
              <button
                aria-label="Bag"
                className="hairline relative rounded-full p-2 text-muted-foreground transition hover:text-foreground"
              >
                <BagIcon />
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold" />
              </button>
              <a
                href="#shop"
                className="ml-1 rounded-full bg-foreground px-4 py-1.5 text-[13px] font-medium text-background transition hover:opacity-90"
              >
                Shop now
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-[100dvh] overflow-hidden pt-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            transform: `translate3d(0, ${scrollY * 0.35}px, 0)`,
            willChange: "transform",
          }}
        >
          <img
            src={heroDevice}
            alt=""
            width={1600}
            height={1808}
            className="absolute right-[-8%] top-[4%] h-[120%] w-auto max-w-none select-none object-contain"
            style={{ filter: `brightness(${1 - heroDim})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-canvas" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 pt-16 md:px-10 md:pt-24">
          <div className="max-w-2xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[12px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              New arrivals · Autumn 2026
            </div>
            <h1 className="text-display text-[56px] md:text-[104px]">
              Certified Apple.
              <br />
              <span className="text-muted-foreground">Refined.</span>
            </h1>
            <p className="mt-8 max-w-lg text-[17px] leading-relaxed text-muted-foreground">
              Every device passes a seventy-two point inspection, is unlocked, sanitised and
              re-sealed. Two-year Vault warranty. Next-day dispatch, worldwide.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#shop"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-[14px] font-medium text-background transition hover:opacity-90"
              >
                Shop the collection
                <ArrowIcon className="transition-transform duration-500 group-hover:translate-x-1" />
              </a>
              <a
                href="#trade"
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-medium"
              >
                Trade in your device
              </a>
            </div>

            <dl className="mt-16 grid max-w-md grid-cols-3 gap-6 border-t border-hairline pt-8">
              {[
                ["72", "point audit"],
                ["24 mo", "warranty"],
                ["4.9★", "12,480 reviews"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-display text-[24px] text-foreground">{k}</dt>
                  <dd className="mt-1 text-[12px] text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Category rail */}
      <section className="relative mx-auto max-w-[1400px] px-6 py-10 md:px-10">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          {[
            ["iPhone", heroDevice],
            ["Mac", deviceMacbook],
            ["iPad", deviceIpad],
            ["Watch", deviceWatch],
            ["Audio", deviceAirpods],
            ["Desktop", deviceImac],
          ].map(([label, img]) => (
            <button
              key={label as string}
              onClick={() => setActiveCat(label as string)}
              className="group glass relative aspect-square overflow-hidden rounded-2xl p-3 text-left transition-all duration-500 hover:-translate-y-0.5"
              style={{ transitionTimingFunction: "var(--ease-spring)" }}
            >
              <img
                src={img as string}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 transition-transform duration-1000 group-hover:scale-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative flex h-full flex-col justify-end">
                <div className="text-[13px] font-medium">{label as string}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* COLLECTION */}
      <section id="shop" className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-micro mb-4">The collection</div>
            <h2 className="text-display text-[40px] md:text-[64px]">
              Every device,
              <br />
              certified by hand.
            </h2>
          </div>
          <div className="glass flex items-center gap-1 rounded-full p-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`rounded-full px-4 py-1.5 text-[12px] font-medium transition-all ${
                  activeCat === c
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => (
            <DeviceCard key={d.id} device={d} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="#"
            className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-medium"
          >
            Browse all 248 devices <ArrowIcon />
          </a>
        </div>
      </section>

      {/* PROCESS */}
      <section
        id="guarantee"
        className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mb-16 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end">
          <div>
            <div className="text-micro mb-4">The Vault standard</div>
            <h2 className="text-display text-[40px] md:text-[64px]">
              Seventy-two checks.
              <br />
              <span className="text-muted-foreground">Zero compromises.</span>
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            Each device is disassembled, diagnosed, and rebuilt by Apple-certified technicians in
            our London facility. Batteries under 90% are replaced. Housings under grade are
            declined. If it doesn't earn the Vault seal, it doesn't leave the door.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            ["01", "Source", "Trade-ins and enterprise returns, never bulk auctions."],
            ["02", "Inspect", "72-point diagnostic across battery, board, cameras and housing."],
            ["03", "Restore", "Genuine parts only. Batteries replaced below 90% health."],
            ["04", "Seal", "Sanitised, re-boxed and sealed with the Vault mark."],
          ].map(([n, title, body]) => (
            <div
              key={n}
              className="glass rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1"
              style={{ transitionTimingFunction: "var(--ease-spring)" }}
            >
              <div className="font-mono text-[11px] tracking-widest text-gold">{n}</div>
              <div className="mt-6 text-[18px] font-medium">{title}</div>
              <div className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TRADE-IN */}
      <section id="trade" className="relative mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-32">
        <div className="glass-strong relative overflow-hidden rounded-[44px] p-10 md:p-16">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, oklch(0.82 0.11 85 / 0.35), transparent 70%)",
            }}
          />
          <div className="relative grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <div className="text-micro mb-5">Trade-in</div>
              <h3 className="text-display text-[40px] md:text-[56px]">
                Your last iPhone
                <br />
                is worth <span className="text-gold">£620</span>.
              </h3>
              <p className="mt-5 max-w-md text-[15px] text-muted-foreground">
                Answer four short questions. We collect from your door, verify within forty-eight
                hours, and pay directly or apply the credit to your next Vault order.
              </p>
              <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[14px] font-medium text-background transition hover:brightness-110">
                Get an instant valuation
                <ArrowIcon />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["Model", "iPhone 14 Pro"],
                ["Storage", "256 GB"],
                ["Condition", "Excellent"],
                ["Battery", "89%"],
              ].map(([k, v]) => (
                <div key={k} className="hairline rounded-2xl bg-surface/40 p-4">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {k}
                  </div>
                  <div className="mt-1.5 text-[16px] font-medium">{v}</div>
                </div>
              ))}
              <div className="col-span-2 rounded-2xl bg-foreground p-4 text-background">
                <div className="flex items-baseline justify-between">
                  <div className="text-[11px] uppercase tracking-wider opacity-60">
                    Estimated value
                  </div>
                  <div className="text-display text-[28px]">£620</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GUARANTEE STRIP */}
      <section className="relative mx-auto max-w-[1400px] px-6 pb-24 md:px-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["24 months", "Vault warranty"],
            ["14 days", "No-questions returns"],
            ["Free", "Insured delivery"],
            ["Zero interest", "Finance available"],
          ].map(([k, v]) => (
            <div
              key={v}
              className="hairline rounded-2xl bg-surface/40 p-6 text-center"
            >
              <div className="text-display text-[22px]">{k}</div>
              <div className="mt-1 text-[12px] text-muted-foreground">{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        id="journal"
        className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mb-14 max-w-2xl">
          <div className="text-micro mb-4">In their words</div>
          <h2 className="text-display text-[40px] md:text-[56px]">
            Trusted by twelve thousand collectors.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            {
              quote:
                "The unboxing felt more considered than buying new. Everything about it says: this was thought about.",
              name: "Elena K.",
              meta: "Milan · MacBook Pro",
            },
            {
              quote:
                "Battery replaced, cameras recalibrated, seal on the box. Half the price and the same device.",
              name: "Devon R.",
              meta: "Brooklyn · iPhone 15 Pro",
            },
            {
              quote:
                "Traded in three devices in one collection. The valuation held, the payment cleared the next day.",
              name: "Amara O.",
              meta: "London · Vault member",
            },
          ].map((t) => (
            <figure
              key={t.name}
              className="glass flex flex-col justify-between rounded-3xl p-7"
            >
              <blockquote className="text-[16px] leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-8 border-t border-hairline pt-4">
                <div className="text-[13px] font-medium">{t.name}</div>
                <div className="text-[12px] text-muted-foreground">{t.meta}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-[1400px] px-6 pb-32 md:px-10">
        <div className="glass-strong relative overflow-hidden rounded-[44px] px-10 py-20 text-center md:px-16 md:py-28">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(ellipse at center, oklch(0.4 0.08 280 / 0.35), transparent 60%)",
            }}
          />
          <div className="relative">
            <h2 className="text-display mx-auto max-w-3xl text-[44px] md:text-[80px]">
              Enter the Vault.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-[15px] text-muted-foreground">
              A quieter way to own Apple. Better for your pocket, better for the planet, sealed with
              a two-year guarantee.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href="#shop"
                className="rounded-full bg-foreground px-6 py-3.5 text-[14px] font-medium text-background"
              >
                Shop the collection
              </a>
              <a
                href="#trade"
                className="glass rounded-full px-6 py-3.5 text-[14px] font-medium"
              >
                Value my device
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-[1400px] border-t border-hairline px-6 py-10 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[12px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <img src={vaultMark.url} alt="" className="h-4 w-4 invert opacity-70" />
            <span className="tracking-[0.2em]">THE VAULT · MMXXVI</span>
          </div>
          <div className="flex gap-6">
            <a href="#">Guarantee</a>
            <a href="#">Shipping</a>
            <a href="#">Privacy</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function DeviceCard({ device }: { device: Device }) {
  const sold = device.stock === 0;
  const low = device.stock > 0 && device.stock <= 2;
  return (
    <article
      className="group relative overflow-hidden rounded-[28px] border border-hairline bg-surface transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
      style={{ transitionTimingFunction: "var(--ease-spring)" }}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-canvas">
        <img
          src={device.image}
          alt={device.model}
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-1000 group-hover:scale-110"
          style={{ transitionTimingFunction: "var(--ease-spring)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />

        <div className="absolute left-4 top-4 flex gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-medium tracking-wider backdrop-blur-xl ${
              device.grade === "Pristine"
                ? "bg-gold/20 text-gold"
                : device.grade === "Excellent"
                  ? "bg-white/10 text-foreground"
                  : "bg-white/5 text-muted-foreground"
            }`}
          >
            {device.grade.toUpperCase()}
          </span>
          {low && (
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium tracking-wider text-foreground backdrop-blur-xl">
              ONLY {device.stock} LEFT
            </span>
          )}
        </div>

        <button
          aria-label="Save"
          className="absolute right-4 top-4 rounded-full bg-black/40 p-2 text-white/80 backdrop-blur-xl transition hover:text-white"
        >
          <HeartIcon />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-[15px] font-medium">{device.model}</div>
            <div className="mt-0.5 truncate text-[12px] text-muted-foreground">
              {device.storage} · {device.color}
            </div>
          </div>
          <div className="text-right">
            <div className="text-display text-[20px]">£{device.price.toLocaleString()}</div>
            {device.was && (
              <div className="text-[11px] text-muted-foreground line-through">
                £{device.was.toLocaleString()}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
          <div className="flex gap-4 text-[11px] text-muted-foreground">
            {device.battery !== null && <span>Battery {device.battery}%</span>}
            <span>2yr warranty</span>
          </div>
          <button
            disabled={sold}
            className="rounded-full bg-foreground px-3.5 py-1.5 text-[12px] font-medium text-background transition hover:opacity-90 disabled:opacity-40"
          >
            View
          </button>
        </div>
      </div>
    </article>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M9 8V6a3 3 0 1 1 6 0v2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
