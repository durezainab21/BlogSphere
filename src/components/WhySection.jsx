"use client";

import Link from "next/link";

export default function WhySection() {

  const features = [

    {
      title: "Easy Writing",
      text: "Create and publish beautiful blogs with a simple and distraction-free writing experience.",
      icon: "✍️",
      link: "/create-blog"
    },

    {
      title: "Share Ideas",
      text: "Connect with readers and turn your thoughts into meaningful conversations.",
      icon: "🚀",
      link: "#blogs"
    },

    {
      title: "Discover Content",
      text: "Explore valuable stories, insights, and knowledge from talented creators.",
      icon: "🔍",
      link: "#categories"
    }

  ];

  return (

    <section
      className="
      max-w-7xl
      mx-auto
      px-6
      py-24
      "
    >

      <div className="text-center">

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
          Why Choose Us
        </span>

        <h2
          className="
          mt-5
          text-4xl
          md:text-5xl
          font-bold
          text-[#2B1B17]
          "
        >
          Why BlogSphere?
        </h2>

        <p
          className="
          mt-4
          max-w-xl
          mx-auto
          text-[#6B4F45]
          "
        >
          Everything creators need to write, share, and discover inspiring stories.
        </p>

      </div>

      <div
        className="
        grid
        md:grid-cols-3
        gap-8
        mt-14
        "
      >

        {features.map((item) => (

          <Link
            key={item.title}
            href={item.link}
            className="
            group
            bg-[#FFFDF8]
            border
            border-[#E8DCC8]
            rounded-3xl
            p-8
            text-center
            shadow-sm
            hover:shadow-2xl
            hover:-translate-y-2
            transition-all
            duration-300
            cursor-pointer
            block
            "
          >

            <div
              className="
              w-16
              h-16
              mx-auto
              flex
              items-center
              justify-center
              rounded-full
              bg-[#F8EBDD]
              text-3xl
              group-hover:scale-110
              transition
              "
            >
              {item.icon}
            </div>

            <h3
              className="
              text-xl
              font-bold
              mt-6
              text-[#800000]
              "
            >
              {item.title}
            </h3>

            <p
              className="
              mt-3
              text-[#6B4F45]
              leading-relaxed
              text-sm
              "
            >
              {item.text}
            </p>

            <span
              className="
              inline-block
              mt-6
              text-sm
              font-semibold
              text-[#800000]
              group-hover:underline
              "
            >
              Learn More →
            </span>

          </Link>

        ))}

      </div>

    </section>

  );

}