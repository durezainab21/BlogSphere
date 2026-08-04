"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";


export default function EditBlog() {


  const { id } = useParams();

  const router = useRouter();


  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");





  useEffect(() => {


    const blogs =
      JSON.parse(localStorage.getItem("blogs")) || [];



    const currentBlog =
      blogs.find(
        blog => blog.id.toString() === id
      );



    if(currentBlog){

      setTitle(currentBlog.title);
      setCategory(currentBlog.category);
      setContent(currentBlog.content);

    }



  }, [id]);









  const updateBlog = () => {



    const blogs =
      JSON.parse(localStorage.getItem("blogs")) || [];



    const updatedBlogs =

      blogs.map(blog => {


        if(blog.id.toString() === id){


          return {

            ...blog,

            title,
            category,
            content,
            date: new Date().toLocaleDateString()

          };


        }


        return blog;


      });





    localStorage.setItem(

      "blogs",

      JSON.stringify(updatedBlogs)

    );




    alert("Blog Updated Successfully ✨");


    router.push(`/blog/${id}`);



  };









  return (


    <main

      className="
      min-h-screen
      bg-[#FFF8EE]
      px-6
      py-12
      "

    >




      <div

        className="
        max-w-5xl
        mx-auto
        "

      >





        {/* Header */}


        <h1

          className="
          text-4xl
          font-bold
          text-[#2B1B17]
          "

        >

          Edit Blog ✍️

        </h1>



        <p

          className="
          mt-2
          text-[#6B4F45]
          "

        >

          Update your story and keep your readers engaged

        </p>









        {/* Form Card */}



        <div

          className="
          mt-8
          bg-[#FFFDF8]
          border
          border-[#E8DCC8]
          rounded-3xl
          p-8
          shadow-xl
          "

        >







          {/* Title */}


          <input


            value={title}


            onChange={(e)=>setTitle(e.target.value)}


            placeholder="Blog Title"


            className="
            w-full
            px-5
            py-4
            rounded-xl
            bg-[#FFFDF8]
            border
            border-[#E8DCC8]
            text-[#2B1B17]
            outline-none
            focus:border-[#800000]
            transition
            "

          />









          {/* Category */}


          <select


            value={category}


            onChange={(e)=>setCategory(e.target.value)}


            className="
            mt-5
            w-full
            px-5
            py-4
            rounded-xl
            bg-[#FFFDF8]
            border
            border-[#E8DCC8]
            text-[#6B4F45]
            outline-none
            focus:border-[#800000]
            "

          >


            <option>
              Artificial Intelligence
            </option>


            <option>
              Technology
            </option>


            <option>
              Programming
            </option>


            <option>
              Design
            </option>


            <option>
              Career
            </option>


          </select>









          {/* Content */}



          <textarea


            value={content}


            onChange={(e)=>setContent(e.target.value)}


            rows="12"


            placeholder="Write your story..."


            className="
            mt-5
            w-full
            px-5
            py-4
            rounded-xl
            bg-[#FFFDF8]
            border
            border-[#E8DCC8]
            text-[#2B1B17]
            outline-none
            resize-none
            focus:border-[#800000]
            transition
            "


          />









          {/* Buttons */}



          <div

            className="
            flex
            gap-4
            mt-6
            "

          >





            <button


              onClick={updateBlog}


              className="
              bg-gradient-to-r
              from-[#800000]
              to-[#A52A2A]
              text-white
              px-10
              py-4
              rounded-xl
              font-semibold
              hover:opacity-90
              hover:shadow-xl
              transition
              "

            >

              Update Blog

            </button>








            <button


              onClick={()=>router.back()}


              className="
              border
              border-[#800000]
              text-[#800000]
              px-10
              py-4
              rounded-xl
              font-semibold
              hover:bg-[#800000]
              hover:text-white
              transition
              "

            >

              Cancel

            </button>




          </div>






        </div>






      </div>





    </main>


  );

}