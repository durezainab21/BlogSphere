"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      if (!API_URL) {
        alert("API URL is not configured.");
        console.error("NEXT_PUBLIC_API_URL is missing.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Register Response:", data);

      if (!response.ok) {
        alert(data.message || "Registration failed.");
        return;
      }

      if (data.success) {
        alert(data.message || "Registration successful!");

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        router.push("/login");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF8EE] flex items-center justify-center px-6">
      <div className="w-full max-w-lg bg-[#FFFDF8] border border-[#E8DCC8] rounded-3xl p-10 shadow-2xl">

        {/* Logo */}
        <h1 className="text-center text-2xl font-bold text-[#2B1B17]">
          Blog
          <span className="text-[#800000]">Sphere.</span>
        </h1>

        {/* Icon */}
        <div className="mx-auto mt-6 w-14 h-14 rounded-full bg-[#F8EBDD] flex items-center justify-center text-2xl">
          ✍️
        </div>

        {/* Heading */}
        <h2 className="mt-5 text-3xl font-bold text-center text-[#2B1B17]">
          Create Account
        </h2>

        <p className="text-[#6B4F45] text-center mt-3">
          Join BlogSphere and start sharing stories
        </p>

        {/* Register Form */}
        <form
          className="mt-8 space-y-5"
          onSubmit={handleRegister}
        >
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="w-full px-5 py-4 rounded-xl bg-[#FFFDF8] border border-[#E8DCC8] text-[#2B1B17] outline-none focus:border-[#800000] transition"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full px-5 py-4 rounded-xl bg-[#FFFDF8] border border-[#E8DCC8] text-[#2B1B17] outline-none focus:border-[#800000] transition"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            className="w-full px-5 py-4 rounded-xl bg-[#FFFDF8] border border-[#E8DCC8] text-[#2B1B17] outline-none focus:border-[#800000] transition"
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            className="w-full px-5 py-4 rounded-xl bg-[#FFFDF8] border border-[#E8DCC8] text-[#2B1B17] outline-none focus:border-[#800000] transition"
          />

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#800000] to-[#A52A2A] text-white py-4 rounded-xl font-semibold hover:opacity-90 hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Join BlogSphere"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm mt-7 text-[#6B4F45]">
          Already have an account?

          <Link
            href="/login"
            className="ml-1 text-[#800000] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </main>
  );
}