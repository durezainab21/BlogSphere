"use client";

import { useState } from "react";

export default function CreateBlog() {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");



  const saveBlog = (status) => {


    if (!title || !category || !content) {

      alert("Please fill all required fields.");

      return;

    }



    const blog = {

      id: Date.now(),

      title,

      category,

      content,

      status,

      date: new Date().toLocaleDateString()

    };




    const oldBlogs =
      JSON.parse(localStorage.getItem("blogs")) || [];




    localStorage.setItem(

      "blogs",

      JSON.stringify([

        ...oldBlogs,

        blog

      ])

    );




    alert(

      status === "published"

        ? "Blog Published Successfully"

        : "Draft Saved"

    );




    setTitle("");

    setCategory("");

    setContent("");

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



      <div className="max-w-5xl mx-auto">





        <h1

          className="
          text-4xl
          font-bold
          text-[#2B1B17]
          "

        >

          Create New Blog

        </h1>




        <p

          className="
          mt-2
          text-[#6B4F45]
          "

        >

          Share your ideas and inspire the BlogSphere community.

        </p>







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






          {/* Author Section */}


          <div className="
          flex
          items-center
          gap-4
          mb-8
          ">


            <div

              className="
              w-12
              h-12
              rounded-full
              bg-[#800000]
              text-white
              flex
              items-center
              justify-center
              font-bold
              "

            >

              B

            </div>



            <div>

              <h3 className="
              font-semibold
              text-[#2B1B17]
              ">

                BlogSphere Writer

              </h3>


              <p className="
              text-sm
              text-[#6B4F45]
              ">

                Create and share your story

              </p>


            </div>


          </div>







          {/* Title */}


          <input

            type="text"

            value={title}

            onChange={(e)=>setTitle(e.target.value)}

            placeholder="Enter Blog Title"

            className="
            w-full
            px-5
            py-4
            rounded-xl
            border
            border-[#E8DCC8]
            outline-none
            focus:border-[#800000]
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
            border
            border-[#E8DCC8]
            outline-none
            focus:border-[#800000]
            "

          >


            <option value="">
              Select Category
            </option>


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


            <option>
              Innovation
            </option>


          </select>







          {/* Content */}


          <textarea

            value={content}

            onChange={(e)=>setContent(e.target.value)}

            placeholder="Write your story here..."

            rows={12}

            className="
            mt-5
            w-full
            px-5
            py-4
            rounded-xl
            border
            border-[#E8DCC8]
            outline-none
            resize-none
            focus:border-[#800000]
            "

          />








          {/* Buttons */}


          <div

            className="
            flex
            gap-4
            mt-8
            "

          >





            <button

              onClick={()=>saveBlog("published")}

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
              transition
              "

            >

              Publish Blog

            </button>






            <button

              onClick={()=>saveBlog("draft")}

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

              Save Draft

            </button>





          </div>







        </div>






      </div>






    </main>


  );

}