"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBlog() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  // ==========================================
  // Save Blog
  // ==========================================

  const saveBlog = async (status) => {
    setMessage("");
    setError("");

    // ========================================
    // Validation
    // ========================================

    if (!title.trim()) {
      setError("Blog title is required.");
      return;
    }

    if (!content.trim()) {
      setError("Blog content is required.");
      return;
    }

    // ========================================
    // Get JWT Token
    // ========================================

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first to create a blog.");
      return;
    }

    try {
      setLoading(true);

      // ========================================
      // Send Blog To Live Backend
      // ========================================

      const response = await fetch(
        "https://blog-sphere-ir82.vercel.app/api/blogs",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title: title.trim(),
            category: category || "General",
            content: content.trim(),
            status: status,
          }),
        }
      );

      // ========================================
      // Get Backend Response
      // ========================================

      const data = await response.json();

      // ========================================
      // Handle Unauthorized
      // ========================================

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setError("Your session has expired. Please login again.");

        setTimeout(() => {
          router.push("/login");
        }, 1500);

        return;
      }

      // ========================================
      // Backend Error
      // ========================================

      if (!response.ok) {
        setError(data.message || "Failed to create blog.");
        return;
      }

      // ========================================
      // Success Message
      // ========================================

      if (status === "published") {
        setMessage("Blog Published Successfully 🚀");
      } else {
        setMessage("Draft Saved Successfully 📝");
      }

      // ========================================
      // Clear Form
      // ========================================

      setTitle("");
      setCategory("");
      setContent("");

      // ========================================
      // Go To Dashboard
      // ========================================

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Create Blog Error:", error);

      setError(
        "Server error. Please make sure the backend is available."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
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
      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div>
          <h1
            className="
              text-4xl
              font-bold
              text-[#2B1B17]
            "
          >
            Create New Blog
          </h1>

          <p
            className="
              mt-2
              text-[#6B4F45]
            "
          >
            Share your ideas and inspire the
            BlogSphere community.
          </p>
        </div>

        {/* Form Card */}

        <div
          className="
            mt-8
            bg-[#FFFDF8]
            border
            border-[#E8DCC8]
            rounded-3xl
            p-8
            shadow-xl
          "
        >

          {/* Blog Title */}

          <label
            className="
              block
              text-sm
              font-semibold
              text-[#2B1B17]
              mb-2
            "
          >
            Blog Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Blog Title"
            disabled={loading}
            className="
              w-full
              px-5
              py-4
              rounded-xl
              border
              border-[#E8DCC8]
              bg-white
              outline-none
              focus:border-[#800000]
              disabled:opacity-60
            "
          />

          {/* Category */}

          <label
            className="
              block
              text-sm
              font-semibold
              text-[#2B1B17]
              mt-5
              mb-2
            "
          >
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
            className="
              w-full
              px-5
              py-4
              rounded-xl
              border
              border-[#E8DCC8]
              bg-white
              outline-none
              focus:border-[#800000]
              disabled:opacity-60
            "
          >
            <option value="">
              Select Category
            </option>

            <option value="Artificial Intelligence">
              Artificial Intelligence
            </option>

            <option value="Technology">
              Technology
            </option>

            <option value="Programming">
              Programming
            </option>

            <option value="Design">
              Design
            </option>

            <option value="Career">
              Career
            </option>
          </select>

          {/* Blog Content */}

          <label
            className="
              block
              text-sm
              font-semibold
              text-[#2B1B17]
              mt-5
              mb-2
            "
          >
            Blog Content
          </label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your story here..."
            rows={12}
            disabled={loading}
            className="
              w-full
              px-5
              py-4
              rounded-xl
              border
              border-[#E8DCC8]
              bg-white
              outline-none
              resize-none
              focus:border-[#800000]
              disabled:opacity-60
            "
          />

          {/* Error */}

          {error && (
            <div
              className="
                mt-5
                bg-red-50
                border
                border-red-200
                text-red-600
                px-5
                py-3
                rounded-xl
              "
            >
              {error}
            </div>
          )}

          {/* Success */}

          {message && (
            <div
              className="
                mt-5
                bg-green-50
                border
                border-green-200
                text-green-600
                px-5
                py-3
                rounded-xl
              "
            >
              {message}
            </div>
          )}

          {/* Buttons */}

          <div
            className="
              flex
              flex-wrap
              gap-4
              mt-8
            "
          >

            {/* Publish */}

            <button
              disabled={loading}
              onClick={() => saveBlog("published")}
              className="
                bg-gradient-to-r
                from-[#800000]
                to-[#A52A2A]
                text-white
                px-10
                py-4
                rounded-xl
                font-semibold
                hover:opacity-90
                hover:shadow-xl
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Saving..."
                : "Publish Blog 🚀"}
            </button>

            {/* Draft */}

            <button
              disabled={loading}
              onClick={() => saveBlog("draft")}
              className="
                border
                border-[#800000]
                text-[#800000]
                px-10
                py-4
                rounded-xl
                font-semibold
                hover:bg-[#800000]
                hover:text-white
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Saving..."
                : "Save Draft 📝"}
            </button>

            {/* Cancel */}

            <button
              disabled={loading}
              onClick={() => router.push("/dashboard")}
              className="
                border
                border-[#E8DCC8]
                text-[#6B4F45]
                px-8
                py-4
                rounded-xl
                font-semibold
                hover:bg-[#F8EBDD]
                transition
                disabled:opacity-50
              "
            >
              Cancel
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}