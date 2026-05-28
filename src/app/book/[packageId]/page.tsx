"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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

const PACKAGE_VISUALS: Record<string, { image: string; accent: string }> = {
  "serenity-arch": {
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80",
    accent: "#7cf1a8",
  },
  "neo-tide": {
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1600&q=80",
    accent: "#5ce0ff",
  },
  "velvet-corner": {
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=1600&q=80",
    accent: "#ff7199",
  },
  "amber-lounge": {
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80",
    accent: "#ffc275",
  },
  "elite-circle": {
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
    accent: "#d8e6ff",
  },
  "iconic-oasis": {
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
    accent: "#8ff5c0",
  },
  "podcast": {
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1600&q=80",
    accent: "#95ffcb",
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

      <main className="relative z-10 mx-auto grid w-[min(100%-2rem,1320px)] grid-cols-1 gap-8 pb-16 pt-28 lg:grid-cols-12 lg:items-start">
        <section className="lg:col-span-8 space-y-8">
          <div className="relative overflow-hidden border border-white/10 p-6 md:p-7">
            {packageVisual ? (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-30"
                  style={{ backgroundImage: `url(${packageVisual.image})` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.82))]" />
              </>
            ) : null}
            <div className="relative z-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">Secure booking flow</p>
                <h2 className="font-display text-4xl leading-[0.9]">Reserve {packageName}</h2>
              </div>
              <p className="max-w-xs text-sm text-white/70">
                Choose date, time, and duration. Then complete payment securely with Paystack.
              </p>
            </div>
          </div>

          <div className="border border-white/10 bg-[#0d0e10d9] p-6 md:p-7">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <CalendarIcon size={18} className="text-[#74f2a5]" />
                Select Session Date
              </h2>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={prevMonth}
                  className="p-1 px-3 border border-white/15 bg-white/5 text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Prev
                </button>
                <span className="font-bold text-sm font-mono">{monthNames[currentMonth]} {currentYear}</span>
                <button 
                  onClick={nextMonth}
                  className="p-1 px-3 border border-white/15 bg-white/5 text-gray-300 hover:text-white transition-colors text-sm"
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
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono text-gray-500 mb-4 border-b border-white/10 pb-2">
                  <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
                </div>
                
                {/* Date Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Padding offsets */}
                  {Array.from({ length: startDayOffset }).map((_, idx) => (
                    <div key={`offset-${idx}`} className="h-12" />
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
                        className={`h-12 text-sm font-mono font-bold rounded-none border transition-all flex flex-col items-center justify-center relative
                          ${isAvailable 
                            ? isSelected
                              ? "bg-[#3dcc6e] text-[#05230f] border-[#79f7ab] shadow-lg scale-[1.02]"
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
                    <div className="w-3 h-3 rounded-none bg-emerald-500/5 border border-emerald-500/20" />
                    <span>Operating Studio Dates</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-none bg-[#10B981]" />
                    <span>Selected Date</span>
            </div>
          </div>
              </div>
            )}
          </div>

          {/* Time slot picker */}
          {selectedDate && (
            <div className="border border-white/10 bg-[#0d0e10d9] p-6 md:p-7">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <Clock size={18} className="text-[#74f2a5]" />
                Select Start Time & Duration
              </h2>

              {loadingSlots ? (
                <div className="h-40 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="animate-spin text-[#10B981]" size={24} />
                  <p className="text-xs text-gray-500 font-mono">Checking slots availability...</p>
                </div>
              ) : slots.length === 0 ? (
                <p className="text-gray-500 text-sm">No operational time slots configured for this day.</p>
              ) : (
                <div className="space-y-6">
                  {/* Duration Selector */}
                  {packageId !== "podcast" && (
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-3">Choose Duration:</div>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedDuration(30);
                            setSelectedTime("");
                          }}
                          className={`flex-1 py-3 px-4 rounded-none font-bold border transition-all text-sm
                            ${selectedDuration === 30
                              ? "bg-emerald-500/10 border-[#10B981] text-emerald-400"
                              : "bg-gray-900 border-white/10 text-gray-400 hover:border-white/25"
                            }
                          `}
                        >
                          30 Minutes (₦20,000)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedDuration(60);
                            setSelectedTime("");
                          }}
                          className={`flex-1 py-3 px-4 rounded-none font-bold border transition-all text-sm
                            ${selectedDuration === 60
                              ? "bg-emerald-500/10 border-[#10B981] text-emerald-400"
                              : "bg-gray-900 border-white/10 text-gray-400 hover:border-white/25"
                            }
                          `}
                        >
                          1 Hour (₦30,000)
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Time grid */}
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-3">Available Start Times:</div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {slots.map((slot) => {
                        const isAvailable = selectedDuration === 30 ? slot.available30Min : slot.available60Min;
                        const isSelected = selectedTime === slot.time;

                        return (
                          <button
                            key={slot.time}
                            type="button"
                            disabled={!isAvailable}
                            onClick={() => setSelectedTime(slot.time)}
                            className={`py-3 text-sm font-mono font-bold rounded-none border transition-all
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
        </section>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 border border-white/12 bg-[#0f1114ed] p-6">
            <h3 className="text-lg font-bold mb-4 text-white pb-3 border-b border-white/10">Booking Summary</h3>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Selected Space:</span>
                <span className="font-bold text-white">{packageName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date:</span>
                <span className="font-mono text-white">{selectedDate || "Not chosen"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Start Time:</span>
                <span className="font-mono text-white">{selectedTime || "Not chosen"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Duration:</span>
                <span className="font-mono text-white">{packageId === "podcast" ? "1 Hour" : `${selectedDuration} Minutes`}</span>
              </div>
              
              <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                <span className="font-bold text-white">Total Rate:</span>
                <span className="font-mono font-extrabold text-xl text-[#10B981]">₦{computePrice().toLocaleString()}</span>
              </div>
            </div>

            {selectedDate && selectedTime ? (
              <form onSubmit={handleBookingSubmit} className="space-y-4 pt-4 border-t border-white/10">
                <h4 className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-2">Customer Details:</h4>
                
                <div>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-3.5 text-gray-500" />
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-none bg-gray-900 border border-white/12 text-sm focus:outline-none focus:border-[#10B981] transition-all text-white"
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
                      className="w-full pl-10 pr-4 py-3 rounded-none bg-gray-900 border border-white/12 text-sm focus:outline-none focus:border-[#10B981] transition-all text-white"
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
                      className="w-full pl-10 pr-4 py-3 rounded-none bg-gray-900 border border-white/12 text-sm focus:outline-none focus:border-[#10B981] transition-all text-white"
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
                  className="w-full flex items-center justify-center gap-2 bg-[#10B981] text-gray-950 font-extrabold py-4 rounded-none transition-all hover:bg-emerald-400 disabled:bg-emerald-500/50 disabled:cursor-not-allowed"
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
            ) : (
              <div className="p-4 bg-gray-900/60 rounded-none border border-white/10 text-center text-xs text-gray-500">
                Please select a calendar date and start time slot to proceed to secure Paystack billing checkout.
              </div>
            )}
          </div>
        </aside>
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
