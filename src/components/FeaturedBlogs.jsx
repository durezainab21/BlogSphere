"use client";

import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";

export default function FeaturedBlogs({ selectedCategory }) {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ==========================================
  // Fetch Blogs From MongoDB
  // ==========================================

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "http://localhost:5000/api/blogs",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Server returned ${response.status}`
          );
        }

        const data = await response.json();

        console.log("Blogs API Response:", data);

        // ======================================
        // Get Blogs From Backend Response
        // ======================================

        let fetchedBlogs = [];

        if (Array.isArray(data)) {
          fetchedBlogs = data;
        } else if (
          data.blogs &&
          Array.isArray(data.blogs)
        ) {
          fetchedBlogs = data.blogs;
        } else if (
          data.success &&
          Array.isArray(data.data)
        ) {
          fetchedBlogs = data.data;
        }

        // ======================================
        // Show Published Blogs Only
        // ======================================

        const publishedBlogs = fetchedBlogs.filter(
          (blog) =>
            !blog.status ||
            blog.status === "published"
        );

        setBlogs(publishedBlogs);
      } catch (error) {
        console.error(
          "Error fetching blogs:",
          error
        );

        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // ==========================================
  // Search + Category Filter
  // ==========================================

  const filteredBlogs = blogs.filter((blog) => {
    const searchText = search.toLowerCase();

    const matchSearch =
      blog.title
        ?.toLowerCase()
        .includes(searchText) ||
      blog.content
        ?.toLowerCase()
        .includes(searchText) ||
      blog.author
        ?.toLowerCase()
        .includes(searchText);

    const matchCategory =
      selectedCategory === "All" ||
      !selectedCategory ||
      blog.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  // ==========================================
  // UI
  // ==========================================

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* =====================================
            Heading
        ====================================== */}

        <div className="text-center">
          <h2
            className="
              text-4xl
              font-bold
              text-[#2B1B17]
            "
          >
            Featured Stories
          </h2>

          <p
            className="
              mt-3
              text-[#6B4F45]
            "
          >
            Discover stories from BlogSphere creators
          </p>
        </div>

        {/* =====================================
            Search
        ====================================== */}

        <div className="mt-10 flex justify-center">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              md:w-1/2
              px-5
              py-4
              rounded-xl
              bg-[#FFFDF8]
              border
              border-[#E8DCC8]
              text-[#2B1B17]
              placeholder:text-[#9A8175]
              outline-none
              focus:border-[#800000]
              focus:ring-2
              focus:ring-[#800000]/10
              transition
            "
          />
        </div>

        {/* =====================================
            Selected Category
        ====================================== */}

        <div className="mt-6 text-center">
          <span
            className="
              inline-block
              bg-[#F8EBDD]
              text-[#800000]
              px-4
              py-2
              rounded-full
              text-sm
              font-medium
            "
          >
            Category:

            <span className="ml-2 font-bold">
              {selectedCategory || "All"}
            </span>
          </span>
        </div>

        {/* =====================================
            Loading
        ====================================== */}

        {loading ? (
          <div className="mt-12 text-center">
            <div className="text-4xl">✍️</div>

            <p className="mt-3 text-[#6B4F45]">
              Loading blogs...
            </p>
          </div>
        ) : (
          <>
            {/* =================================
                Blog Grid
            ================================== */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                gap-8
                mt-12
              "
            >
              {filteredBlogs.length === 0 ? (
                <div
                  className="
                    col-span-full
                    bg-[#FFFDF8]
                    border
                    border-[#E8DCC8]
                    rounded-3xl
                    p-10
                    text-center
                    shadow-lg
                  "
                >
                  <div className="text-5xl">
                    📝
                  </div>

                  <h3
                    className="
                      mt-4
                      text-xl
                      font-bold
                      text-[#2B1B17]
                    "
                  >
                    No Blogs Found
                  </h3>

                  <p
                    className="
                      mt-2
                      text-[#6B4F45]
                    "
                  >
                    Try another search or category.
                  </p>
                </div>
              ) : (
                filteredBlogs.map((blog) => (
                  <BlogCard
                    key={blog._id}
                    id={blog._id}
                    title={blog.title}
                    description={blog.content}
                    category={
                      blog.category || "General"
                    }
                    author={
                      blog.author || "Anonymous"
                    }
                    date={blog.createdAt}
                  />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}