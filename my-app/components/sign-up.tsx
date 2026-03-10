"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const getStrength = (pw: string) => {
    if (!pw) return { level: 0, label: "", color: "" };
    if (pw.length < 6)  return { level: 1, label: "Weak",   color: "#ef4444" };
    if (pw.length < 10) return { level: 2, label: "Fair",   color: "#f59e0b" };
    return               { level: 3, label: "Strong", color: "#10b981" };
  };

  const strength = getStrength(form.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Signup failed.");
        return;
      }
      setSuccess("Account created! Redirecting...");
      setTimeout(() => router.push("/login"), 1500);
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "var(--bg-soft)",
    border: "1.5px solid var(--border)",
    color: "var(--text-primary)",
    fontFamily: "var(--font-body)",
  };

  const focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "var(--accent)";
    e.target.style.boxShadow = "0 0 0 3px var(--accent-glow)";
  };

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "var(--border)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: "var(--bg-soft)" }}
    >
<div
  className="w-full max-w-md rounded-2xl"
  style={{
    background: "var(--bg)",
    border: "1px solid var(--border)",
    boxShadow: "0 4px 40px rgba(46,18,74,0.08)",
    padding: "40px",        // ← inline style overrides global reset
    marginTop: "auto",
    marginBottom: "auto",
    cursor:"default"
  }}
>
        {/* Logo */}
<div className="text-center mb-8">
  <img
    src="/colobix-logo.png"
    alt="Colobix"
    className="h-25 w-40 mx-auto mb-2"
  />
  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
    Create your account
  </p>
</div>
        {error && (
          <div
            className="text-sm rounded-lg px-4 py-3 mb-5"
            style={{
              background: "rgba(220,38,38,0.06)",
              border: "1px solid rgba(220,38,38,0.2)",
              color: "#dc2626",
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            className="text-sm rounded-lg px-4 py-3 mb-5"
            style={{
              background: "rgba(16,185,129,0.06)",
              border: "1px solid rgba(16,185,129,0.2)",
              color: "#059669",
            }}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-body)" }}>
              Full Name
            </label>
            <input
              type="text" name="name" placeholder="John Doe"
              value={form.name} onChange={handleChange} required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={inputStyle} onFocus={focusHandler} onBlur={blurHandler}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-body)" }}>
              Email
            </label>
            <input
              type="email" name="email" placeholder="you@example.com"
              value={form.email} onChange={handleChange} required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={inputStyle} onFocus={focusHandler} onBlur={blurHandler}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-body)" }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} name="password"
                placeholder="Create a password" value={form.password}
                onChange={handleChange} required
                className="w-full px-4 py-3 pr-16 rounded-xl text-sm outline-none transition-all"
                style={inputStyle} onFocus={focusHandler} onBlur={blurHandler}
              />
              <button
                type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold"
                style={{ color: "var(--text-muted)" }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {/* Strength bar */}
            {form.password && (
              <div className="flex items-center gap-1.5 mt-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full transition-all duration-300"
                    style={{ background: i <= strength.level ? strength.color : "var(--border)" }}
                  />
                ))}
                <span className="text-xs font-medium ml-1" style={{ color: strength.color }}>
                  {strength.label}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-body)" }}>
              Confirm Password
            </label>
            <input
              type="password" name="confirmPassword" placeholder="Repeat your password"
              value={form.confirmPassword} onChange={handleChange} required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={inputStyle} onFocus={focusHandler} onBlur={blurHandler}
            />
          </div>

          {/* Submit */}
          <button
            type="submit" disabled={loading}
            className="btn-glow w-full py-3.5 rounded-xl text-sm font-bold text-white mt-2"
            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Creating account..." : "Create Account →"}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold hover:underline" style={{ color: "var(--accent)" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}