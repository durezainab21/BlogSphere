
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Fetch Dashboard Data
  // ==========================================

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        // ==========================================
        // Check Login
        // ==========================================

        if (!token) {
          router.push("/login");
          return;
        }

        // ==========================================
        // Get Logged-in User
        // ==========================================

        if (!storedUser) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        let parsedUser;

        try {
          parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("User data error:", error);

          localStorage.removeItem("token");
          localStorage.removeItem("user");

          router.push("/login");
          return;
        }

        // ==========================================
        // IMPORTANT:
        // Get ONLY logged-in user's blogs
        // Backend route = /api/blogs/my
        // ==========================================

        const response = await fetch(
          "http://localhost:5000/api/blogs/my",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("Dashboard Response:", data);

        // ==========================================
        // Unauthorized
        // ==========================================

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          router.push("/login");
          return;
        }

        // ==========================================
        // Backend Error
        // ==========================================

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch your blogs."
          );
        }

        // ==========================================
        // Set ONLY Current User's Blogs
        // ==========================================

        if (data.success) {
          setBlogs(data.blogs || []);
        } else {
          setBlogs([]);
          setError(
            data.message || "Failed to fetch your blogs."
          );
        }
      } catch (error) {
        console.error("Dashboard Error:", error);

        setError(
          error.message ||
            "Unable to connect to the BlogSphere server."
        );

        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [router]);

  // ==========================================
  // Logout
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  // ==========================================
  // Loading Screen
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FFF8EE] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-5xl animate-pulse">✍️</div>

          <p className="mt-4 text-[#6B4F45] text-lg">
            Loading your dashboard...
          </p>
        </div>
      </main>
    );
  }

  // ==========================================
  // Statistics
  // ==========================================

  const publishedBlogs = blogs.filter(
    (blog) => blog.status === "published"
  );

  const draftBlogs = blogs.filter(
    (blog) => blog.status === "draft"
  );

  // ==========================================
  // Dashboard
  // ==========================================

  return (
    <main className="min-h-screen bg-[#FFF8EE] px-6 py-12">
      <div className="max-w-7xl mx-auto">

        {/* =====================================
            Header
        ====================================== */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>
            <h1 className="text-4xl font-bold text-[#2B1B17]">
              Welcome Back
              {user?.name ? `, ${user.name}` : ""} 👋
            </h1>

            <p className="text-[#6B4F45] mt-2">
              Manage your blogs, drafts and profile
            </p>
          </div>

          <div className="flex gap-3">

            {/* Create Blog */}

            <Link
              href="/create-blog"
              className="
                bg-gradient-to-r
                from-[#800000]
                to-[#A52A2A]
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                hover:opacity-90
                hover:shadow-xl
                transition
                text-center
              "
            >
              + Create Blog
            </Link>

            {/* Logout */}

            <button
              onClick={handleLogout}
              className="
                border
                border-[#800000]
                text-[#800000]
                px-6
                py-3
                rounded-xl
                font-semibold
                hover:bg-[#800000]
                hover:text-white
                transition
              "
            >
              Logout
            </button>

          </div>
        </div>

        {/* =====================================
            Profile
        ====================================== */}

        {user && (
          <div
            className="
              mt-8
              bg-[#FFFDF8]
              border
              border-[#E8DCC8]
              rounded-3xl
              p-6
              shadow-lg
            "
          >
            <h2 className="text-xl font-bold text-[#2B1B17]">
              Your Profile
            </h2>

            <div className="mt-4">

              <p className="text-[#6B4F45]">
                <span className="font-semibold">
                  Name:
                </span>{" "}
                {user.name || "Not available"}
              </p>

              <p className="text-[#6B4F45] mt-2">
                <span className="font-semibold">
                  Email:
                </span>{" "}
                {user.email || "Not available"}
              </p>

            </div>
          </div>
        )}

        {/* =====================================
            Error
        ====================================== */}

        {error && (
          <div
            className="
              mt-8
              bg-red-50
              border
              border-red-200
              text-red-700
              rounded-2xl
              p-5
            "
          >
            {error}
          </div>
        )}

        {/* =====================================
            Statistics
        ====================================== */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <Card
            title="My Total Blogs"
            value={blogs.length}
          />

          <Card
            title="My Published"
            value={publishedBlogs.length}
          />

          <Card
            title="My Drafts"
            value={draftBlogs.length}
          />

        </div>

        {/* =====================================
            Recent Blogs
        ====================================== */}

        <section className="mt-12">

          <div className="flex items-center justify-between">

            <h2
              className="
                text-2xl
                font-bold
                text-[#2B1B17]
              "
            >
              My Recent Blogs
            </h2>

            <span
              className="
                text-sm
                text-[#6B4F45]
              "
            >
              {blogs.length}{" "}
              {blogs.length === 1
                ? "blog"
                : "blogs"}
            </span>

          </div>

          {/* ===================================
              Blog List
          ==================================== */}

          <div className="mt-5 space-y-5">

            {blogs.length === 0 ? (

              <div
                className="
                  bg-[#FFFDF8]
                  border
                  border-[#E8DCC8]
                  rounded-3xl
                  p-8
                  shadow-lg
                  text-center
                "
              >
                <div className="text-5xl">
                  ✍️
                </div>

                <h3
                  className="
                    mt-4
                    text-xl
                    font-bold
                    text-[#2B1B17]
                  "
                >
                  No Blogs Yet
                </h3>

                <p
                  className="
                    mt-2
                    text-[#6B4F45]
                  "
                >
                  You haven't created any blogs yet.
                </p>

                <Link
                  href="/create-blog"
                  className="
                    inline-block
                    mt-5
                    bg-[#800000]
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                    hover:bg-[#650000]
                    transition
                  "
                >
                  Create Your First Blog
                </Link>
              </div>

            ) : (

              blogs.map((blog) => (

                <div
                  key={blog._id}
                  className="
                    bg-[#FFFDF8]
                    border
                    border-[#E8DCC8]
                    rounded-3xl
                    p-6
                    shadow-lg
                    hover:-translate-y-1
                    hover:shadow-xl
                    transition-all
                  "
                >

                  <div
                    className="
                      flex
                      flex-col
                      lg:flex-row
                      lg:items-center
                      lg:justify-between
                      gap-5
                    "
                  >

                    {/* Blog Information */}

                    <div className="min-w-0">

                      <h3
                        className="
                          font-semibold
                          text-lg
                          text-[#2B1B17]
                        "
                      >
                        {blog.title}
                      </h3>

                      <p
                        className="
                          text-sm
                          text-[#6B4F45]
                          mt-2
                        "
                      >
                        {blog.category || "General"}
                        {" • "}
                        {formatDate(blog.createdAt)}
                      </p>

                      {blog.content && (
                        <p
                          className="
                            mt-3
                            text-sm
                            text-[#6B4F45]
                            line-clamp-2
                          "
                        >
                          {blog.content}
                        </p>
                      )}

                    </div>

                    {/* Actions */}

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        flex-shrink-0
                      "
                    >

                      {/* Status */}

                      <span
                        className={`
                          px-4
                          py-2
                          rounded-full
                          text-sm
                          font-medium
                          ${
                            blog.status === "draft"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-[#F8EBDD] text-[#800000]"
                          }
                        `}
                      >
                        {blog.status || "published"}
                      </span>

                      {/* View */}

                      <Link
                        href={`/blog/${blog._id}`}
                        className="
                          bg-[#800000]
                          text-white
                          px-5
                          py-2
                          rounded-lg
                          font-semibold
                          hover:bg-[#650000]
                          transition
                        "
                      >
                        View
                      </Link>

                      {/* Edit */}

                      <Link
                        href={`/edit-blog/${blog._id}`}
                        className="
                          border
                          border-[#800000]
                          text-[#800000]
                          px-5
                          py-2
                          rounded-lg
                          font-semibold
                          hover:bg-[#800000]
                          hover:text-white
                          transition
                        "
                      >
                        Edit
                      </Link>

                    </div>

                  </div>

                </div>

              ))

            )}

          </div>
        </section>

      </div>
    </main>
  );
}

// ==========================================
// Dashboard Card
// ==========================================

function Card({ title, value }) {
  return (
    <div
      className="
        bg-[#FFFDF8]
        border
        border-[#E8DCC8]
        rounded-3xl
        p-6
        shadow-lg
        hover:-translate-y-2
        transition
      "
    >
      <h2 className="text-[#6B4F45]">
        {title}
      </h2>

      <p
        className="
          text-4xl
          font-bold
          mt-3
          text-[#800000]
        "
      >
        {value}
      </p>
    </div>
  );
}

// ==========================================
// Format Date
// ==========================================

function formatDate(date) {
  if (!date) {
    return "Today";
  }

  try {
    return new Date(date).toLocaleDateString();
  } catch {
    return "Today";
  }
}

