"use client";

import Link from "next/link";
import { useEffect, useState } from "react";


export default function Dashboard() {


  const [blogs, setBlogs] = useState([]);



  useEffect(() => {

    const savedBlogs =
      JSON.parse(localStorage.getItem("blogs")) || [];


    setBlogs(savedBlogs);


  }, []);





  return (

    <main
      className="
      min-h-screen
      bg-[#FFF8EE]
      px-6
      py-12
      "
    >


      <div className="max-w-7xl mx-auto">



        {/* Header */}

        <div
          className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-5
          "
        >


          <div>

            <h1
              className="
              text-4xl
              font-bold
              text-[#2B1B17]
              "
            >
              Welcome Back 👋
            </h1>


            <p
              className="
              text-[#6B4F45]
              mt-2
              "
            >
              Manage your blogs, drafts and profile
            </p>


          </div>





          <Link

            href="/create-blog"

            className="
            bg-gradient-to-r
            from-[#800000]
            to-[#A52A2A]
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            hover:opacity-90
            hover:shadow-xl
            transition
            "

          >

            + Create Blog

          </Link>


        </div>









        {/* Stats */}


        <div
          className="
          grid
          md:grid-cols-3
          gap-6
          mt-10
          "
        >


          <Card

            title="Total Blogs"

            value={blogs.length}

          />



          <Card

            title="Published"

            value={
              blogs.filter(
                blog => blog.status === "published"
              ).length
            }

          />



          <Card

            title="Drafts"

            value={
              blogs.filter(
                blog => blog.status === "draft"
              ).length
            }

          />


        </div>









        {/* Recent Blogs */}


        <section className="mt-12">


          <h2
            className="
            text-2xl
            font-bold
            text-[#2B1B17]
            "
          >
            Recent Blogs
          </h2>





          <div className="mt-5 space-y-5">



            {

              blogs.length === 0 ?


              (

                <div

                  className="
                  bg-[#FFFDF8]
                  border
                  border-[#E8DCC8]
                  rounded-3xl
                  p-6
                  shadow-lg
                  "

                >

                  <p className="text-[#6B4F45]">

                    No blogs yet. Start writing your first story ✍️

                  </p>


                </div>


              )



              :



              blogs.map((blog)=>(


                <div

                  key={blog.id}

                  className="
                  bg-[#FFFDF8]
                  border
                  border-[#E8DCC8]
                  rounded-3xl
                  p-6
                  shadow-lg
                  hover:-translate-y-1
                  transition
                  "

                >




                  <div

                    className="
                    flex
                    justify-between
                    items-center
                    "

                  >





                    <div>


                      <Link

                        href={`/blog/${blog.id}`}

                        className="
                        font-semibold
                        text-lg
                        text-[#2B1B17]
                        hover:text-[#800000]
                        transition
                        "

                      >

                        {blog.title}


                      </Link>





                      <p

                        className="
                        text-sm
                        text-[#6B4F45]
                        mt-1
                        "

                      >

                        {blog.category} • {blog.date}

                      </p>


                    </div>









                    <div

                      className="
                      flex
                      items-center
                      gap-3
                      "

                    >



                      <span

                        className="
                        bg-[#F8EBDD]
                        text-[#800000]
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        "

                      >

                        {blog.status}

                      </span>






                      <Link

                        href={`/blog/${blog.id}`}

                        className="
                        text-[#800000]
                        font-semibold
                        hover:underline
                        "

                      >

                        View

                      </Link>



                    </div>




                  </div>




                </div>



              ))


            }




          </div>



        </section>





      </div>



    </main>

  );

}









function Card({title,value}) {


  return (


    <div

      className="
      bg-[#FFFDF8]
      border
      border-[#E8DCC8]
      rounded-3xl
      p-6
      shadow-lg
      hover:-translate-y-2
      transition
      "

    >



      <h2 className="text-[#6B4F45]">

        {title}

      </h2>



      <p

        className="
        text-4xl
        font-bold
        mt-3
        text-[#800000]
        "

      >

        {value}

      </p>



    </div>


  );


}