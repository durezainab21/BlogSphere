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
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        router.push("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to the server.");
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF8EE] flex items-center justify-center px-6">
      <div className="w-full max-w-lg bg-[#FFFDF8] border border-[#E8DCC8] rounded-3xl p-10 shadow-2xl">
        <h1 className="text-center text-2xl font-bold text-[#2B1B17]">
          Blog
          <span className="text-[#800000]">Sphere.</span>
        </h1>

        <div className="mx-auto mt-6 w-14 h-14 rounded-full bg-[#F8EBDD] flex items-center justify-center text-2xl">
          ✍️
        </div>

        <h2 className="mt-5 text-3xl font-bold text-center text-[#2B1B17]">
          Create Account
        </h2>

        <p className="text-[#6B4F45] text-center mt-3">
          Join BlogSphere and start sharing stories
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-[#FFFDF8] border border-[#E8DCC8] text-[#2B1B17] outline-none focus:border-[#800000] transition"
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-[#FFFDF8] border border-[#E8DCC8] text-[#2B1B17] outline-none focus:border-[#800000] transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-[#FFFDF8] border border-[#E8DCC8] text-[#2B1B17] outline-none focus:border-[#800000] transition"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-[#FFFDF8] border border-[#E8DCC8] text-[#2B1B17] outline-none focus:border-[#800000] transition"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#800000] to-[#A52A2A] text-white py-4 rounded-xl font-semibold hover:opacity-90 hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Join BlogSphere
          </button>
        </form>

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