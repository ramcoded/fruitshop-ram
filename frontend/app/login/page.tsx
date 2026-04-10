"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await api.auth.login(username, password);
      localStorage.setItem("token", token);
      router.replace("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#f43f5e] flex-col items-center justify-center p-16 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full" />
        <div className="absolute -bottom-32 -right-16 w-80 h-80 bg-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/10 rounded-full" />

        <div className="relative z-10 text-center">
          <div className="text-8xl mb-6 drop-shadow-lg">🍓</div>
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Fresh Fruits,<br />Fresh Business
          </h1>
          <p className="text-white/80 text-lg max-w-sm leading-relaxed">
            Manage your fruit inventory effortlessly. Add, update, and track your
            products with ease.
          </p>

          {/* Floating fruit cards */}
          <div className="mt-12 flex gap-4 justify-center flex-wrap">
            {["🍎 Apple", "🥭 Mango", "🍇 Grape", "🍊 Orange", "🍌 Banana"].map(
              (f) => (
                <span
                  key={f}
                  className="bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full backdrop-blur-sm"
                >
                  {f}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-10 h-10 rounded-xl bg-[#f43f5e] flex items-center justify-center text-2xl">
              🍓
            </div>
            <span className="font-bold text-[#1e293b] text-xl">FruitShop Admin</span>
          </div>

          <h2 className="text-3xl font-bold text-[#1e293b] mb-2">Welcome back</h2>
          <p className="text-[#64748b] mb-8">Sign in to your admin account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-[#fff1f2] border border-[#fecdd3] text-[#f43f5e] text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#1e293b] mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[#1e293b] placeholder-[#94a3b8] focus:ring-2 focus:ring-[#f43f5e] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1e293b] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#e2e8f0] text-[#1e293b] placeholder-[#94a3b8] focus:ring-2 focus:ring-[#f43f5e] focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f43f5e] hover:bg-[#e11d48] disabled:opacity-60 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-150 shadow-md hover:shadow-lg active:scale-[0.99]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-[#64748b] mt-8">
            Don&apos;t have an account?{" "}
            <span className="text-[#f43f5e] font-medium cursor-default">
              Contact your administrator
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
