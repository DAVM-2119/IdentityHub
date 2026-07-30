import { Link } from "react-router-dom";

function Home() {

  return (

    <div
      className="
        min-h-screen
        bg-gray-100
        dark:bg-gray-900
        text-black
        dark:text-white
        flex
        items-center
        justify-center
        p-6
      "
    >

      <div
        className="
          max-w-4xl
          w-full
          bg-white
          dark:bg-gray-800
          rounded-2xl
          shadow-xl
          border
          border-gray-200
          dark:border-gray-700
          p-10
          text-center
        "
      >

        <h1
          className="
            text-5xl
            font-extrabold
            text-gray-900
            dark:text-white
          "
        >
          IdentityHub
        </h1>


        <p
          className="
            mt-5
            text-lg
            text-gray-600
            dark:text-gray-300
          "
        >
          Secure Authentication System built with
          Django, React, JWT Authentication and Google OAuth.
        </p>


        <div
          className="
            mt-10
            flex
            justify-center
            gap-6
            flex-wrap
          "
        >

          <Link
            to="/login"
            className="
              px-8
              py-3
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              transition
              shadow-md
            "
          >
            Login
          </Link>


          <Link
            to="/register"
            className="
              px-8
              py-3
              rounded-xl
              border-2
              border-blue-600
              text-blue-600
              hover:bg-blue-600
              hover:text-white
              font-semibold
              transition
            "
          >
            Register
          </Link>


        </div>



        <div
          className="
            mt-12
            grid
            md:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >


          <div
            className="
              bg-gray-100
              dark:bg-gray-700
              p-5
              rounded-xl
              shadow
              hover:shadow-lg
              transition
            "
          >
            <h2 className="font-bold text-lg">
              🔐 JWT Authentication
            </h2>
          </div>



          <div
            className="
              bg-gray-100
              dark:bg-gray-700
              p-5
              rounded-xl
              shadow
              hover:shadow-lg
              transition
            "
          >
            <h2 className="font-bold text-lg">
              🌐 Google Login
            </h2>
          </div>



          <div
            className="
              bg-gray-100
              dark:bg-gray-700
              p-5
              rounded-xl
              shadow
              hover:shadow-lg
              transition
            "
          >
            <h2 className="font-bold text-lg">
              📜 Login History
            </h2>
          </div>



          <div
            className="
              bg-gray-100
              dark:bg-gray-700
              p-5
              rounded-xl
              shadow
              hover:shadow-lg
              transition
            "
          >
            <h2 className="font-bold text-lg">
              🛡 Brute Force Protection
            </h2>
          </div>


        </div>


      </div>


    </div>

  );

}

export default Home;