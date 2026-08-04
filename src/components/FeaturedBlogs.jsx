"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FeaturedBlogs({ selectedCategory }) {

  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");



  useEffect(() => {

    const savedBlogs =
      JSON.parse(localStorage.getItem("blogs")) || [];

    setBlogs(savedBlogs);

  }, []);





  const filteredBlogs = blogs.filter((blog) => {


    const matchSearch = blog.title
      .toLowerCase()
      .includes(search.toLowerCase());



    const matchCategory =
      selectedCategory === "All" ||
      blog.category === selectedCategory;



    return matchSearch && matchCategory;


  });







  return (

    <section
      className="
      bg-[#FFF8EE]
      py-20
      "
    >



      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        "
      >





        {/* Heading */}


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








        {/* Search */}


        <div
          className="
          mt-10
          flex
          justify-center
          "
        >


          <input

            placeholder="Search blogs..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

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
            "

          />


        </div>








        {/* Category */}


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









        {/* Blogs */}



        <div
          className="
          grid
          md:grid-cols-3
          gap-8
          mt-12
          "
        >



          {

            filteredBlogs.length === 0 ?


            (

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

            )



            :



            filteredBlogs.map((blog)=>(


              <div

                key={blog.id}

                className="
                bg-[#FFFDF8]
                border
                border-[#E8DCC8]
                rounded-3xl
                p-6
                shadow-lg
                hover:-translate-y-2
                hover:shadow-2xl
                transition-all
                duration-300
                "

              >





                {/* Category */}


                <span

                  className="
                  bg-[#F8EBDD]
                  text-[#800000]
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  "

                >

                  {blog.category}

                </span>







                {/* Title */}


                <h3

                  className="
                  mt-5
                  text-xl
                  font-bold
                  text-[#2B1B17]
                  "

                >

                  {blog.title}

                </h3>







                {/* Description */}


                <p

                  className="
                  mt-3
                  text-[#6B4F45]
                  line-clamp-3
                  "

                >

                  {blog.content}

                </p>







                {/* Read Button */}


                <Link

                  href={`/blog/${blog.id}`}

                  className="
                  inline-block
                  mt-5
                  text-[#800000]
                  font-semibold
                  hover:underline
                  "

                >

                  Read More →

                </Link>





              </div>


            ))

          }



        </div>





      </div>





    </section>


  );

}