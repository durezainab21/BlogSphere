"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";


export default function BlogDetails() {


  const { id } = useParams();

  const router = useRouter();


  const [blog,setBlog] = useState(null);





  useEffect(()=>{


    const blogs =
    JSON.parse(localStorage.getItem("blogs")) || [];



    const currentBlog =
    blogs.find(
      item=>item.id.toString() === id
    );



    setBlog(currentBlog);



  },[id]);









  const deleteBlog = ()=>{


    const confirmDelete =
    confirm("Delete this blog permanently?");


    if(!confirmDelete) return;



    const blogs =
    JSON.parse(localStorage.getItem("blogs")) || [];



    const updatedBlogs =
    blogs.filter(
      item=>item.id.toString() !== id
    );



    localStorage.setItem(
      "blogs",
      JSON.stringify(updatedBlogs)
    );



    alert("Blog Deleted 🗑️");


    router.push("/dashboard");


  };









  if(!blog){


    return (

      <main
      className="
      min-h-screen
      bg-[#FFF8EE]
      flex
      items-center
      justify-center
      "
      >

        <p className="text-[#6B4F45]">

          Loading blog...

        </p>


      </main>

    );

  }






  const readingTime = Math.ceil(
    blog.content.split(" ").length / 200
  );








  return (

    <main

    className="
    min-h-screen
    bg-[#FFF8EE]
    px-6
    py-12
    "

    >




      <article

      className="
      max-w-4xl
      mx-auto
      bg-[#FFFDF8]
      border
      border-[#E8DCC8]
      rounded-3xl
      shadow-xl
      overflow-hidden
      "

      >








      {/* Cover */}


      {

      blog.image &&

      (

        <div

        className="
        h-72
        bg-[#F8EBDD]
        flex
        items-center
        justify-center
        text-6xl
        "

        >

          📷


        </div>

      )

      }









      <div className="p-8">







      {/* Category */}


      <span

      className="
      bg-[#F8EBDD]
      text-[#800000]
      px-4
      py-2
      rounded-full
      text-sm
      font-semibold
      "

      >

        {blog.category}

      </span>









      {/* Title */}


      <h1

      className="
      mt-6
      text-4xl
      md:text-5xl
      font-bold
      text-[#2B1B17]
      leading-tight
      "

      >

        {blog.title}

      </h1>









      {/* Author */}


      <div

      className="
      flex
      items-center
      gap-4
      mt-6
      "

      >


        <div

        className="
        w-12
        h-12
        rounded-full
        bg-[#F8EBDD]
        flex
        items-center
        justify-center
        text-xl
        "

        >

          👤

        </div>



        <div>


          <h3
          className="
          font-semibold
          text-[#2B1B17]
          "
          >

            BlogSphere Writer

          </h3>


          <p
          className="
          text-sm
          text-[#6B4F45]
          "
          >

            {blog.date} • {readingTime} min read

          </p>


        </div>


      </div>









      {/* Content */}


      <p

      className="
      mt-10
      text-lg
      leading-9
      text-[#2B1B17]
      whitespace-pre-line
      "

      >

        {blog.content}

      </p>









      {/* Actions */}


      <div

      className="
      flex
      flex-wrap
      gap-4
      mt-12
      "

      >



      <Link

      href="/dashboard"

      className="
      border
      border-[#800000]
      text-[#800000]
      px-6
      py-3
      rounded-xl
      font-semibold
      hover:bg-[#800000]
      hover:text-white
      transition
      "

      >

        ← Back

      </Link>







      <Link

      href={`/blog/edit/${blog.id}`}

      className="
      bg-gradient-to-r
      from-[#800000]
      to-[#A52A2A]
      text-white
      px-6
      py-3
      rounded-xl
      font-semibold
      "

      >

        Edit ✍️

      </Link>








      <button

      onClick={deleteBlog}

      className="
      bg-[#2B1B17]
      text-white
      px-6
      py-3
      rounded-xl
      font-semibold
      "

      >

        Delete 🗑️

      </button>






      </div>





      </div>





      </article>






    </main>


  );

}