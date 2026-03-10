"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      console.log("Response data:", data);
console.log("Role:", data.user?.role);
console.log("Role type:", typeof data.user?.role);


      if (!res.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      // Store in localStorage
      localStorage.setItem("colobix_token", data.token);
      localStorage.setItem("colobix_user", JSON.stringify(data.user));

      // Store in cookie for middleware
      document.cookie = `colobix_token=${data.token}; path=/; max-age=${60 * 60 * 24}`;

      // Redirect based on role
      if (Number(data.user.role) === 1) {
        router.push("/admin-dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="auth-page min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--bg-soft)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl"
        style={{
          background: "var(--bg)",
          border: "1px solid var(--border)",
          boxShadow: "0 4px 40px rgba(46,18,74,0.08)",
          padding: "40px",
          cursor: "default",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <img
            src="/colobix-logo.png"
            alt="Colobix"
            style={{ height: "48px", width: "auto", margin: "0 auto 8px" }}
          />
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            Sign in to your account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(220,38,38,0.06)",
            border: "1px solid rgba(220,38,38,0.2)",
            color: "#dc2626",
            fontSize: "13px",
            borderRadius: "8px",
            padding: "12px 16px",
            marginBottom: "20px",
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

          {/* Email */}
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-body)", marginBottom: "6px" }}>
              Email
            </label>
            <input
              type="email" name="email" placeholder="you@example.com"
              value={form.email} onChange={handleChange} required
              style={{
                display: "block", width: "100%",
                padding: "12px 16px",
                background: "var(--bg-soft)",
                border: "1.5px solid var(--border)",
                borderRadius: "10px",
                color: "var(--text-primary)",
                fontFamily: "var(--font-body)",
                fontSize: "14px", outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(139,47,201,0.15)"; }}
              onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
            />
          </div>

          {/* Password */}
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-body)", marginBottom: "6px" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"} name="password"
                placeholder="Enter your password" value={form.password}
                onChange={handleChange} required
                style={{
                  display: "block", width: "100%",
                  padding: "12px 56px 12px 16px",
                  background: "var(--bg-soft)",
                  border: "1.5px solid var(--border)",
                  borderRadius: "10px",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-body)",
                  fontSize: "14px", outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(139,47,201,0.15)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
              />
              <button
                type="button" onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute", right: "14px", top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: "12px", fontWeight: 600,
                  color: "var(--text-muted)", fontFamily: "var(--font-body)",
                  padding: 0,
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit" disabled={loading}
            className="btn-glow"
            style={{
              display: "block", width: "100%",
              padding: "14px",
              marginTop: "6px",
              borderRadius: "10px",
              fontSize: "14px", fontWeight: 700,
              color: "white",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              fontFamily: "var(--font-body)",
            }}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>
      </div>
    </div>
  );
}