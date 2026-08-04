export default function BlogCard({ 
  title, 
  description, 
  author,
  time,
  date
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





      <div
        className="
        flex
        items-center
        justify-between
        mt-6
        "
      >



        <div
          className="
          flex
          items-center
          gap-3
          "
        >



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

            {author ? author.charAt(0) : "B"}

          </div>





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

              {date} • {time}

            </p>


          </div>



        </div>






        <button

          className="
          text-sm
          font-semibold
          text-[#800000]
          hover:translate-x-1
          transition
          "

        >

          Read →

        </button>




      </div>




    </article>

  );

}