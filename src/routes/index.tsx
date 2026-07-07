import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import vaultMark from "@/assets/vault-mark.asset.json";
import heroDevice from "@/assets/hero-device.jpg";
import deviceMacbook from "@/assets/device-macbook.jpg";
import deviceWatch from "@/assets/device-watch.jpg";
import deviceAirpods from "@/assets/device-airpods.jpg";
import deviceIpad from "@/assets/device-ipad.jpg";
import deviceImac from "@/assets/device-imac.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Vault — Certified Apple, refined." },
      {
        name: "description",
        content:
          "Pre-owned Apple devices, meticulously verified. Titanium-grade condition reports, transparent pricing, next-day dispatch.",
      },
      { property: "og:title", content: "The Vault — Certified Apple, refined." },
      {
        property: "og:description",
        content:
          "Pre-owned Apple devices, meticulously verified. Titanium-grade condition reports, transparent pricing.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Vault,
});

type Grade = "Pristine" | "Excellent" | "Good";

interface Device {
  id: string;
  model: string;
  variant: string;
  storage: string;
  color: string;
  grade: Grade;
  battery: number | null;
  price: number;
  was?: number;
  stock: number;
  image: string;
}

const inventory: Device[] = [
  {
    id: "iph-15pm-titan",
    model: "iPhone 15 Pro Max",
    variant: "A2849",
    storage: "512 GB",
    color: "Natural Titanium",
    grade: "Pristine",
    battery: 98,
    price: 1149,
    was: 1399,
    stock: 3,
    image: heroDevice,
  },
  {
    id: "mbp-14-m3",
    model: 'MacBook Pro 14"',
    variant: "M3 Pro · 12-core",
    storage: "1 TB",
    color: "Space Black",
    grade: "Pristine",
    battery: 100,
    price: 1889,
    was: 2299,
    stock: 2,
    image: deviceMacbook,
  },
  {
    id: "wu-2",
    model: "Apple Watch Ultra 2",
    variant: "49mm GPS + Cellular",
    storage: "64 GB",
    color: "Titanium · Orange Alpine",
    grade: "Excellent",
    battery: 95,
    price: 649,
    was: 849,
    stock: 5,
    image: deviceWatch,
  },
  {
    id: "apm-mid",
    model: "AirPods Max",
    variant: "USB-C",
    storage: "—",
    color: "Midnight",
    grade: "Excellent",
    battery: 92,
    price: 379,
    was: 549,
    stock: 8,
    image: deviceAirpods,
  },
  {
    id: "ipad-pro",
    model: 'iPad Pro 12.9"',
    variant: "M2 · Wi-Fi + Cellular",
    storage: "256 GB",
    color: "Space Grey",
    grade: "Excellent",
    battery: 94,
    price: 899,
    stock: 4,
    image: deviceIpad,
  },
  {
    id: "imac-24",
    model: 'iMac 24"',
    variant: "M3 · 8-core GPU",
    storage: "512 GB",
    color: "Silver",
    grade: "Good",
    battery: null,
    price: 1249,
    was: 1599,
    stock: 1,
    image: deviceImac,
  },
];

const categories = [
  { label: "All", count: 248 },
  { label: "iPhone", count: 96 },
  { label: "Mac", count: 64 },
  { label: "iPad", count: 38 },
  { label: "Watch", count: 29 },
  { label: "Audio", count: 21 },
];

function Vault() {
  const [scrollY, setScrollY] = useState(0);
  const [activeCat, setActiveCat] = useState("All");

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navCondensed = scrollY > 32;
  const heroDim = Math.min(scrollY / 600, 0.6);

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
            <div className="flex items-center gap-2.5 pl-2">
              <img src={vaultMark.url} alt="" className="h-6 w-6 invert" width={24} height={24} />
              <span className="text-[13px] font-medium tracking-[0.24em]">THE VAULT</span>
            </div>
            <nav className="hidden items-center gap-1 md:flex">
              {["Browse", "Trade-In", "Guarantee", "Journal"].map((l) => (
                <a
                  key={l}
                  href="#"
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
                aria-label="Vault"
                className="hairline relative rounded-full p-2 text-muted-foreground transition hover:text-foreground"
              >
                <BagIcon />
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold" />
              </button>
              <button className="ml-1 rounded-full bg-foreground px-4 py-1.5 text-[13px] font-medium text-background transition hover:opacity-90">
                Sign in
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[100dvh] overflow-hidden pt-32">
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
            <h1 className="text-display text-[64px] md:text-[104px]">
              Certified Apple.
              <br />
              <span className="text-muted-foreground">Refined.</span>
            </h1>
            <p className="mt-8 max-w-lg text-[17px] leading-relaxed text-muted-foreground">
              Every device passes a seventy-two point inspection, is unlocked, sanitised and
              re-sealed. Two-year Vault warranty. Next-day dispatch, worldwide.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-[14px] font-medium text-background transition hover:opacity-90">
                Enter the Vault
                <ArrowIcon className="transition-transform duration-500 group-hover:translate-x-1" />
              </button>
              <button className="glass inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-medium">
                Trade in your device
              </button>
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

        {/* Floating product tile */}
        <div className="absolute bottom-16 right-6 hidden md:right-10 md:block">
          <div className="glass-strong w-[300px] overflow-hidden rounded-3xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-micro">Featured</span>
              <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-medium tracking-wider text-gold">
                PRISTINE
              </span>
            </div>
            <div className="mt-2 text-[15px] font-medium">iPhone 15 Pro Max · 512 GB</div>
            <div className="text-[12px] text-muted-foreground">Natural Titanium · 98% battery</div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="text-display text-[28px]">£1,149</div>
                <div className="text-[11px] text-muted-foreground line-through">£1,399</div>
              </div>
              <button className="rounded-full bg-foreground p-2.5 text-background">
                <ArrowIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <div className="text-micro mb-4">Your Vault</div>
            <h2 className="text-display text-[44px] md:text-[64px]">Good evening, Marcus.</h2>
            <p className="mt-3 text-[15px] text-muted-foreground">
              Three devices in your saved list have dropped in price this week.
            </p>
          </div>
          <div className="hidden gap-2 md:flex">
            <button className="glass rounded-full px-4 py-2 text-[13px]">Overview</button>
            <button className="rounded-full px-4 py-2 text-[13px] text-muted-foreground hover:text-foreground">
              Orders
            </button>
            <button className="rounded-full px-4 py-2 text-[13px] text-muted-foreground hover:text-foreground">
              Trade-ins
            </button>
          </div>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard label="Order · in transit" value="VLT-08421" caption="Arriving tomorrow" progress={0.72} accent />
          <StatCard label="Saved" value="14" caption="3 dropped in price" />
          <StatCard label="Trade-in credit" value="£420" caption="Ready to redeem" />
          <StatCard label="Vault warranty" value="18 mo" caption="Across 2 devices" />
        </div>

        {/* Collection */}
        <div className="mt-20">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-micro mb-3">Collection</div>
              <h3 className="text-display text-[32px] md:text-[44px]">
                Curated for you, this week.
              </h3>
            </div>
            <div className="glass flex items-center gap-1 rounded-full p-1">
              {categories.map((c) => (
                <button
                  key={c.label}
                  onClick={() => setActiveCat(c.label)}
                  className={`rounded-full px-4 py-1.5 text-[12px] font-medium transition-all ${
                    activeCat === c.label
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c.label}
                  <span className="ml-1.5 opacity-60">{c.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {inventory.map((d) => (
              <DeviceCard key={d.id} device={d} />
            ))}
          </div>
        </div>
      </section>

      {/* TRADE IN band */}
      <section className="relative mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-32">
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

      {/* Order timeline */}
      <section className="relative mx-auto max-w-[1400px] px-6 pb-32 md:px-10">
        <div className="mb-10">
          <div className="text-micro mb-3">Order · VLT-08421</div>
          <h3 className="text-display text-[32px] md:text-[44px]">
            iPhone 15 Pro Max is on its way.
          </h3>
        </div>
        <div className="glass rounded-3xl p-8 md:p-10">
          <div className="grid gap-6 md:grid-cols-4">
            {[
              ["Verified", "Mon · 09:24", true],
              ["Sealed", "Mon · 17:02", true],
              ["Dispatched", "Tue · 06:15", true],
              ["Delivering", "Wed · by 12:00", false],
            ].map(([label, time, done], i) => (
              <div key={label as string} className="relative">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-medium ${
                      done ? "bg-gold text-background" : "hairline bg-surface"
                    }`}
                  >
                    {done ? "✓" : i + 1}
                  </div>
                  <div>
                    <div className="text-[14px] font-medium">{label as string}</div>
                    <div className="text-[12px] text-muted-foreground">{time as string}</div>
                  </div>
                </div>
                {i < 3 && (
                  <div className="absolute left-8 top-4 hidden h-px w-full bg-hairline md:block" />
                )}
              </div>
            ))}
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

function StatCard({
  label,
  value,
  caption,
  progress,
  accent,
}: {
  label: string;
  value: string;
  caption: string;
  progress?: number;
  accent?: boolean;
}) {
  return (
    <div className="glass group relative overflow-hidden rounded-2xl p-5 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
      style={{ transitionTimingFunction: "var(--ease-spring)" }}>
      <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
      <div className="mt-3 flex items-baseline gap-2">
        <div className={`text-display text-[28px] ${accent ? "text-gold" : ""}`}>{value}</div>
      </div>
      <div className="mt-1 text-[12px] text-muted-foreground">{caption}</div>
      {typeof progress === "number" && (
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full bg-gold transition-all duration-1000"
            style={{ width: `${progress * 100}%`, transitionTimingFunction: "var(--ease-spring)" }}
          />
        </div>
      )}
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
            Add
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
