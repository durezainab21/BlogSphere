
"use client";

import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";

export default function FeaturedBlogs({ selectedCategory }) {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  // ================================
  // Fetch Blogs From MongoDB
  // ================================

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs || []);
      })
      .catch((error) => {
        console.log("Error fetching blogs:", error);
      });
  }, []);

  // ================================
  // Filter Blogs
  // ================================

  const filteredBlogs = blogs.filter((blog) => {
    const matchSearch = blog.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "All" ||
      blog.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* ================================ */}
        {/* Heading */}
        {/* ================================ */}

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

        {/* ================================ */}
        {/* Search */}
        {/* ================================ */}

        <div
          className="
            mt-10
            flex
            justify-center
          "
        >
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              md:w-1/2
              px-5
              py-4
              rounded-xl
              bg-[#FFFDF8]
              border
              border-[#E8DCC8]
              outline-none
              focus:border-[#800000]
              transition
            "
          />
        </div>

        {/* ================================ */}
        {/* Selected Category */}
        {/* ================================ */}

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
              {selectedCategory}
            </span>
          </span>
        </div>

        {/* ================================ */}
        {/* Blogs */}
        {/* ================================ */}

        <div
          className="
            grid
            md:grid-cols-3
            gap-8
            mt-12
          "
        >
          {filteredBlogs.length === 0 ? (
            <div
              className="
                md:col-span-3
                bg-[#FFFDF8]
                border
                border-[#E8DCC8]
                rounded-3xl
                p-8
                text-center
              "
            >
              <p className="text-[#6B4F45]">
                No blogs found in this category.
              </p>
            </div>
          ) : (
            filteredBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                id={blog._id}
                title={blog.title}
                description={blog.content}
                author={blog.author}
                date={blog.createdAt}
              />
            ))
          )}
        </div>

      </div>
    </section>
  );
}

