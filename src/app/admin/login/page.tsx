"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Lock, 
  User, 
  Loader2, 
  AlertCircle
} from "lucide-react";

const BACKEND_URL = "http://localhost:5001";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to log in.");
      }

      // Cache token in local storage
      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_username", data.admin.username);

      router.push("/admin");
    } catch (err: any) {
      console.error("Login error:", err);
      setErrorMsg(err.message || "Invalid administrative credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sleek-border-b h-20 flex items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-widest font-bold">
          <ArrowLeft size={14} />
          Back to Home
        </Link>
        <Link href="/" className="flex items-center gap-1">
          <span className="logo-admin-box text-sm tracking-wider">ADMIN</span>
          <span className="text-sm font-extrabold text-gray-200 tracking-wider">VISION</span>
          <span className="text-[8px] font-bold text-gray-500 tracking-widest uppercase ml-1 self-end mb-0.5">HOUSE</span>
        </Link>
      </header>

      {/* Form */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md border border-[rgba(255,255,255,0.06)] p-8 md:p-10 relative overflow-hidden">
          <div className="text-center mb-8">
            <div className="w-[2px] h-8 bg-[#10B981] mx-auto mb-4"></div>
            <h1 className="text-2xl md:text-3xl font-black mb-2">ADMIN PORTAL</h1>
            <p className="text-[11px] font-bold text-[#10B981] uppercase tracking-[0.3em]">Studio Management Console</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-widest font-mono mb-2">Username</label>
              <div className="relative">
                <User size={14} className="absolute left-3.5 top-3.5 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="admin" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#16181D] border border-[rgba(255,255,255,0.06)] text-sm focus:outline-none focus:border-[#10B981] transition-all text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-widest font-mono mb-2">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-3.5 text-gray-500" />
                <input 
                  type="password" 
                  placeholder="••••••••••••" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#16181D] border border-[rgba(255,255,255,0.06)] text-sm focus:outline-none focus:border-[#10B981] transition-all text-white font-mono"
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
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#10B981] text-gray-950 font-extrabold py-4 text-xs uppercase tracking-widest transition-all hover:bg-emerald-400 disabled:bg-emerald-500/50 disabled:cursor-not-allowed glow-btn"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Verifying Credentials...
                </>
              ) : (
                "Authenticate Admin"
              )}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
            Default credentials during initial dev seed:<br />
            <span className="font-mono text-gray-300 mt-2 block">admin / adminpassword123</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="sleek-border-t bg-[#0A0B0D]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Admin Vision House. Protected administrative entry.
        </div>
      </footer>
    </div>
  );
}
