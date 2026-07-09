import heroDevice from "@/assets/hero-device.jpg";
import deviceMacbook from "@/assets/device-macbook.jpg";
import deviceWatch from "@/assets/device-watch.jpg";
import deviceAirpods from "@/assets/device-airpods.jpg";
import deviceIpad from "@/assets/device-ipad.jpg";
import deviceImac from "@/assets/device-imac.jpg";

export type Grade = "Pristine" | "Excellent" | "Good";

export interface Device {
  id: string;
  model: string;
  storage: string;
  color: string;
  grade: Grade;
  battery: number | null;
  price: number;
  was?: number;
  stock: number;
  image: string;
  category: string;
  tagline: string;
  specs: { label: string; value: string }[];
  inTheBox: string[];
  tradeInEligible: boolean;
  tradeInBonus?: number;
  warrantyMonths: number;
}

export const inventory: Device[] = [
  {
    id: "iph-15pm-titan",
    model: "iPhone 15 Pro Max",
    storage: "512 GB",
    color: "Natural Titanium",
    grade: "Pristine",
    battery: 98,
    price: 1149,
    was: 1399,
    stock: 3,
    image: heroDevice,
    category: "iPhone",
    tagline: "Titanium. So strong. So light. So Pro.",
    specs: [
      { label: "Chip", value: "Apple A17 Pro · 6-core GPU" },
      { label: "Display", value: '6.7" Super Retina XDR · ProMotion' },
      { label: "Camera", value: "48MP Main · 5× Telephoto · 12MP UW" },
      { label: "Storage", value: "512 GB" },
      { label: "Connectivity", value: "5G · USB-C · Wi-Fi 6E" },
      { label: "Battery health", value: "98%" },
      { label: "Weight", value: "221 g" },
      { label: "Water resistance", value: "IP68" },
    ],
    inTheBox: ["Device", "USB-C to USB-C cable", "Vault documentation", "Sealed Vault box"],
    tradeInEligible: true,
    tradeInBonus: 75,
    warrantyMonths: 24,
  },
  {
    id: "mbp-14-m3",
    model: 'MacBook Pro 14"',
    storage: "M3 Pro · 1 TB",
    color: "Space Black",
    grade: "Pristine",
    battery: 100,
    price: 1889,
    was: 2299,
    stock: 2,
    image: deviceMacbook,
    category: "Mac",
    tagline: "Mind-bending. Head-turning. Game-changing.",
    specs: [
      { label: "Chip", value: "Apple M3 Pro · 11-core CPU · 14-core GPU" },
      { label: "Memory", value: "18 GB unified memory" },
      { label: "Storage", value: "1 TB SSD" },
      { label: "Display", value: '14.2" Liquid Retina XDR · 120 Hz' },
      { label: "Battery", value: "Up to 18 hrs · 100% health" },
      { label: "Ports", value: "3× TB4 · HDMI · SDXC · MagSafe 3" },
      { label: "Weight", value: "1.61 kg" },
    ],
    inTheBox: ["MacBook Pro", "70W USB-C adapter", "USB-C to MagSafe 3", "Vault box"],
    tradeInEligible: true,
    tradeInBonus: 120,
    warrantyMonths: 24,
  },
  {
    id: "wu-2",
    model: "Apple Watch Ultra 2",
    storage: "49mm · Cellular",
    color: "Titanium · Orange Alpine",
    grade: "Excellent",
    battery: 95,
    price: 649,
    was: 849,
    stock: 5,
    image: deviceWatch,
    category: "Watch",
    tagline: "The most rugged and capable Apple Watch.",
    specs: [
      { label: "Case", value: "49mm aerospace-grade titanium" },
      { label: "Chip", value: "S9 SiP · Second-generation UWB" },
      { label: "Display", value: "Always-On Retina · 3000 nits" },
      { label: "Battery", value: "Up to 36 hrs · 95% health" },
      { label: "Connectivity", value: "GPS + Cellular · Wi-Fi 4" },
      { label: "Water resistance", value: "WR100 · EN13319" },
    ],
    inTheBox: ["Apple Watch Ultra 2", "Orange Alpine Loop", "Magnetic fast charger"],
    tradeInEligible: true,
    tradeInBonus: 40,
    warrantyMonths: 24,
  },
  {
    id: "apm-mid",
    model: "AirPods Max",
    storage: "USB-C",
    color: "Midnight",
    grade: "Excellent",
    battery: 92,
    price: 379,
    was: 549,
    stock: 8,
    image: deviceAirpods,
    category: "Audio",
    tagline: "Immersive sound engineered by Apple.",
    specs: [
      { label: "Chip", value: "H1 · Adaptive EQ" },
      { label: "Noise control", value: "Active Noise Cancellation · Transparency" },
      { label: "Battery", value: "Up to 20 hrs · 92% health" },
      { label: "Charging", value: "USB-C" },
      { label: "Weight", value: "384.8 g" },
    ],
    inTheBox: ["AirPods Max", "Smart Case", "USB-C to USB-C cable"],
    tradeInEligible: true,
    warrantyMonths: 24,
  },
  {
    id: "ipad-pro",
    model: 'iPad Pro 12.9"',
    storage: "M2 · 256 GB",
    color: "Space Grey",
    grade: "Excellent",
    battery: 94,
    price: 899,
    stock: 4,
    image: deviceIpad,
    category: "iPad",
    tagline: "Supercharged by M2. Unbelievably capable.",
    specs: [
      { label: "Chip", value: "Apple M2 · 8-core CPU · 10-core GPU" },
      { label: "Display", value: '12.9" Liquid Retina XDR · ProMotion' },
      { label: "Storage", value: "256 GB" },
      { label: "Connectivity", value: "Wi-Fi 6E · USB-C / Thunderbolt" },
      { label: "Battery", value: "Up to 10 hrs · 94% health" },
      { label: "Compatibility", value: "Apple Pencil 2 · Magic Keyboard" },
    ],
    inTheBox: ["iPad Pro", "20W USB-C adapter", "USB-C cable"],
    tradeInEligible: true,
    warrantyMonths: 24,
  },
  {
    id: "imac-24",
    model: 'iMac 24"',
    storage: "M3 · 512 GB",
    color: "Silver",
    grade: "Good",
    battery: null,
    price: 1249,
    was: 1599,
    stock: 1,
    image: deviceImac,
    category: "Mac",
    tagline: "A brilliant idea. Beautifully realised.",
    specs: [
      { label: "Chip", value: "Apple M3 · 8-core CPU · 10-core GPU" },
      { label: "Memory", value: "16 GB unified memory" },
      { label: "Storage", value: "512 GB SSD" },
      { label: "Display", value: '24" 4.5K Retina · P3' },
      { label: "Ports", value: "2× TB4 · 2× USB 3 · Gigabit Ethernet" },
      { label: "Includes", value: "Magic Keyboard · Magic Mouse" },
    ],
    inTheBox: ["iMac", "Magic Keyboard", "Magic Mouse", "143W power adapter"],
    tradeInEligible: false,
    warrantyMonths: 24,
  },
];

export function getDevice(id: string): Device | undefined {
  return inventory.find((d) => d.id === id);
}
