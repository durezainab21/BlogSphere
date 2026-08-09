"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditBlog() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("published");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // ==========================================
  // Fetch Existing Blog From MongoDB
  // ==========================================

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/blogs/${id}`
        );

        const data = await response.json();

        if (data.success && data.blog) {
          const blog = data.blog;

          setTitle(blog.title || "");
          setCategory(blog.category || "General");
          setContent(blog.content || "");
          setAuthor(blog.author || "Anonymous");
          setStatus(blog.status || "published");
        } else {
          alert("Blog not found.");
          router.push("/");
        }
      } catch (error) {
        console.log("Error fetching blog:", error);
        alert("Failed to load blog.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id, router]);

  // ==========================================
  // Update Blog
  // ==========================================

  const updateBlog = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and Content are required.");
      return;
    }

    try {
      setUpdating(true);

      const response = await fetch(
        `http://localhost:5000/api/blogs/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            category,
            content,
            author,
            status,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Blog Updated Successfully ✨");

        router.push(`/blog/${id}`);
      } else {
        alert(data.message || "Failed to update blog.");
      }
    } catch (error) {
      console.log("Update Blog Error:", error);
      alert("Something went wrong while updating the blog.");
    } finally {
      setUpdating(false);
    }
  };

  // ==========================================
  // Loading Screen
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
  // Edit Page
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

        {/* ================================ */}
        {/* Header */}
        {/* ================================ */}

        <h1
          className="
            text-4xl
            font-bold
            text-[#2B1B17]
          "
        >
          Edit Blog ✍️
        </h1>

        <p
          className="
            mt-2
            text-[#6B4F45]
          "
        >
          Update your story and keep your readers engaged
        </p>

        {/* ================================ */}
        {/* Form Card */}
        {/* ================================ */}

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

          {/* ================================ */}
          {/* Title */}
          {/* ================================ */}

          <label
            className="
              block
              mb-2
              font-semibold
              text-[#2B1B17]
            "
          >
            Blog Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog Title"
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

          {/* ================================ */}
          {/* Category */}
          {/* ================================ */}

          <label
            className="
              block
              mt-5
              mb-2
              font-semibold
              text-[#2B1B17]
            "
          >
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
              w-full
              px-5
              py-4
              rounded-xl
              bg-[#FFFDF8]
              border
              border-[#E8DCC8]
              text-[#6B4F45]
              outline-none
              focus:border-[#800000]
            "
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

          {/* ================================ */}
          {/* Content */}
          {/* ================================ */}

          <label
            className="
              block
              mt-5
              mb-2
              font-semibold
              text-[#2B1B17]
            "
          >
            Blog Content
          </label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="12"
            placeholder="Write your story..."
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
              resize-none
              focus:border-[#800000]
              transition
            "
          />

          {/* ================================ */}
          {/* Buttons */}
          {/* ================================ */}

          <div
            className="
              flex
              gap-4
              mt-6
            "
          >

            {/* Update Button */}

            <button
              onClick={updateBlog}
              disabled={updating}
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
              {updating
                ? "Updating..."
                : "Update Blog"}
            </button>

            {/* Cancel Button */}

            <button
              onClick={() => router.back()}
              disabled={updating}
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