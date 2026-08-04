import Link from "next/link";


export default function Register() {

  return (

    <main
      className="
      min-h-screen
      bg-[#FFF8EE]
      flex
      items-center
      justify-center
      px-6
      "
    >


      <div
        className="
        w-full
        max-w-lg
        bg-[#FFFDF8]
        border
        border-[#E8DCC8]
        rounded-3xl
        p-10
        shadow-2xl
        "
      >



        {/* Logo */}

        <h1
          className="
          text-center
          text-2xl
          font-bold
          text-[#2B1B17]
          "
        >
          Blog
          <span className="text-[#800000]">
            Sphere.
          </span>
        </h1>





        {/* Icon */}

        <div
          className="
          mx-auto
          mt-6
          w-14
          h-14
          rounded-full
          bg-[#F8EBDD]
          flex
          items-center
          justify-center
          text-2xl
          "
        >
          ✍️
        </div>






        {/* Heading */}

        <h2
          className="
          mt-5
          text-3xl
          font-bold
          text-center
          text-[#2B1B17]
          "
        >
          Create Account
        </h2>





        <p
          className="
          text-[#6B4F45]
          text-center
          mt-3
          "
        >
          Join BlogSphere and start sharing stories
        </p>







        <form
          className="
          mt-8
          space-y-5
          "
        >





          {/* Name */}

          <input
            placeholder="Full Name"
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





          {/* Email */}

          <input
            placeholder="Email address"
            type="email"
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





          {/* Password */}

          <input
            placeholder="Password"
            type="password"
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





          {/* Confirm Password */}

          <input
            placeholder="Confirm Password"
            type="password"
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







          {/* Register Button */}

          <button
            className="
            w-full
            bg-gradient-to-r
            from-[#800000]
            to-[#A52A2A]
            text-white
            py-4
            rounded-xl
            font-semibold
            hover:opacity-90
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            "
          >
            Join BlogSphere
          </button>





        </form>








        {/* Login Link */}

        <p
          className="
          text-center
          text-sm
          mt-7
          text-[#6B4F45]
          "
        >

          Already have an account?

          <Link
            href="/login"
            className="
            ml-1
            text-[#800000]
            font-semibold
            cursor-pointer
            hover:underline
            "
          >
            Login
          </Link>


        </p>





      </div>



    </main>

  );

}