import Link from "next/link";

export default function BlogCard({
  id,
  title,
  description,
  category,
  author,
  date,
}) {
  return (
    <article
      className="
        bg-[#FFFDF8]
        border
        border-[#E8DCC8]
        rounded-3xl
        p-6
        transition
        duration-300
        hover:shadow-lg
      "
    >
      {/* ================================ */}
      {/* Category */}
      {/* ================================ */}

      <div className="mb-4">
        <span
          className="
            inline-block
            bg-[#F8EBDD]
            text-[#800000]
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
          "
        >
          {category || "General"}
        </span>
      </div>

      {/* ================================ */}
      {/* Blog Title */}
      {/* ================================ */}

      <h3
        className="
          text-xl
          font-bold
          text-[#2B1B17]
          leading-snug
        "
      >
        {title}
      </h3>

      {/* ================================ */}
      {/* Blog Description */}
      {/* ================================ */}

      <p
        className="
          mt-3
          text-[#6B4F45]
          text-sm
          leading-relaxed
          line-clamp-3
        "
      >
        {description}
      </p>

      {/* ================================ */}
      {/* Bottom Section */}
      {/* ================================ */}

      <div
        className="
          flex
          items-center
          justify-between
          mt-6
        "
      >
        {/* ================================ */}
        {/* Author */}
        {/* ================================ */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          {/* Author Avatar */}

          <div
            className="
              w-10
              h-10
              rounded-full
              bg-[#800000]
              text-white
              flex
              items-center
              justify-center
              text-sm
              font-bold
            "
          >
            {author
              ? author.charAt(0).toUpperCase()
              : "B"}
          </div>

          {/* Author Information */}

          <div>
            <p
              className="
                text-sm
                font-semibold
                text-[#2B1B17]
              "
            >
              {author || "BlogSphere Writer"}
            </p>

            <p
              className="
                text-xs
                text-[#8A6A5A]
              "
            >
              {date
                ? new Date(date).toLocaleDateString()
                : "Today"}
            </p>
          </div>
        </div>

        {/* ================================ */}
        {/* Read More */}
        {/* ================================ */}

        <Link
          href={`/blog/${id}`}
          className="
            text-sm
            font-semibold
            text-[#800000]
            hover:translate-x-1
            transition
            inline-block
          "
        >
          Read →
        </Link>
      </div>
    </article>
  );
}