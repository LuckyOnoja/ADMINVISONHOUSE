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

const BACKEND_URL = "http://localhost:5001";

export default function BookSpacePage() {
  const params = useParams();
  const router = useRouter();
  const packageId = params.packageId as string;
  const packageName = PACKAGES_MAP[packageId] || "Unknown Space";

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
    <div className="flex flex-col min-h-screen">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0E10]/80 backdrop-blur-xl sleek-border-b">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link href="/plans" className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-widest font-bold">
            <ArrowLeft size={14} />
            Back to Rates
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[10px] text-gray-600 uppercase tracking-widest font-mono block">Booking</span>
              <h1 className="text-sm font-bold text-[#10B981]">{packageName}</h1>
            </div>
            <Link href="/" className="flex items-center gap-1 shrink-0">
              <span className="logo-admin-box text-[10px] py-0">ADMIN</span>
              <span className="text-[10px] font-extrabold text-gray-400 tracking-wider">VISION</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-28 pb-16 px-6 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Calendar and Slots Selection (Col-8) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="glass-panel p-6 border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <CalendarIcon size={18} className="text-[#10B981]" />
                Select Session Date
              </h2>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={prevMonth}
                  className="p-1 px-3 rounded bg-gray-800 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Prev
                </button>
                <span className="font-bold text-sm font-mono">{monthNames[currentMonth]} {currentYear}</span>
                <button 
                  onClick={nextMonth}
                  className="p-1 px-3 rounded bg-gray-800 text-gray-400 hover:text-white transition-colors text-sm"
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
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono text-gray-500 mb-4 border-b border-gray-800 pb-2">
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
                        className={`h-12 text-sm font-mono font-bold rounded-lg border transition-all flex flex-col items-center justify-center relative
                          ${isAvailable 
                            ? isSelected
                              ? "bg-[#10B981] text-gray-950 border-emerald-400 shadow-lg scale-105"
                              : "bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:border-emerald-500/40"
                            : "bg-transparent border-transparent text-gray-700 cursor-not-allowed"
                          }
                        `}
                      >
                        <span>{dayNum}</span>
                        {isAvailable && !isSelected && (
                          <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full absolute bottom-1.5" />
                        )}
                      </button>
                    );
                  })}
                </div>
                
                <div className="mt-6 flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-emerald-500/5 border border-emerald-500/20" />
                    <span>Operating Studio Dates</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-[#10B981]" />
                    <span>Selected Date</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Time slot picker */}
          {selectedDate && (
            <div className="glass-panel p-6 border-gray-800">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <Clock size={18} className="text-[#10B981]" />
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
                          className={`flex-1 py-3 px-4 rounded-xl font-bold border transition-all text-sm
                            ${selectedDuration === 30
                              ? "bg-emerald-500/10 border-[#10B981] text-emerald-400"
                              : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"
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
                          className={`flex-1 py-3 px-4 rounded-xl font-bold border transition-all text-sm
                            ${selectedDuration === 60
                              ? "bg-emerald-500/10 border-[#10B981] text-emerald-400"
                              : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"
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
                            className={`py-3 text-sm font-mono font-bold rounded-lg border transition-all
                              ${isAvailable
                                ? isSelected
                                  ? "bg-[#10B981] text-gray-950 border-emerald-400 font-extrabold shadow-md scale-105"
                                  : "bg-gray-900 border-gray-800 text-gray-300 hover:border-[#10B981] hover:text-white"
                                : "bg-transparent border-transparent text-gray-700 cursor-not-allowed"
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
        </div>

        {/* Checkout overlay sidebar (Col-4) */}
        <div className="lg:col-span-4">
          <div className="glass-panel p-6 border-gray-800 sticky top-28 bg-[#151922]">
            <h3 className="text-lg font-bold mb-4 text-white pb-3 border-b border-gray-800">Booking Summary</h3>
            
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
              
              <div className="border-t border-gray-800 pt-4 flex justify-between items-center">
                <span className="font-bold text-white">Total Rate:</span>
                <span className="font-mono font-extrabold text-xl text-[#10B981] glow-text">₦{computePrice().toLocaleString()}</span>
              </div>
            </div>

            {selectedDate && selectedTime ? (
              <form onSubmit={handleBookingSubmit} className="space-y-4 pt-4 border-t border-gray-800/80">
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
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900 border border-gray-800 text-sm focus:outline-none focus:border-[#10B981] transition-all text-white"
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
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900 border border-gray-800 text-sm focus:outline-none focus:border-[#10B981] transition-all text-white"
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
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900 border border-gray-800 text-sm focus:outline-none focus:border-[#10B981] transition-all text-white"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2 text-xs text-red-400">
                    <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#10B981] text-gray-950 font-extrabold py-4 rounded-xl transition-all hover:bg-emerald-400 disabled:bg-emerald-500/50 disabled:cursor-not-allowed glow-btn"
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
              <div className="p-4 bg-gray-900/60 rounded-xl border border-gray-800 text-center text-xs text-gray-500">
                Please select a calendar date and start time slot to proceed to secure Paystack billing checkout.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="sleek-border-t bg-[#0A0B0D]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} Admin Vision House. All rights reserved.</span>
          <span className="text-gray-700">Payments secured by Paystack</span>
        </div>
      </footer>
    </div>
  );
}
