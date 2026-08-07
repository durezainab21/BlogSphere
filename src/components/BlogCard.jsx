import Link from "next/link";

export default function BlogCard({
  id,
  title,
  description,
  author,
  time,
  date,
}) {
  return (
    <article
      className="
        group
        bg-[#FFFDF8]
        border
        border-[#E8DCC8]
        rounded-3xl
        p-6
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all
        duration-300
      "
    >

      {/* Blog Title */}
      <h3
        className="
          text-xl
          font-bold
          text-[#2B1B17]
          leading-snug
          group-hover:text-[#800000]
          transition
        "
      >
        {title}
      </h3>

      {/* Blog Description */}
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

      {/* Bottom Section */}
      <div
        className="
          flex
          items-center
          justify-between
          mt-6
        "
      >

        {/* Author */}
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
              {date || "Today"} • {time || "Just now"}
            </p>

          </div>

        </div>

        {/* Read More */}
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