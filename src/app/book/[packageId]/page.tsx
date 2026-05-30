"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  HelpCircle
} from "lucide-react";

interface Slot {
  time: string;
  available30Min: boolean;
  available60Min: boolean;
}

interface OperatingDay {
  date: string;
  isOperating: boolean;
}

const PACKAGES_MAP: Record<string, string> = {
  "serenity-arch": "Serenity Arch",
  "neo-tide": "Neo Tide",
  "velvet-corner": "Velvet Corner",
  "amber-lounge": "Amber Lounge",
  "elite-circle": "Elite Circle",
  "iconic-oasis": "Iconic Oasis",
  "podcast": "Podcast Studio"
};

const PACKAGE_VISUALS: Record<string, { image: string; accent: string; tagline: string; description: string }> = {
  "serenity-arch": {
    image: "/ADMIN_HOUSE/serenity-arch.jpg",
    accent: "#7cf1a8",
    tagline: "Organic minimalism & elegant curvatures",
    description: "Designed for soft fashion editorials and architectural portraits. Incorporates cream plaster arches and natural sand backdrops.",
  },
  "neo-tide": {
    image: "/ADMIN_HOUSE/neo-tide.jpg",
    accent: "#5ce0ff",
    tagline: "Cyberpunk visuals & neon pool reflections",
    description: "Includes a programmable LED roof grid, metallic mirrors, and liquid reflection water stages for futuristic shoots.",
  },
  "velvet-corner": {
    image: "/ADMIN_HOUSE/velvet-corner.jpg",
    accent: "#ff7199",
    tagline: "Tactile crimsons & gold mid-century lighting",
    description: "A sensual boudoir style showcasing rich fabrics, vintage lamps, and dimmable atmospheric brass accents.",
  },
  "amber-lounge": {
    image: "/ADMIN_HOUSE/amber-lounge.jpg",
    accent: "#ffc275",
    tagline: "Teak timbers & retro executive leather",
    description: "Inspired by mid-century record libraries. Features aniline leather club chairs, teak paneling, and warm glow rings.",
  },
  "elite-circle": {
    image: "/ADMIN_HOUSE/elite-circle.jpg",
    accent: "#d8e6ff",
    tagline: "Corporate grandeur & Calacatta marble",
    description: "An elegant monochrome studio featuring stark white Calacatta marble blocks, high-contrast setups, and corporate staging.",
  },
  "iconic-oasis": {
    image: "/ADMIN_HOUSE/iconic-oasis.jpg",
    accent: "#8ff5c0",
    tagline: "Sun-drenched rooftop & Mediterranean flora",
    description: "Simulates warm golden-hour beams cast across organic linens, potted palms, and rustic clay terracotta vessels.",
  },
  "podcast": {
    image: "/ADMIN_HOUSE/podcast.jpg",
    accent: "#95ffcb",
    tagline: "Acoustically calibrated multi-camera broadcaster",
    description: "Equipped with professional vocal acoustics, Shure mics, multi-angle 4K streaming capture, and live control mixers.",
  },
};

const BACKEND_URL = "http://localhost:5001";

export default function BookSpacePage() {
  const params = useParams();
  const router = useRouter();
  const packageId = params.packageId as string;
  const packageName = PACKAGES_MAP[packageId] || "Unknown Space";
  const packageVisual = PACKAGE_VISUALS[packageId];

  // State managers
  const [operatingDates, setOperatingDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [slots, setSlots] = useState<Slot[]>([]);
  
  // Selection details
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<number>(60);
  
  // User forms
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  
  // Loaders & errors
  const [loadingDays, setLoadingDays] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Calendar dates generation
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-indexed

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // 1. Fetch available operating dates on mount
  useEffect(() => {
    async function loadOperatingDays() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/operating-days`);
        if (!res.ok) throw new Error("Failed to load operating days");
        const data: OperatingDay[] = await res.json();
        const activeDates = data.filter(d => d.isOperating).map(d => d.date);
        setOperatingDates(activeDates);
      } catch (err) {
        console.error("Error fetching operating days:", err);
        setErrorMsg("Failed to retrieve available studio dates. Please try again.");
      } finally {
        setLoadingDays(false);
      }
    }
    loadOperatingDays();
  }, []);

  // 2. Fetch slots when date is selected
  useEffect(() => {
    if (!selectedDate) return;

    async function loadSlots() {
      setLoadingSlots(true);
      setErrorMsg("");
      setSelectedTime(""); // Reset selection
      try {
        const res = await fetch(`${BACKEND_URL}/api/bookings/available-slots?packageId=${packageId}&date=${selectedDate}`);
        if (!res.ok) throw new Error("Failed to fetch slots");
        const data = await res.json();
        if (data.isOperating) {
          setSlots(data.slots || []);
        } else {
          setSlots([]);
          setErrorMsg("Studio is closed on this date.");
        }
      } catch (err) {
        console.error("Error fetching slots:", err);
        setErrorMsg("Failed to load time slots.");
      } finally {
        setLoadingSlots(false);
      }
    }
    loadSlots();
  }, [selectedDate, packageId]);

  // Calendar render helpers
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay(); // 0 is Sunday
  };

  const daysCount = getDaysInMonth(currentYear, currentMonth);
  const startDayOffset = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    const today = new Date();
    if (currentYear === today.getFullYear() && currentMonth <= today.getMonth()) return; // Don't scroll past current month
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateSelect = (dayNum: number) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, "0");
    const formattedDay = String(dayNum).padStart(2, "0");
    const dateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
    
    if (operatingDates.includes(dateStr)) {
      setSelectedDate(dateStr);
    }
  };

  // Submit Booking to get Checkout URL
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !customerName || !customerEmail || !customerPhone) {
      setErrorMsg("Please complete all schedule selection and personal details fields.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${BACKEND_URL}/api/bookings/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId,
          durationMinutes: selectedDuration,
          bookingDate: selectedDate,
          startTime: selectedTime,
          customerName,
          customerEmail,
          customerPhone,
          callbackUrl: `${window.location.origin}/book/status`
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to initialize booking.");
      }

      // Redirect directly to Paystack payment gateway URL
      if (data.authorization_url) {
        router.push(data.authorization_url);
      } else {
        throw new Error("No gateway URL returned.");
      }
    } catch (err: any) {
      console.error("Initiation error:", err);
      setErrorMsg(err.message || "An error occurred while routing to checkout. Please try again.");
      setSubmitting(false);
    }
  };

  // Pricing calculations
  const computePrice = () => {
    if (packageId === "podcast") return 20000;
    return selectedDuration === 30 ? 20000 : 30000;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060707] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(61,204,110,.22),transparent_36%),radial-gradient(circle_at_85%_80%,rgba(61,204,110,.1),transparent_34%)]" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090a0bcc] backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-[min(100%-2rem,1320px)] items-center justify-between">
          <Link href="/plans" className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75 transition hover:border-[#3dcc6e] hover:text-white">
            <ArrowLeft size={14} />
            Back to rates
          </Link>
          <div className="text-right">
            <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-white/45">Booking package</span>
            <h1 className="font-display text-xl text-[#74f2a5]">{packageName}</h1>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-[min(100%-2rem,1320px)] pb-16 pt-28">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
          
          {/* ═══════════════════════════════════════════════════════
              LEFT COLUMN: SELECT, CALENDAR, SLOTS & DETAILS FORM
              ═══════════════════════════════════════════════════════ */}
          <section className="space-y-6">
            
            {/* Small intro block */}
            <div className="border border-white/10 bg-[#0d0e10d9] p-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#74f2a5] block mb-1">
                Step-by-Step Scheduling
              </span>
              <h2 className="font-display text-2xl md:text-3xl text-white">Configure Your Reservation</h2>
              <p className="text-xs text-white/60 leading-relaxed mt-2">
                Select your calendar date, session duration, start time, and enter your details to complete your booking securely.
              </p>
            </div>

            {/* 1. Date Selector Card */}
            <div className="border border-white/10 bg-[#0d0e10d9] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <CalendarIcon size={16} className="text-[#74f2a5]" />
                  1. Select Session Date
                </h2>
                {/* Month navigation buttons */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={prevMonth}
                    className="p-1 px-3 border border-white/15 bg-white/5 text-gray-300 hover:text-white transition-colors text-xs font-mono"
                  >
                    Prev
                  </button>
                  <span className="font-bold text-xs font-mono">{monthNames[currentMonth]} {currentYear}</span>
                  <button 
                    onClick={nextMonth}
                    className="p-1 px-3 border border-white/15 bg-white/5 text-gray-300 hover:text-white transition-colors text-xs font-mono"
                  >
                    Next
                  </button>
                </div>
              </div>

              {loadingDays ? (
                <div className="h-64 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="animate-spin text-[#10B981]" size={28} />
                  <p className="text-xs text-gray-500 font-mono">Synchronizing studio schedule...</p>
                </div>
              ) : (
                <div>
                  {/* Days of week */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono text-gray-500 mb-3 border-b border-white/10 pb-2">
                    <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
                  </div>
                  
                  {/* Date Grid */}
                  <div className="grid grid-cols-7 gap-1.5">
                    {/* Padding offsets */}
                    {Array.from({ length: startDayOffset }).map((_, idx) => (
                      <div key={`offset-${idx}`} className="h-10" />
                    ))}

                    {/* Calendar day units */}
                    {Array.from({ length: daysCount }).map((_, idx) => {
                      const dayNum = idx + 1;
                      const formattedMonth = String(currentMonth + 1).padStart(2, "0");
                      const formattedDay = String(dayNum).padStart(2, "0");
                      const fullDateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
                      const isAvailable = operatingDates.includes(fullDateStr);
                      const isSelected = selectedDate === fullDateStr;

                      return (
                        <button
                          key={`day-${dayNum}`}
                          disabled={!isAvailable}
                          onClick={() => handleDateSelect(dayNum)}
                          className={`h-10 text-xs font-mono font-bold rounded-none border transition-all flex flex-col items-center justify-center relative
                            ${isAvailable 
                              ? isSelected
                                ? "bg-[#3dcc6e] text-[#05230f] border-[#79f7ab] shadow-md scale-[1.02]"
                                : "bg-[#101312] hover:bg-[#122018] border-[#3dcc6e]/20 text-[#9df8c4] hover:border-[#3dcc6e]/45"
                              : "bg-transparent border-white/5 text-gray-700 cursor-not-allowed"
                            }
                          `}
                        >
                          <span>{dayNum}</span>
                          {isAvailable && !isSelected && (
                            <span className="w-1.5 h-1.5 bg-[#3dcc6e] rounded-full absolute bottom-1.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6 flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-none bg-[#101312] border border-[#3dcc6e]/20" />
                      <span>Operating Studio Dates</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-none bg-[#3dcc6e]" />
                      <span>Selected Date</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Time Slot & Duration Selector Card */}
            {selectedDate && (
              <div className="border border-white/10 bg-[#0d0e10d9] p-6 space-y-6">
                <h2 className="text-lg font-bold flex items-center gap-2 border-b border-white/10 pb-3">
                  <Clock size={16} className="text-[#74f2a5]" />
                  2. Select Duration & Start Time
                </h2>

                {loadingSlots ? (
                  <div className="h-40 flex flex-col items-center justify-center gap-3">
                    <Loader2 className="animate-spin text-[#10B981]" size={24} />
                    <p className="text-xs text-gray-500 font-mono">Checking slot availability...</p>
                  </div>
                ) : slots.length === 0 ? (
                  <p className="text-gray-500 text-sm">No operational time slots configured for this day.</p>
                ) : (
                  <div className="space-y-6">
                    {/* Duration Selection */}
                    {packageId !== "podcast" && (
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mb-3">Choose Duration:</div>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedDuration(30);
                              setSelectedTime("");
                            }}
                            className={`flex-1 py-3 px-4 rounded-none font-bold border transition-all text-xs font-mono
                              ${selectedDuration === 30
                                ? "bg-[#3dcc6e]/10 border-[#3dcc6e] text-[#74f2a5]"
                                : "bg-gray-900 border-white/10 text-gray-400 hover:border-white/25"
                              }
                            `}
                          >
                            30 Mins (₦20,000)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedDuration(60);
                              setSelectedTime("");
                            }}
                            className={`flex-1 py-3 px-4 rounded-none font-bold border transition-all text-xs font-mono
                              ${selectedDuration === 60
                                ? "bg-[#3dcc6e]/10 border-[#3dcc6e] text-[#74f2a5]"
                                : "bg-gray-900 border-white/10 text-gray-400 hover:border-white/25"
                              }
                            `}
                          >
                            1 Hour (₦30,000)
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Time slots grid */}
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mb-3">Available Start Times:</div>
                      <div className="grid grid-cols-4 gap-2">
                        {slots.map((slot) => {
                          const isAvailable = selectedDuration === 30 ? slot.available30Min : slot.available60Min;
                          const isSelected = selectedTime === slot.time;

                          return (
                            <button
                              key={slot.time}
                              type="button"
                              disabled={!isAvailable}
                              onClick={() => setSelectedTime(slot.time)}
                              className={`py-2.5 text-xs font-mono font-bold rounded-none border transition-all
                                ${isAvailable
                                  ? isSelected
                                    ? "bg-[#10B981] text-gray-950 border-emerald-400 font-extrabold shadow-md scale-105"
                                    : "bg-gray-900 border-white/10 text-gray-300 hover:border-[#10B981] hover:text-white"
                                  : "bg-transparent border-white/5 text-gray-700 cursor-not-allowed"
                                }
                              `}
                            >
                              {slot.time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. Final Checkout Details & Payment form */}
            {selectedDate && selectedTime && (
              <div className="border border-white/10 bg-[#0d0e10d9] p-6 space-y-6">
                <h2 className="text-lg font-bold flex items-center gap-2 border-b border-white/10 pb-3">
                  <User size={16} className="text-[#74f2a5]" />
                  3. Enter Details & Book
                </h2>
                
                {/* Direct booking summaries inside form */}
                <div className="bg-[#121316] border border-white/5 p-4 space-y-3.5 text-xs font-mono mb-4">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Reserved Space:</span>
                    <span className="font-bold text-[#74f2a5]">{packageName}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Reserved Date:</span>
                    <span className="font-bold text-white">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Reserved Time:</span>
                    <span className="font-bold text-white">{selectedTime} ({packageId === "podcast" ? "1 Hour" : `${selectedDuration} Min`})</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="font-bold text-white uppercase tracking-wider">Total Rate:</span>
                    <span className="font-black text-sm text-[#74f2a5]">₦{computePrice().toLocaleString()}</span>
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <div className="relative">
                      <User size={14} className="absolute left-3.5 top-3.5 text-gray-500" />
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-none bg-gray-900 border border-white/12 text-xs focus:outline-none focus:border-[#10B981] transition-all text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3.5 top-3.5 text-gray-500" />
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-none bg-gray-900 border border-white/12 text-xs focus:outline-none focus:border-[#10B981] transition-all text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3.5 top-3.5 text-gray-500" />
                      <input 
                        type="tel" 
                        placeholder="Phone Number" 
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-none bg-gray-900 border border-white/12 text-xs focus:outline-none focus:border-[#10B981] transition-all text-white"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-none flex items-start gap-2 text-xs text-red-400">
                      <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#10B981] text-gray-950 font-extrabold py-3.5 rounded-none text-xs uppercase tracking-wider transition-all hover:bg-emerald-400 disabled:bg-emerald-500/50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Redirecting to Paystack...
                      </>
                    ) : (
                      "Confirm & Pay with Paystack"
                    )}
                  </button>
                </form>
              </div>
            )}
            
          </section>

          {/* ═══════════════════════════════════════════════════════
              RIGHT COLUMN: SPACE IMAGE IN ITS FULL & DETAILS
              ═══════════════════════════════════════════════════════ */}
          <aside className="sticky top-28 space-y-6">
            {packageVisual && (
              <div className="border border-white/10 bg-[#0d0e10d9] p-6 space-y-6">
                
                {/* 100% full original clarity & opacity image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden border border-white/10 bg-black/20">
                  <Image
                    src={packageVisual.image}
                    alt={packageName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  {/* Subtle top left badge */}
                  <span className="absolute top-4 left-4 border border-[#3dcc6e]/45 bg-[#0b2115d0] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#74f2a5]">
                    Studio Room Setup
                  </span>
                </div>

                {/* Details Section */}
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#3dcc6e]">
                      Space details & specs
                    </span>
                    <h1 className="font-display text-4xl text-white mt-1 leading-none">
                      {packageName}
                    </h1>
                    <p className="mt-2 text-xs font-mono uppercase tracking-[0.16em] text-white/50">
                      {packageVisual.tagline}
                    </p>
                  </div>
                  
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-sm text-white/80 leading-relaxed font-light">
                      {packageVisual.description}
                    </p>
                  </div>

                  {/* Highlighting Studio Features */}
                  <div className="border-t border-white/10 pt-4 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500 block mb-2">
                      Session Inclusions:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs text-white/70">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#3dcc6e] rounded-full" />
                        <span>Professional Studio Sets</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#3dcc6e] rounded-full" />
                        <span>Controllable Studio Light</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#3dcc6e] rounded-full" />
                        <span>Full Backdrops & Props</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#3dcc6e] rounded-full" />
                        <span>High-Speed Wi-Fi / AC</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </aside>

        </div>
      </main>

      <footer className="border-t border-white/10 bg-[#090a0b]">
        <div className="mx-auto flex w-[min(100%-2rem,1320px)] flex-col items-center justify-between gap-4 py-6 text-xs text-white/45 md:flex-row">
          <span>© {new Date().getFullYear()} Admin Vision House. All rights reserved.</span>
          <span className="text-white/35">Payments secured by Paystack</span>
        </div>
      </footer>
    </div>
  );
}
