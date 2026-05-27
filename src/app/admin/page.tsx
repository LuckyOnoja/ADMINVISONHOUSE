"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Calendar as CalendarIcon, 
  List, 
  LogOut, 
  Loader2, 
  DollarSign, 
  User, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  FileText,
  Clock,
  Briefcase,
  Search
} from "lucide-react";

interface OperatingDay {
  id: string;
  date: string;
  isOperating: boolean;
}

interface Booking {
  id: string;
  packageId: string;
  packageName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingDate: string;
  startTime: string;
  durationMinutes: number;
  amount: number;
  status: "PENDING" | "CONFIRMED" | "FAILED";
  paystackReference: string;
  createdAt: string;
}

const BACKEND_URL = "http://localhost:5001";

export default function AdminDashboardPage() {
  const router = useRouter();
  
  // Auth
  const [token, setToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Data State
  const [operatingDays, setOperatingDays] = useState<OperatingDay[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<"schedule" | "bookings">("schedule");

  // Loaders
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [togglingDate, setTogglingDate] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Filters & Analytics
  const [searchTerm, setSearchTerm] = useState("");
  
  // Calendar month state
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // 1. Auth check
  useEffect(() => {
    const cachedToken = localStorage.getItem("admin_token");
    const cachedUser = localStorage.getItem("admin_username") || "Admin";
    
    if (!cachedToken) {
      router.push("/admin/login");
    } else {
      setToken(cachedToken);
      setAdminUser(cachedUser);
      setCheckingAuth(false);
    }
  }, [router]);

  // 2. Fetch Operating Days
  const fetchOperatingDays = async () => {
    setLoadingSchedule(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/operating-days`);
      if (!res.ok) throw new Error("Failed to load operating days");
      const data = await res.json();
      setOperatingDays(data || []);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to query scheduling details.");
    } finally {
      setLoadingSchedule(false);
    }
  };

  // 3. Fetch Bookings (Protected Route)
  const fetchBookings = async (authToken: string) => {
    setLoadingBookings(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/bookings`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if (!res.ok) throw new Error("Failed to fetch bookings list.");
      const data = await res.json();
      setBookings(data || []);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to load booking list.");
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOperatingDays();
      fetchBookings(token);
    }
  }, [token]);

  // Toggle operating status
  const handleToggleOperatingDay = async (dateStr: string, currentStatus: boolean) => {
    if (!token) return;
    setTogglingDate(dateStr);
    try {
      const res = await fetch(`${BACKEND_URL}/api/operating-days`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          date: dateStr,
          isOperating: !currentStatus
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update day.");
      
      // Update local state list
      setOperatingDays((prev) => {
        const index = prev.findIndex((d) => d.date === dateStr);
        if (index > -1) {
          const updated = [...prev];
          updated[index] = data.operatingDay;
          return updated;
        } else {
          return [...prev, data.operatingDay];
        }
      });
    } catch (err: any) {
      console.error("Toggle error:", err);
      setErrorMsg(err.message || "Could not toggle the scheduling date.");
    } finally {
      setTogglingDate(null);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_username");
    router.push("/admin/login");
  };

  // Calendar calculations
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysCount = getDaysInMonth(currentYear, currentMonth);
  const startDayOffset = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
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

  // Filtered bookings lists
  const filteredBookings = bookings.filter((b) => {
    const searchString = `${b.customerName} ${b.customerEmail} ${b.packageName} ${b.paystackReference}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  // KPI summaries
  const totalRevenue = bookings
    .filter(b => b.status === "CONFIRMED")
    .reduce((sum, b) => sum + b.amount, 0);

  const confirmedCount = bookings.filter(b => b.status === "CONFIRMED").length;

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0B0C10] flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-[#10B981]" size={36} />
        <span className="text-xs text-gray-500 font-mono">Authenticating administrative session...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0E10]/80 backdrop-blur-xl sleek-border-b">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1 shrink-0">
              <span className="logo-admin-box text-sm tracking-wider">ADMIN</span>
              <span className="text-sm font-extrabold text-gray-200 tracking-wider">VISION</span>
              <span className="text-[8px] font-bold text-gray-500 tracking-widest uppercase ml-1 self-end mb-0.5">HOUSE</span>
            </Link>
            <span className="text-[9px] px-2.5 py-1 bg-emerald-500/10 text-[#10B981] font-bold tracking-widest uppercase border border-emerald-500/20">ADMIN</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-xs text-gray-500 font-mono">Session: <strong className="text-white font-bold">{adminUser}</strong></span>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold px-4 py-2 text-[10px] uppercase tracking-widest transition-all border border-red-500/20"
            >
              <LogOut size={12} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* KPI Section */}
      <section className="pt-28 pb-8 px-6 sleek-border-b">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[rgba(255,255,255,0.03)]">
          <div className="bg-[#0D0E10] p-8 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-600 uppercase tracking-widest font-mono">Gross Earnings (Paystack)</span>
              <div className="text-3xl font-black mt-2 text-[#10B981] font-mono">₦{totalRevenue.toLocaleString()}</div>
            </div>
            <div className="w-14 h-14 border border-gray-800 flex items-center justify-center text-[#10B981]">
              <DollarSign size={24} />
            </div>
          </div>

          <div className="bg-[#0D0E10] p-8 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-600 uppercase tracking-widest font-mono">Confirmed bookings</span>
              <div className="text-3xl font-black mt-2 text-white font-mono">{confirmedCount} Sessions</div>
            </div>
            <div className="w-14 h-14 border border-gray-800 flex items-center justify-center text-[#10B981]">
              <CheckCircle size={24} />
            </div>
          </div>

          <div className="bg-[#0D0E10] p-8 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-600 uppercase tracking-widest font-mono">Scheduled Days</span>
              <div className="text-3xl font-black mt-2 text-white font-mono">
                {operatingDays.filter(d => d.isOperating).length} Active
              </div>
            </div>
            <div className="w-14 h-14 border border-gray-800 flex items-center justify-center text-[#10B981]">
              <CalendarIcon size={24} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspace */}
      <main className="flex-grow max-w-[1400px] mx-auto px-6 lg:px-10 py-12 w-full">
        {errorMsg && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-sm text-red-400 mb-8 max-w-xl">
            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
            <div className="flex-grow flex justify-between items-center">
              <span>{errorMsg}</span>
              <button onClick={() => setErrorMsg("")} className="text-xs hover:text-white font-bold ml-4">Dismiss</button>
            </div>
          </div>
        )}

        {/* Tab switches */}
        <div className="flex gap-4 border-b border-gray-800 pb-6 mb-8">
          <button
            onClick={() => setActiveTab("schedule")}
            className={`flex items-center gap-2 px-6 py-3 text-xs font-bold border uppercase tracking-widest transition-all
              ${activeTab === "schedule"
                ? "bg-[#10B981] text-gray-950 border-emerald-400"
                : "bg-transparent border-gray-800 text-gray-500 hover:border-gray-600 hover:text-white"
              }
            `}
          >
            <CalendarIcon size={16} />
            Manage Studio Schedule
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 px-6 py-3 text-xs font-bold border uppercase tracking-widest transition-all
              ${activeTab === "bookings"
                ? "bg-[#10B981] text-gray-950 border-emerald-400"
                : "bg-transparent border-gray-800 text-gray-500 hover:border-gray-600 hover:text-white"
              }
            `}
          >
            <List size={16} />
            Reservation Log ({bookings.length})
          </button>
        </div>

        {/* TAB 1: STUDIO SCHEDULE MANAGEMENT */}
        {activeTab === "schedule" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Calendar panel (Col-8) */}
            <div className="lg:col-span-8 glass-panel p-6 border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Studio Schedule Planner</h2>
                  <p className="text-xs text-gray-400 mt-1">Tick operating days to open bookings for clients on the booking site.</p>
                </div>

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

              {loadingSchedule ? (
                <div className="h-64 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="animate-spin text-[#10B981]" size={28} />
                  <p className="text-xs text-gray-500 font-mono">Synching planner states...</p>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono text-gray-500 mb-4 border-b border-gray-800 pb-2">
                    <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: startDayOffset }).map((_, idx) => (
                      <div key={`offset-${idx}`} className="h-14" />
                    ))}

                    {Array.from({ length: daysCount }).map((_, idx) => {
                      const dayNum = idx + 1;
                      const formattedMonth = String(currentMonth + 1).padStart(2, "0");
                      const formattedDay = String(dayNum).padStart(2, "0");
                      const fullDateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
                      
                      const operatingDayRecord = operatingDays.find(d => d.date === fullDateStr);
                      const isOperating = operatingDayRecord ? operatingDayRecord.isOperating : false;
                      const isProcessing = togglingDate === fullDateStr;

                      return (
                        <button
                          key={`day-${dayNum}`}
                          disabled={isProcessing}
                          onClick={() => handleToggleOperatingDay(fullDateStr, isOperating)}
                          className={`h-14 text-sm font-mono font-bold rounded-lg border transition-all flex flex-col items-center justify-center relative
                            ${isOperating
                              ? "bg-emerald-500/10 border-[#10B981] text-emerald-400 hover:bg-emerald-500/20"
                              : "bg-gray-900 border-gray-800 text-gray-500 hover:border-gray-700"
                            }
                            ${isProcessing ? "opacity-50" : ""}
                          `}
                        >
                          {isProcessing ? (
                            <Loader2 className="animate-spin text-[#10B981]" size={14} />
                          ) : (
                            <>
                              <span>{dayNum}</span>
                              <span className={`w-2 h-2 rounded-full absolute bottom-1.5 
                                ${isOperating ? "bg-[#10B981]" : "bg-gray-800"}
                              `} />
                            </>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar help (Col-4) */}
            <div className="lg:col-span-4 glass-panel p-6 border-gray-800 bg-[#121620]">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-3">Scheduler Guide</h3>
              <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
                <p>
                  1. Tapping a calendar date toggles it as an <strong>Active Operating Day</strong>.
                </p>
                <p>
                  2. A glowing <span className="text-[#10B981] font-bold">Green Dot</span> indicates the studio is operational on that date.
                </p>
                <p>
                  3. Clients visiting the booking site can view and select only dates marked green.
                </p>
                <p>
                  4. Disabling a day immediately blocks all bookings on that date. Confirmed bookings will remain stored in the log.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CONFIRMED RESERVATIONS LIST */}
        {activeTab === "bookings" && (
          <div className="glass-panel p-6 border-gray-800">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 border-b border-gray-800 pb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Client Reservation Log</h2>
                <p className="text-xs text-gray-400 mt-1">Full audit list of booking entries initialized via client checkout.</p>
              </div>

              {/* Search bar */}
              <div className="relative w-full md:w-80">
                <Search size={14} className="absolute left-3.5 top-3.5 text-gray-500" />
                <input 
                  type="text"
                  placeholder="Filter name, email, or reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-900 border border-gray-800 text-xs focus:outline-none focus:border-[#10B981] transition-all text-white font-mono"
                />
              </div>
            </div>

            {loadingBookings ? (
              <div className="h-64 flex flex-col items-center justify-center gap-3">
                <Loader2 className="animate-spin text-[#10B981]" size={28} />
                <p className="text-xs text-gray-500 font-mono">Synchronizing checkout registers...</p>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <FileText size={40} className="text-gray-700 mx-auto" />
                <p className="text-gray-500 text-sm">No transaction records found matching your filters.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-500 font-mono uppercase tracking-wider">
                      <th className="pb-3 font-semibold">Client Name</th>
                      <th className="pb-3 font-semibold">Studio Space</th>
                      <th className="pb-3 font-semibold">Scheduled Session</th>
                      <th className="pb-3 font-semibold">Amount</th>
                      <th className="pb-3 font-semibold">Reference</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 font-mono">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-gray-900/30 transition-colors">
                        <td className="py-4">
                          <div className="font-bold text-white text-sm font-sans">{b.customerName}</div>
                          <div className="text-gray-500 text-[10px] mt-0.5">{b.customerEmail} | {b.customerPhone}</div>
                        </td>
                        <td className="py-4 text-[#10B981] font-bold text-sm font-sans">
                          {b.packageName}
                        </td>
                        <td className="py-4">
                          <div className="text-white text-sm font-bold flex items-center gap-1">
                            <Clock size={12} className="text-gray-500" />
                            {b.startTime}
                          </div>
                          <div className="text-gray-500 text-[10px] mt-0.5">{b.bookingDate} ({b.durationMinutes} mins)</div>
                        </td>
                        <td className="py-4 text-white font-bold text-sm">
                          ₦{b.amount.toLocaleString()}
                        </td>
                        <td className="py-4 text-gray-400 select-all">
                          {b.paystackReference}
                        </td>
                        <td className="py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border
                            ${b.status === "CONFIRMED" 
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : b.status === "PENDING"
                              ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                              : "bg-red-500/10 text-red-400 border-red-500/20"
                            }
                          `}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="sleek-border-t bg-[#0A0B0D]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Admin Vision House. Protected administrative portal.
        </div>
      </footer>
    </div>
  );
}
