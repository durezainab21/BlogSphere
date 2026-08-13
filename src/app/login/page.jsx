"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      if (!API_URL) {
        setError("API URL is not configured.");
        console.error("NEXT_PUBLIC_API_URL is missing.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Login Response:", data);

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      setMessage("Login successful 🎉");

      setTimeout(() => {
        router.push("/dashboard");
      }, 800);

    } catch (error) {
      console.error("Login Error:", error);

      setError(
        "Unable to connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="
        min-h-screen
        bg-[#FFF8EE]
        flex
        items-center
        justify-center
        px-6
      "
    >
      <div
        className="
          w-full
          max-w-lg
          bg-[#FFFDF8]
          border
          border-[#E8DCC8]
          rounded-3xl
          p-10
          shadow-2xl
        "
      >
        <h1
          className="
            text-center
            text-2xl
            font-bold
            text-[#2B1B17]
          "
        >
          Blog
          <span className="text-[#800000]">
            Sphere.
          </span>
        </h1>

        <div
          className="
            mx-auto
            mt-6
            w-14
            h-14
            rounded-full
            bg-[#F8EBDD]
            flex
            items-center
            justify-center
            text-2xl
          "
        >
          ✍️
        </div>

        <h2
          className="
            mt-5
            text-3xl
            font-bold
            text-center
            text-[#2B1B17]
          "
        >
          Welcome Back
        </h2>

        <p
          className="
            mt-3
            text-center
            text-[#6B4F45]
          "
        >
          Continue your writing journey
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            autoComplete="email"
            className="
              w-full
              px-5
              py-4
              rounded-xl
              bg-[#FFFDF8]
              border
              border-[#E8DCC8]
              text-[#2B1B17]
              outline-none
              focus:border-[#800000]
              transition
            "
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className="
              w-full
              px-5
              py-4
              rounded-xl
              bg-[#FFFDF8]
              border
              border-[#E8DCC8]
              text-[#2B1B17]
              outline-none
              focus:border-[#800000]
              transition
            "
          />

          {error && (
            <p className="text-red-600 text-center text-sm">
              {error}
            </p>
          )}

          {message && (
            <p className="text-green-600 text-center text-sm">
              {message}
            </p>
          )}

          <div className="text-right">
            <p
              className="
                text-sm
                text-[#800000]
                cursor-pointer
                hover:underline
              "
            >
              Forgot password?
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-gradient-to-r
              from-[#800000]
              to-[#A52A2A]
              text-white
              py-4
              rounded-xl
              font-semibold
              hover:opacity-90
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p
          className="
            text-center
            text-sm
            mt-7
            text-[#6B4F45]
          "
        >
          Don't have an account?

          <Link
            href="/register"
            className="
              ml-1
              text-[#800000]
              font-semibold
              cursor-pointer
              hover:underline
            "
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}