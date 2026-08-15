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

    // ==============================
    // Validation
    // ==============================

    if (!email.trim() || !password) {
      setError("Please fill all fields.");
      return;
    }

    // ==============================
    // Backend URL
    // ==============================

    // Use the working backend directly
    const API_URL = "https://blog-sphere-tq4b.vercel.app";

    try {
      setLoading(true);

      // ==============================
      // Clear previous login session
      // ==============================

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // ==============================
      // Login API Request
      // ==============================

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password: password,
          }),
        }
      );

      // ==============================
      // Read Response
      // ==============================

      const data = await response.json();

      console.log("Login Status:", response.status);
      console.log("Login Response:", data);

      // ==============================
      // API Error
      // ==============================

      if (!response.ok) {
        setError(
          data.message ||
            "Login failed. Please check your email and password."
        );

        return;
      }

      // ==============================
      // Check Token
      // ==============================

      if (!data.token) {
        setError("Login successful, but authentication token was not received.");
        return;
      }

      // ==============================
      // Check User
      // ==============================

      if (!data.user) {
        console.error("Backend did not return user:", data);

        setError(
          "Login successful, but user information was not received from the server."
        );

        return;
      }

      // ==============================
      // Save NEW Token
      // ==============================

      localStorage.setItem("token", data.token);

      // ==============================
      // Save CURRENT User
      // ==============================

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Verify saved data
      console.log(
        "Logged-in User:",
        JSON.parse(localStorage.getItem("user"))
      );

      // ==============================
      // Success
      // ==============================

      setMessage("Login successful 🎉");

      // ==============================
      // Redirect
      // ==============================

      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 500);

    } catch (error) {
      console.error("Login Error:", error);

      setError(
        "Unable to connect to the server. Please check your backend deployment."
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

        {/* Logo */}

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

        {/* Icon */}

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

        {/* Heading */}

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

        {/* Login Form */}

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

          {/* Email */}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            autoComplete="email"
            disabled={loading}
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
              disabled:opacity-60
            "
          />

          {/* Password */}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            disabled={loading}
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
              disabled:opacity-60
            "
          />

          {/* Error */}

          {error && (
            <p className="text-red-600 text-center text-sm">
              {error}
            </p>
          )}

          {/* Success */}

          {message && (
            <p className="text-green-600 text-center text-sm">
              {message}
            </p>
          )}

          {/* Forgot Password */}

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

          {/* Login Button */}

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

        {/* Register Link */}

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