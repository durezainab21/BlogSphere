"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function BlogDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Get Single Blog From MongoDB
  // ==========================================

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/blogs/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch blog"
          );
        }

        setBlog(data.blog);
      } catch (error) {
        console.error("Error loading blog:", error);

        setBlog(null);

        setError(
          "Unable to load this blog. Please make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // ==========================================
  // Delete Blog
  // ==========================================

  const deleteBlog = async () => {
    const confirmDelete = window.confirm(
      "Delete this blog permanently?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/blogs/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message || "Failed to delete blog."
        );
        return;
      }

      alert("Blog deleted successfully 🗑️");

      router.push("/dashboard");
    } catch (error) {
      console.error("Delete error:", error);

      alert(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    }
  };

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
        <p className="text-[#6B4F45] text-lg">
          Loading blog...
        </p>
      </main>
    );
  }

  // ==========================================
  // Blog Not Found
  // ==========================================

  if (!blog) {
    return (
      <main
        className="
          min-h-screen
          bg-[#FFF8EE]
          px-6
          py-20
        "
      >
        <div className="max-w-4xl mx-auto text-center">

          <h1
            className="
              text-4xl
              font-bold
              text-[#2B1B17]
            "
          >
            Blog Not Found
          </h1>

          <p
            className="
              mt-4
              text-[#6B4F45]
            "
          >
            {error}
          </p>

          <Link
            href="/dashboard"
            className="
              inline-block
              mt-6
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
            ← Back to Dashboard
          </Link>

        </div>
      </main>
    );
  }

  // ==========================================
  // Reading Time
  // ==========================================

  const content = blog.content || "";

  const readingTime = Math.max(
    1,
    Math.ceil(
      content.split(/\s+/).filter(Boolean).length / 200
    )
  );

  // ==========================================
  // Format MongoDB Date
  // ==========================================

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString()
    : "Today";

  // ==========================================
  // Blog Details
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
      <article
        className="
          max-w-4xl
          mx-auto
          bg-[#FFFDF8]
          border
          border-[#E8DCC8]
          rounded-3xl
          shadow-xl
          overflow-hidden
        "
      >

        {/* ================================= */}
        {/* Cover */}
        {/* ================================= */}

        {blog.image && (
          <div
            className="
              h-72
              bg-[#F8EBDD]
              flex
              items-center
              justify-center
              text-6xl
            "
          >
            📷
          </div>
        )}

        <div className="p-8">

          {/* ================================= */}
          {/* Category */}
          {/* ================================= */}

          <span
            className="
              inline-block
              bg-[#F8EBDD]
              text-[#800000]
              px-4
              py-2
              rounded-full
              text-sm
              font-semibold
            "
          >
            {blog.category || "General"}
          </span>

          {/* ================================= */}
          {/* Title */}
          {/* ================================= */}

          <h1
            className="
              mt-6
              text-4xl
              md:text-5xl
              font-bold
              text-[#2B1B17]
              leading-tight
            "
          >
            {blog.title}
          </h1>

          {/* ================================= */}
          {/* Author */}
          {/* ================================= */}

          <div
            className="
              flex
              items-center
              gap-4
              mt-6
            "
          >

            <div
              className="
                w-12
                h-12
                rounded-full
                bg-[#F8EBDD]
                flex
                items-center
                justify-center
                text-xl
                font-bold
                text-[#800000]
              "
            >
              {blog.author
                ? blog.author.charAt(0).toUpperCase()
                : "B"}
            </div>

            <div>

              <h3
                className="
                  font-semibold
                  text-[#2B1B17]
                "
              >
                {blog.author || "BlogSphere Writer"}
              </h3>

              <p
                className="
                  text-sm
                  text-[#6B4F45]
                "
              >
                {formattedDate} • {readingTime} min read
              </p>

            </div>

          </div>

          {/* ================================= */}
          {/* Blog Content */}
          {/* ================================= */}

          <div
            className="
              mt-10
              text-lg
              leading-9
              text-[#2B1B17]
              whitespace-pre-line
            "
          >
            {blog.content}
          </div>

          {/* ================================= */}
          {/* Actions */}
          {/* ================================= */}

          <div
            className="
              flex
              flex-wrap
              gap-4
              mt-12
            "
          >

            {/* Back */}

            <Link
              href="/dashboard"
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
              ← Back to Dashboard
            </Link>

            {/* Edit */}

            <Link
              href={`/blog/edit/${blog._id}`}
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
                transition
              "
            >
              Edit ✍️
            </Link>

            {/* Delete */}

            <button
              onClick={deleteBlog}
              className="
                bg-[#2B1B17]
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                hover:bg-black
                transition
              "
            >
              Delete 🗑️
            </button>

          </div>

        </div>
      </article>
    </main>
  );
}