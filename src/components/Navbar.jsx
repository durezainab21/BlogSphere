"use client";

import { useState } from "react";
import Link from "next/link";


export default function Navbar() {

  const [open, setOpen] = useState(false);


  const closeMenu = () => {
    setOpen(false);
  };


  return (

    <nav
      className="
      sticky
      top-0
      z-50
      bg-[#FFF8EE]/80
      backdrop-blur-xl
      border-b
      border-[#E8DCC8]
      "
    >


      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-5
        flex
        justify-between
        items-center
        "
      >



        {/* Logo */}

        <Link href="/">

          <h1
            className="
            text-2xl
            font-bold
            tracking-tight
            text-[#2B1B17]
            "
          >
            Blog
            <span className="text-[#800000]">
              Sphere.
            </span>

          </h1>

        </Link>







        {/* Desktop Menu */}

<div
  className="
  hidden
  md:flex
  items-center
  gap-8
  text-sm
  font-medium
  text-[#6B4F45]
  "
>


  <Link
    href="/"
    className="nav-link"
  >
    Home
  </Link>


  <Link
    href="/dashboard"
    className="nav-link"
  >
    Dashboard
  </Link>


  <Link
    href="/create-blog"
    className="nav-link"
  >
    Create Blog
  </Link>


  <Link
    href="/login"
    className="nav-link"
  >
    Login
  </Link>



  <Link
    href="/register"
    className="
    px-6
    py-3
    rounded-full
    bg-gradient-to-r
    from-[#800000]
    to-[#A52A2A]
    text-white
    font-semibold
    hover:opacity-90
    transition
    "
  >
    Register
  </Link>



  <Link
    href="/create-blog"
    className="
    px-7
    py-3
    rounded-full
    border
    border-[#800000]
    text-[#800000]
    font-semibold
    hover:bg-[#800000]
    hover:text-white
    transition
    "
  >
    Start Writing
  </Link>



</div>




        {/* Mobile Button */}

        <button

          onClick={() => setOpen(!open)}

          className="
          md:hidden
          text-3xl
          text-[#800000]
          "
        >

          {open ? "×" : "☰"}

        </button>



      </div>








      {/* Mobile Menu */}

      {
        open && (

          <div
            className="
            md:hidden
            bg-[#FFFDF8]
            border-t
            border-[#E8DCC8]
            px-6
            py-6
            space-y-5
            text-center
            "
          >


            <Link
              href="/"
              onClick={closeMenu}
              className="block text-[#6B4F45] hover:text-[#800000]"
            >
              Home
            </Link>



            <Link
              href="/dashboard"
              onClick={closeMenu}
              className="block text-[#6B4F45] hover:text-[#800000]"
            >
              Dashboard
            </Link>



            <Link
              href="/create-blog"
              onClick={closeMenu}
              className="block text-[#6B4F45] hover:text-[#800000]"
            >
              Create Blog
            </Link>



            <Link
              href="/login"
              onClick={closeMenu}
              className="block text-[#6B4F45] hover:text-[#800000]"
            >
              Login
            </Link>



            <Link
              href="/register"
              onClick={closeMenu}
              className="
              inline-block
              bg-gradient-to-r
              from-[#800000]
              to-[#A52A2A]
              text-white
              px-7
              py-3
              rounded-full
              font-semibold
              "
            >
              Register
            </Link>



          </div>

        )
      }



    </nav>

  );

}