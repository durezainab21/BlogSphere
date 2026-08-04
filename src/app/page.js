"use client";

import { useState } from "react";
import Link from "next/link";

import FeaturedBlogs from "@/components/FeaturedBlogs";
import Categories from "@/components/Categories";
import WhySection from "@/components/WhySection";
import CTASection from "@/components/CTA";
import AnimatedSection from "@/components/AnimatedSection";

export default function Home() {

  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <main className="bg-[#FFF8EE] text-[#2B1B17]">

      {/* Hero Section */}

      <AnimatedSection>
        <section
          id="home"
          className="max-w-7xl mx-auto px-6 py-20 md:py-24"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left Content */}

            <div className="text-center md:text-left">

              <span
                className="
                inline-block
                bg-[#F8EBDD]
                text-[#800000]
                px-5
                py-2
                rounded-full
                text-sm
                font-medium
              "
              >
                ✍️ A Modern Space For Writers
              </span>

              <h1
                className="
                mt-6
                text-5xl
                md:text-6xl
                font-bold
                leading-tight
              "
              >
                Write. Share.
                <br />

                <span className="text-[#800000]">
                  Inspire.
                </span>
              </h1>

              <p
                className="
                mt-6
                text-[#6B4F45]
                text-lg
                md:text-xl
                leading-relaxed
              "
              >
                A modern blogging platform where creators share ideas,
                stories, and knowledge with the world.
              </p>

              {/* Buttons */}

              <div className="flex gap-4 mt-8 justify-center md:justify-start">

                <Link
                  href="/create-blog"
                  className="
                  inline-block
                  bg-gradient-to-r
                  from-[#800000]
                  to-[#A52A2A]
                  text-white
                  px-8
                  py-4
                  rounded-full
                  font-medium
                  hover:opacity-90
                  hover:shadow-xl
                  transition-all
                  duration-300
                "
                >
                  Start Writing
                </Link>

                <Link
                  href="#blogs"
                  className="
                  inline-block
                  border
                  border-[#800000]
                  text-[#800000]
                  px-8
                  py-4
                  rounded-full
                  font-medium
                  hover:bg-[#800000]
                  hover:text-white
                  transition-all
                  duration-300
                "
                >
                  Explore Blogs
                </Link>

              </div>

              {/* Stats */}

              <div className="flex gap-8 mt-10 justify-center md:justify-start">

                <div>
                  <h3 className="text-2xl font-bold text-[#800000]">
                    500+
                  </h3>
                  <p className="text-sm text-[#6B4F45]">
                    Stories
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#800000]">
                    100+
                  </h3>
                  <p className="text-sm text-[#6B4F45]">
                    Creators
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#800000]">
                    20+
                  </h3>
                  <p className="text-sm text-[#6B4F45]">
                    Topics
                  </p>
                </div>

              </div>

            </div>

            {/* Right Card */}

            <div className="flex justify-center">

              <div
                className="
                relative
                bg-[#FFFDF8]
                border
                border-[#E8DCC8]
                rounded-3xl
                p-6
                shadow-2xl
                hover:-translate-y-2
                transition
                duration-300
                max-w-md
              "
              >

                <span
                  className="
                  absolute
                  top-5
                  right-5
                  bg-[#800000]
                  text-white
                  px-4
                  py-2
                  rounded-full
                  text-xs
                "
                >
                  Featured Story
                </span>

                <img
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                  alt="Blog Writing"
                  className="rounded-2xl w-full"
                />

                <h3
                  className="
                  mt-5
                  text-xl
                  font-bold
                  text-[#2B1B17]
                "
                >
                  Latest Inspiration
                </h3>

                <p className="mt-2 text-[#6B4F45]">
                  Discover ideas from passionate writers.
                </p>

              </div>

            </div>

          </div>
        </section>
      </AnimatedSection>

 {/* Categories */}

<AnimatedSection>
  <section id="categories">
    <Categories
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
  </section>
</AnimatedSection>
    

      {/* Featured Blogs */}

<AnimatedSection>
  <section id="blogs">
    <FeaturedBlogs
      selectedCategory={selectedCategory}
    />
  </section>
</AnimatedSection>

      {/* Why Section */}

      <AnimatedSection>
        <section id="about">
          <WhySection />
        </section>
      </AnimatedSection>

      {/* CTA */}

      <AnimatedSection>
        <CTASection />
      </AnimatedSection>

    </main>
  );
}