import {
  Camera,
  Film,
  MonitorPlay,
  Radio,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

export const landingImages = {
  hero:
    "https://images.unsplash.com/photo-1542204625-ca960ca44635?auto=format&fit=crop&w=1800&q=85",
  director:
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=85",
  studio:
    "https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?auto=format&fit=crop&w=1600&q=85",
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "/plans" },
  { label: "Contact Us", href: "#contact" },
];

export const heroAvatars = [
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=200&q=80", // Camera lens
  "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=200&q=80", // Podcast microphone
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=200&q=80", // Movie clapperboard
];

export const stats = [
  ["7+", "Unique Spaces"],
  ["500+", "Sessions Delivered"],
  ["5+", "Years Experience"],
];

export type LandingService = {
  icon: LucideIcon;
  title: string;
  desc: string;
  active: boolean;
};

export const services: LandingService[] = [
  {
    icon: Film,
    title: "Creative Film Direction",
    desc: "Concept-first direction for campaigns, reels, interviews, and cinematic brand stories.",
    active: false,
  },
  {
    icon: Radio,
    title: "Podcast & Audio Suites",
    desc: "Acoustically treated rooms built for clean conversation, multi-mic sessions, and video podcasting.",
    active: false,
  },
  {
    icon: MonitorPlay,
    title: "Expert Post Production",
    desc: "Edit-ready environments with space for review, content packaging, and fast campaign turnaround.",
    active: true,
  },
  {
    icon: Video,
    title: "Cinematic Visual Style",
    desc: "Lighting, backdrops, props, and controlled sets shaped around bold visual storytelling.",
    active: false,
  },
  {
    icon: Camera,
    title: "Photography Production",
    desc: "Editorial, product, portrait, and lifestyle setups with professional creative support.",
    active: false,
  },
  {
    icon: Users,
    title: "Private Studio Hire",
    desc: "Premium spaces for intimate events, workshops, brand activations, and creator gatherings.",
    active: false,
  },
];

export const spaces = [
  { id: "serenity-arch", name: "Serenity Arch", tag: "Photography" },
  { id: "neo-tide", name: "Neo Tide", tag: "Videography" },
  { id: "velvet-corner", name: "Velvet Corner", tag: "Creative" },
  { id: "amber-lounge", name: "Amber Lounge", tag: "Content" },
];
