import Link from "next/link";


export default function Login() {

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
          Welcome Back
        </h2>





        <p
          className="
          mt-3
          text-center
          text-[#6B4F45]
          "
        >
          Continue your writing journey
        </p>






        <form
          className="
          mt-8
          space-y-5
          "
        >




          {/* Email */}

          <input
            type="email"
            placeholder="Email address"
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
            type="password"
            placeholder="Password"
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





          {/* Forgot Password */}

          <div className="text-right">

            <p
              className="
              text-sm
              text-[#800000]
              cursor-pointer
              hover:underline
              "
            >
              Forgot password?
            </p>

          </div>






          {/* Login Button */}

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
            Login
          </button>





        </form>







        {/* Register */}

        <p
          className="
          text-center
          text-sm
          mt-7
          text-[#6B4F45]
          "
        >

          Don't have an account?

          <Link
            href="/register"
            className="
            ml-1
            text-[#800000]
            font-semibold
            cursor-pointer
            hover:underline
            "
          >
            Register
          </Link>


        </p>





      </div>



    </main>

  );

}