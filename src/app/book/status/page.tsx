"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  ArrowRight, 
  Calendar, 
  Clock, 
  CreditCard,
  User
} from "lucide-react";

const BACKEND_URL = "http://localhost:5001";

function StatusContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [booking, setBooking] = useState<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!reference) {
      setLoading(false);
      setMessage("No transaction reference found in the URL.");
      return;
    }

    async function verifyPayment() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/bookings/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference })
        });
        const data = await res.json();
        
        if (res.ok && data.success) {
          setSuccess(true);
          setBooking(data.booking);
          setMessage(data.message || "Payment verified successfully.");
        } else {
          setSuccess(false);
          setMessage(data.message || "We could not verify your payment with Paystack.");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setSuccess(false);
        setMessage("Server error occurred during payment verification.");
      } finally {
        setLoading(false);
      }
    }

    verifyPayment();
  }, [reference]);

  if (loading) {
    return (
      <div className="text-center py-16 space-y-6">
        <Loader2 className="animate-spin text-[#10B981] mx-auto" size={48} />
        <h2 className="text-2xl font-bold">Verifying Payment...</h2>
        <p className="text-gray-400 text-sm max-w-sm mx-auto">Please do not refresh or close this browser window while we verify your transaction clearance with Paystack.</p>
      </div>
    );
  }

  if (!success) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-8">
        <XCircle className="text-red-500 mx-auto" size={64} />
        <div className="space-y-3">
          <h2 className="text-3xl font-black text-white">Payment Unsuccessful</h2>
          <p className="text-red-400 text-sm">{message}</p>
        </div>
        <div className="p-6 bg-red-500/5 rounded-2xl border border-red-500/10 text-xs text-gray-400 leading-relaxed">
          If funds were deducted from your account, please send us your Paystack transaction reference: <span className="font-mono text-white block mt-2 text-sm">{reference || "N/A"}</span>
        </div>
        <div className="flex gap-4">
          <Link href="/plans" className="flex-1 py-4 bg-gray-800 hover:bg-gray-700 font-bold rounded-xl text-center transition-all text-sm border border-gray-700">
            View Rate Card
          </Link>
          <Link href="/" className="flex-1 py-4 bg-[#10B981] text-gray-950 font-extrabold rounded-xl text-center transition-all text-sm hover:bg-emerald-400 glow-btn">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-8 py-6">
      <div className="text-center space-y-4">
        <CheckCircle className="text-[#10B981] mx-auto glow-text" size={64} />
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-white tracking-tight">Booking Confirmed!</h2>
          <p className="text-emerald-400 text-sm font-mono uppercase tracking-widest">{booking?.packageName} reserved</p>
        </div>
      </div>

      {/* Reciept */}
      <div className="glass-panel p-6 border-emerald-500/20 bg-emerald-500/[0.02]">
        <h3 className="text-xs text-gray-500 uppercase tracking-widest font-mono mb-4 border-b border-gray-800 pb-3">Session Receipt</h3>
        
        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <User size={16} className="text-gray-500" />
            <div className="flex-grow flex justify-between">
              <span className="text-gray-400">Client:</span>
              <span className="font-bold text-white">{booking?.customerName}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={16} className="text-gray-500" />
            <div className="flex-grow flex justify-between">
              <span className="text-gray-400">Date:</span>
              <span className="font-mono font-bold text-white">{booking?.bookingDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock size={16} className="text-gray-500" />
            <div className="flex-grow flex justify-between">
              <span className="text-gray-400">Time:</span>
              <span className="font-mono font-bold text-white">{booking?.startTime} ({booking?.durationMinutes} mins)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard size={16} className="text-gray-500" />
            <div className="flex-grow flex justify-between">
              <span className="text-gray-400">Cleared Amount:</span>
              <span className="font-mono font-extrabold text-[#10B981]">₦{booking?.amount?.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-4 flex flex-col gap-1 text-[11px] text-gray-500">
            <span>Paystack Reference:</span>
            <span className="font-mono text-gray-400 select-all">{reference}</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-900/40 rounded-xl border border-gray-800 text-center text-xs text-gray-400 leading-relaxed">
        A calendar confirmation receipt has been dispatched to <span className="text-white font-medium">{booking?.customerEmail}</span>. Please arrive 10 minutes prior to your session starting time.
      </div>

      <div className="text-center">
        <Link href="/" className="inline-flex items-center gap-2 bg-[#10B981] text-gray-950 font-extrabold px-8 py-4 text-xs uppercase tracking-widest transition-all hover:bg-emerald-400 glow-btn">
          Return Home
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

export default function BookingStatusPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#060707] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(61,204,110,.16),transparent_36%),radial-gradient(circle_at_80%_85%,rgba(61,204,110,.08),transparent_34%)]" />

      <header className="relative z-10 border-b border-white/10 bg-[#090a0bcc] backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-[min(100%-2rem,1200px)] items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 items-center bg-[#2f9f57] px-3 font-display text-2xl leading-none">
              ADMIN
            </span>
            <span className="font-display text-3xl leading-none text-white">
              VISION
            </span>
          </Link>
          <Link href="/plans" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70 transition hover:text-white">
            View Packages
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex flex-grow items-center justify-center px-6 py-12">
        <Suspense fallback={
          <div className="text-center py-16 space-y-4">
            <Loader2 className="animate-spin text-[#10B981] mx-auto" size={48} />
            <p className="text-xs text-gray-500 font-mono">Verifying transaction...</p>
          </div>
        }>
          <StatusContent />
        </Suspense>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-[#090a0b]">
        <div className="mx-auto w-[min(100%-2rem,1200px)] py-6 text-center text-xs text-white/45">
          © {new Date().getFullYear()} Admin Vision House. Payments secured by Paystack.
        </div>
      </footer>
    </div>
  );
}
