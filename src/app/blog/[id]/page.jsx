
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function BlogDetails() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  // ==========================================
  // FETCH SINGLE BLOG
  // ==========================================

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/blogs/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log("BLOG RESPONSE:", data);

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch blog."
          );
        }

        const fetchedBlog = data.blog || data;

        if (!fetchedBlog) {
          throw new Error("Blog not found.");
        }

        setBlog(fetchedBlog);
      } catch (err) {
        console.error("FETCH BLOG ERROR:", err);

        setBlog(null);

        setError(
          err.message || "Unable to load this blog."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // ==========================================
  // DELETE BLOG
  // ==========================================

  const deleteBlog = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog permanently?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleting(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert(
          "You must be logged in to delete a blog."
        );

        router.push("/login");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/blogs/${id}`,
        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const text = await response.text();

      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {
          message: text || "Invalid server response.",
        };
      }

      console.log("DELETE STATUS:", response.status);
      console.log("DELETE RESPONSE:", data);

      // Unauthorized
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.push("/login");
        return;
      }

      // Forbidden
      if (response.status === 403) {
        alert(
          data.message ||
            "You can only delete your own blogs."
        );

        return;
      }

      // Not found
      if (response.status === 404) {
        alert(
          data.message ||
            "Blog was not found."
        );

        return;
      }

      // Other error
      if (!response.ok) {
        alert(
          data.message ||
            "Failed to delete blog."
        );

        return;
      }

      // Success
      alert("Blog deleted successfully 🗑️");

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error("DELETE BLOG ERROR:", err);

      alert(
        "Unable to connect to the backend. Make sure your backend is running."
      );
    } finally {
      setDeleting(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FFF8EE] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-5xl">
            📖
          </div>

          <p className="mt-4 text-[#6B4F45] text-lg">
            Loading blog...
          </p>
        </div>
      </main>
    );
  }

  // ==========================================
  // BLOG NOT FOUND
  // ==========================================

  if (!blog) {
    return (
      <main className="min-h-screen bg-[#FFF8EE] px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">

          <div className="text-6xl">
            📭
          </div>

          <h1 className="mt-5 text-4xl font-bold text-[#2B1B17]">
            Blog Not Found
          </h1>

          <p className="mt-4 text-[#6B4F45]">
            {error ||
              "This blog could not be found."}
          </p>

          <Link
            href="/dashboard"
            className="inline-block mt-6 bg-[#800000] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#650000] transition"
          >
            ← Back to Dashboard
          </Link>

        </div>
      </main>
    );
  }

  // ==========================================
  // READING TIME
  // ==========================================

  const content = blog.content || "";

  const wordCount = content
    .split(/\s+/)
    .filter(Boolean)
    .length;

  const readingTime = Math.max(
    1,
    Math.ceil(wordCount / 200)
  );

  // ==========================================
  // DATE
  // ==========================================

  const formattedDate = blog.createdAt
    ? new Date(
        blog.createdAt
      ).toLocaleDateString()
    : "Today";

  // ==========================================
  // BLOG DETAILS
  // ==========================================

  return (
    <main className="min-h-screen bg-[#FFF8EE] px-6 py-12">

      <article className="max-w-4xl mx-auto bg-[#FFFDF8] border border-[#E8DCC8] rounded-3xl shadow-xl overflow-hidden">

        <div className="p-8 md:p-10">

          {/* Category */}

          <span className="inline-block bg-[#F8EBDD] text-[#800000] px-4 py-2 rounded-full text-sm font-semibold">
            {blog.category || "General"}
          </span>

          {/* Title */}

          <h1 className="mt-6 text-4xl md:text-5xl font-bold text-[#2B1B17] leading-tight">
            {blog.title}
          </h1>

          {/* Author */}

          <div className="flex items-center gap-4 mt-6">

            <div className="w-12 h-12 rounded-full bg-[#F8EBDD] flex items-center justify-center text-xl font-bold text-[#800000]">
              {blog.author
                ? String(blog.author)
                    .charAt(0)
                    .toUpperCase()
                : "B"}
            </div>

            <div>

              <h3 className="font-semibold text-[#2B1B17]">
                {blog.author ||
                  "BlogSphere Writer"}
              </h3>

              <p className="text-sm text-[#6B4F45]">
                {formattedDate}
                {" • "}
                {readingTime} min read
              </p>

            </div>

          </div>

          {/* Status */}

          <div className="mt-6">

            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                blog.status === "draft"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {blog.status || "published"}
            </span>

          </div>

          {/* Divider */}

          <div className="border-t border-[#E8DCC8] mt-8 pt-8" />

          {/* Content */}

          <div className="text-lg leading-9 text-[#2B1B17] whitespace-pre-line">
            {blog.content}
          </div>

          {/* Actions */}

          <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-[#E8DCC8]">

            {/* Dashboard */}

            <Link
              href="/dashboard"
              className="border border-[#800000] text-[#800000] px-6 py-3 rounded-xl font-semibold hover:bg-[#800000] hover:text-white transition"
            >
              ← Dashboard
            </Link>

            {/* EDIT */}

            <Link
              href={`/blog/edit/${blog._id}`}
              className="bg-gradient-to-r from-[#800000] to-[#A52A2A] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Edit ✍️
            </Link>

            {/* DELETE */}

            <button
              type="button"
              onClick={deleteBlog}
              disabled={deleting}
              className="bg-[#2B1B17] text-white px-6 py-3 rounded-xl font-semibold hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleting
                ? "Deleting..."
                : "Delete 🗑️"}
            </button>

          </div>

        </div>

      </article>

    </main>
  );
}

