"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Get Blogs From Backend
  // ==========================================

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/blogs"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();

        if (data.success) {
          setBlogs(data.blogs || []);
        } else {
          setBlogs([]);
          setError(data.message || "Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Dashboard Error:", error);

        setError(
          "Unable to connect to the BlogSphere server."
        );

        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <main
        className="
          min-h-screen
          bg-[#FFF8EE]
          flex
          items-center
          justify-center
        "
      >
        <div className="text-center">
          <div className="text-5xl">✍️</div>

          <p
            className="
              mt-4
              text-[#6B4F45]
              text-lg
            "
          >
            Loading dashboard...
          </p>
        </div>
      </main>
    );
  }

  // ==========================================
  // Published Blogs
  // ==========================================

  const publishedBlogs = blogs.filter(
    (blog) => blog.status === "published"
  );

  // ==========================================
  // Draft Blogs
  // ==========================================

  const draftBlogs = blogs.filter(
    (blog) => blog.status === "draft"
  );

  // ==========================================
  // Dashboard
  // ==========================================

  return (
    <main
      className="
        min-h-screen
        bg-[#FFF8EE]
        px-6
        py-12
      "
    >
      <div className="max-w-7xl mx-auto">

        {/* ================================= */}
        {/* Header */}
        {/* ================================= */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-5
          "
        >
          <div>
            <h1
              className="
                text-4xl
                font-bold
                text-[#2B1B17]
              "
            >
              Welcome Back 👋
            </h1>

            <p
              className="
                text-[#6B4F45]
                mt-2
              "
            >
              Manage your blogs, drafts and profile
            </p>
          </div>

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
        </div>

        {/* ================================= */}
        {/* Server Error */}
        {/* ================================= */}

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

        {/* ================================= */}
        {/* Stats */}
        {/* ================================= */}

        <div
          className="
            grid
            md:grid-cols-3
            gap-6
            mt-10
          "
        >
          <Card
            title="Total Blogs"
            value={blogs.length}
          />

          <Card
            title="Published"
            value={publishedBlogs.length}
          />

          <Card
            title="Drafts"
            value={draftBlogs.length}
          />
        </div>

        {/* ================================= */}
        {/* Recent Blogs */}
        {/* ================================= */}

        <section className="mt-12">

          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                text-[#2B1B17]
              "
            >
              Recent Blogs
            </h2>

            <span
              className="
                text-sm
                text-[#6B4F45]
              "
            >
              {blogs.length}{" "}
              {blogs.length === 1 ? "blog" : "blogs"}
            </span>
          </div>

          {/* ================================= */}
          {/* Blog List */}
          {/* ================================= */}

          <div className="mt-5 space-y-5">

            {blogs.length === 0 ? (

              /* ============================= */
              /* No Blogs */
              /* ============================= */

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
                  Start writing your first story.
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

              /* ============================= */
              /* Blogs */
              /* ============================= */

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
                      md:flex-row
                      md:items-center
                      md:justify-between
                      gap-5
                    "
                  >

                    {/* ======================= */}
                    {/* Blog Information */}
                    {/* ======================= */}

                    <div className="min-w-0">

                      {/* Blog Title */}

                      <Link
                        href={`/blog/${blog._id}`}
                        className="
                          block
                          font-semibold
                          text-lg
                          text-[#2B1B17]
                          hover:text-[#800000]
                          transition
                        "
                      >
                        {blog.title}
                      </Link>

                      {/* Category + Date */}

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

                      {/* Content Preview */}

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

                    {/* ======================= */}
                    {/* Actions */}
                    {/* ======================= */}

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
                          text-[#800000]
                          font-semibold
                          hover:underline
                        "
                      >
                        View
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
      <h2
        className="
          text-[#6B4F45]
        "
      >
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