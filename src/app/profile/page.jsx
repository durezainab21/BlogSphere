"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/auth/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          router.push("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load profile"
          );
        }

        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Profile Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FFF8EE] flex items-center justify-center">
        <p className="text-[#6B4F45] text-lg">
          Loading profile...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#FFF8EE] flex items-center justify-center px-6">
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6">
          {error}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF8EE] flex items-center justify-center px-6">
      <div className="w-full max-w-lg bg-[#FFFDF8] border border-[#E8DCC8] rounded-3xl p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-[#2B1B17]">
          Your Profile
        </h1>

        <p className="mt-2 text-[#6B4F45]">
          Profile data fetched securely using JWT.
        </p>

        {user && (
          <div className="mt-8 space-y-5">

            <div>
              <p className="text-sm text-[#6B4F45]">
                Name
              </p>

              <p className="text-lg font-semibold text-[#2B1B17]">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#6B4F45]">
                Email
              </p>

              <p className="text-lg font-semibold text-[#2B1B17]">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#6B4F45]">
                User ID
              </p>

              <p className="text-sm font-mono text-[#800000] break-all">
                {user.id}
              </p>
            </div>

          </div>
        )}

        <button
          onClick={() => router.push("/dashboard")}
          className="
            w-full
            mt-8
            bg-gradient-to-r
            from-[#800000]
            to-[#A52A2A]
            text-white
            py-3
            rounded-xl
            font-semibold
            hover:opacity-90
            transition
          "
        >
          Back to Dashboard
        </button>

      </div>
    </main>
  );
}