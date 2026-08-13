
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditBlog() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("published");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH BLOG
  // ==========================================

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch(
          `https://blog-sphere-tq4b.vercel.app/api/blogs/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log("GET BLOG RESPONSE:", data);

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load blog."
          );
        }

        const blog = data.blog || data;

        if (!blog) {
          throw new Error("Blog not found.");
        }

        setTitle(blog.title || "");
        setCategory(blog.category || "General");
        setContent(blog.content || "");
        setStatus(blog.status || "published");
      } catch (err) {
        console.error("FETCH BLOG ERROR:", err);

        setError(
          err.message || "Failed to load blog."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, router]);

  // ==========================================
  // UPDATE BLOG
  // ==========================================

  const updateBlog = async (e) => {
    e.preventDefault();

    setError("");

    if (!title.trim()) {
      setError("Blog title is required.");
      return;
    }

    if (!content.trim()) {
      setError("Blog content is required.");
      return;
    }

    if (!id) {
      setError("Blog ID is missing.");
      return;
    }

    try {
      setUpdating(true);

      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(
        `https://blog-sphere-tq4b.vercel.app/api/blogs/${id}`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title: title.trim(),
            category: category || "General",
            content: content.trim(),
            status: status || "published",
          }),
        }
      );

      // Safely read response
      const text = await response.text();

      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {
          message: text || "Server returned an invalid response.",
        };
      }

      console.log("UPDATE STATUS:", response.status);
      console.log("UPDATE RESPONSE:", data);

      // ========================================
      // UNAUTHORIZED
      // ========================================

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.push("/login");
        return;
      }

      // ========================================
      // FORBIDDEN
      // ========================================

      if (response.status === 403) {
        setError(
          data.message ||
            "You can only update your own blog."
        );
        return;
      }

      // ========================================
      // NOT FOUND
      // ========================================

      if (response.status === 404) {
        setError(
          data.message ||
            "Blog was not found."
        );
        return;
      }

      // ========================================
      // SERVER ERROR
      // ========================================

      if (response.status >= 500) {
        setError(
          data.message ||
            "Backend server error. Check your backend terminal."
        );
        return;
      }

      // ========================================
      // OTHER ERROR
      // ========================================

      if (!response.ok) {
        setError(
          data.message ||
            "Failed to update blog."
        );
        return;
      }

      // ========================================
      // SUCCESS
      // ========================================

      alert("Blog Updated Successfully ✨");

      router.push(`/blog/${id}`);
      router.refresh();
    } catch (err) {
      console.error("UPDATE BLOG ERROR:", err);

      setError(
        "Unable to connect to the backend. Make sure your backend is running on port 5000."
      );
    } finally {
      setUpdating(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FFF8EE] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-5xl">✍️</div>

          <p className="mt-4 text-[#6B4F45] text-lg">
            Loading blog...
          </p>
        </div>
      </main>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <main className="min-h-screen bg-[#FFF8EE] px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold text-[#2B1B17]">
            Edit Blog ✍️
          </h1>

          <p className="mt-2 text-[#6B4F45]">
            Update your story and keep your readers engaged.
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={updateBlog}
          className="mt-8 bg-[#FFFDF8] border border-[#E8DCC8] rounded-3xl p-8 shadow-xl"
        >

          {/* Title */}

          <label className="block mb-2 font-semibold text-[#2B1B17]">
            Blog Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={updating}
            placeholder="Enter Blog Title"
            className="w-full px-5 py-4 rounded-xl bg-white border border-[#E8DCC8] text-[#2B1B17] outline-none focus:border-[#800000] transition disabled:opacity-60"
          />

          {/* Category */}

          <label className="block mt-5 mb-2 font-semibold text-[#2B1B17]">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={updating}
            className="w-full px-5 py-4 rounded-xl bg-white border border-[#E8DCC8] text-[#6B4F45] outline-none focus:border-[#800000] disabled:opacity-60"
          >
            <option value="General">
              General
            </option>

            <option value="Artificial Intelligence">
              Artificial Intelligence
            </option>

            <option value="Technology">
              Technology
            </option>

            <option value="Web Development">
              Web Development
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

          {/* Status */}

          <label className="block mt-5 mb-2 font-semibold text-[#2B1B17]">
            Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={updating}
            className="w-full px-5 py-4 rounded-xl bg-white border border-[#E8DCC8] text-[#6B4F45] outline-none focus:border-[#800000] disabled:opacity-60"
          >
            <option value="published">
              Published
            </option>

            <option value="draft">
              Draft
            </option>
          </select>

          {/* Content */}

          <label className="block mt-5 mb-2 font-semibold text-[#2B1B17]">
            Blog Content
          </label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={updating}
            rows={12}
            placeholder="Write your story..."
            className="w-full px-5 py-4 rounded-xl bg-white border border-[#E8DCC8] text-[#2B1B17] outline-none resize-none focus:border-[#800000] transition disabled:opacity-60"
          />

          {/* Error */}

          {error && (
            <div className="mt-5 bg-red-50 border border-red-200 text-red-700 px-5 py-3 rounded-xl">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Buttons */}

          <div className="flex flex-wrap gap-4 mt-6">

            <button
              type="submit"
              disabled={updating}
              className="bg-gradient-to-r from-[#800000] to-[#A52A2A] text-white px-10 py-4 rounded-xl font-semibold hover:opacity-90 hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating
                ? "Updating..."
                : "Update Blog ✨"}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              disabled={updating}
              className="border border-[#800000] text-[#800000] px-10 py-4 rounded-xl font-semibold hover:bg-[#800000] hover:text-white transition disabled:opacity-50"
            >
              Cancel
            </button>

          </div>
        </form>
      </div>
    </main>
  );
}

