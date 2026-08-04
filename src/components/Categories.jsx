"use client";

export default function Categories({
  selectedCategory,
  setSelectedCategory,
}) {

  const categories = [

    {
      name: "All",
      icon: "📚"
    },

    {
      name: "Artificial Intelligence",
      icon: "🤖"
    },

    {
      name: "Technology",
      icon: "💻"
    },

    {
      name: "Programming",
      icon: "⚡"
    },

    {
      name: "Design",
      icon: "🎨"
    },

    {
      name: "Career",
      icon: "🚀"
    },

    {
      name: "Innovation",
      icon: "💡"
    }

  ];

  return (

    <section
      className="
      bg-[#FFF3E6]
      py-24
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        text-center
        "
      >

        <span
          className="
          inline-block
          bg-[#800000]
          text-white
          px-5
          py-2
          rounded-full
          text-sm
          font-medium
          "
        >
          Explore Categories
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
          Explore Topics
        </h2>

        <p
          className="
          mt-4
          text-[#6B4F45]
          max-w-xl
          mx-auto
          "
        >
          Discover inspiring stories and ideas from different fields.
        </p>

        <div
          className="
          flex
          flex-wrap
          justify-center
          gap-5
          mt-12
          "
        >

          {categories.map((category) => (

            <button

              key={category.name}

              onClick={() => setSelectedCategory(category.name)}

              className={`
                group
                flex
                items-center
                gap-3
                px-6
                py-4
                rounded-2xl
                font-medium
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl

                ${
                  selectedCategory === category.name
                    ? "bg-[#800000] text-white border border-[#800000]"
                    : "bg-[#FFFDF8] border border-[#E8DCC8] text-[#6B4F45] hover:bg-[#800000] hover:text-white hover:border-[#800000]"
                }
              `}

            >

              <span
                className="
                text-xl
                group-hover:scale-110
                transition
                "
              >
                {category.icon}
              </span>

              {category.name}

            </button>

          ))}

        </div>

      </div>

    </section>

  );

}