"use client";

import Link from "next/link";

export default function CTASection() {

  return (

    <section
      className="
      py-24
      px-6
      "
    >

      <div
        className="
        max-w-6xl
        mx-auto
        bg-[#800000]
        rounded-3xl
        overflow-hidden
        relative
        shadow-2xl
        "
      >

        {/* Decorative Circle */}

        <div
          className="
          absolute
          -top-20
          -right-20
          w-72
          h-72
          bg-[#A52A2A]
          rounded-full
          opacity-30
          "
        />

        <div
          className="
          relative
          z-10
          text-center
          px-8
          py-20
          "
        >

          <span
            className="
            inline-block
            bg-[#F8EBDD]/20
            text-[#F8EBDD]
            px-5
            py-2
            rounded-full
            text-sm
            "
          >
            ✍️ Start Creating Today
          </span>

          <h2
            className="
            mt-6
            text-4xl
            md:text-5xl
            font-bold
            text-white
            "
          >
            Ready to Share Your Story?
          </h2>

          <p
            className="
            mt-5
            text-[#F8EBDD]
            text-lg
            max-w-2xl
            mx-auto
            leading-relaxed
            "
          >
            Join BlogSphere and turn your ideas into meaningful
            stories that inspire people around the world.
          </p>

          <Link
            href="/create-blog"
            className="
            inline-flex
            items-center
            justify-center
            mt-8
            bg-[#FFF8EE]
            text-[#800000]
            px-10
            py-4
            rounded-full
            font-semibold
            hover:bg-white
            hover:-translate-y-1
            hover:shadow-xl
            transition-all
            duration-300
            "
          >
            Start Writing →
          </Link>

        </div>

      </div>

    </section>

  );

}