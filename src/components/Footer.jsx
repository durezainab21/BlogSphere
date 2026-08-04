import Link from "next/link";


export default function Footer() {

  return (

    <footer
      className="
      bg-[#2B1B17]
      text-[#FFF8EE]
      py-14
      "
    >


      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        "
      >



        <div
          className="
          grid
          md:grid-cols-3
          gap-10
          "
        >





          {/* Brand */}

          <div>


            <h2
              className="
              text-2xl
              font-bold
              "
            >

              Blog
              <span
                className="
                text-[#D9A441]
                "
              >
                Sphere.
              </span>

            </h2>



            <p
              className="
              mt-4
              text-sm
              text-[#D8C7B8]
              max-w-sm
              leading-relaxed
              "
            >
              A modern platform where writers share
              ideas, stories, and knowledge with the world.
            </p>



          </div>









          {/* Navigation */}

          <div
            className="
            flex
            flex-col
            items-center
            gap-4
            text-sm
            "
          >


            <Link
              href="/"
              className="
              text-[#D8C7B8]
              hover:text-[#D9A441]
              transition
              "
            >
              Home
            </Link>



            <Link
              href="/dashboard"
              className="
              text-[#D8C7B8]
              hover:text-[#D9A441]
              transition
              "
            >
              Dashboard
            </Link>



            <Link
              href="/create-blog"
              className="
              text-[#D8C7B8]
              hover:text-[#D9A441]
              transition
              "
            >
              Create Blog
            </Link>



            <Link
              href="/login"
              className="
              text-[#D8C7B8]
              hover:text-[#D9A441]
              transition
              "
            >
              Login
            </Link>


          </div>









          {/* Contact */}

          <div
            className="
            md:text-right
            text-center
            "
          >


            <h3
              className="
              font-semibold
              text-lg
              "
            >
              Stay Connected
            </h3>


            <p
              className="
              mt-3
              text-sm
              text-[#D8C7B8]
              "
            >
              Write. Share. Inspire.
            </p>



            <p
              className="
              mt-5
              text-sm
              text-[#D8C7B8]
              "
            >
              © 2026 BlogSphere
            </p>



            <p
              className="
              text-xs
              text-[#8A6A5A]
              mt-2
              "
            >
              Crafted for creators ✍️
            </p>



          </div>





        </div>




      </div>


    </footer>

  );

}