import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import { useTheme } from "../contexts/ThemeContext";



function Navbar() {


    const navigate = useNavigate();


    const { logout } = useAuth();


    const { darkMode, toggleTheme } = useTheme();




    const handleLogout = () => {


        logout();


        navigate("/login");


    };




    return (

        <nav className="
            bg-gray-900
            dark:bg-black
            text-white
            px-8
            py-4
            flex
            justify-between
            items-center
        ">



            <h1 className="
                text-2xl
                font-bold
            ">

                IdentityHub

            </h1>





            <div className="
                space-x-3
            ">



                <button

                    onClick={toggleTheme}

                    className="
                    bg-gray-700
                    px-4
                    py-2
                    rounded-lg
                    "

                >

                    {darkMode ? "☀️" : "🌙"}

                </button>





                <button

                    onClick={() => navigate("/profile")}

                    className="
                    bg-blue-600
                    px-4
                    py-2
                    rounded-lg
                    hover:bg-blue-700
                    "

                >

                    Profile

                </button>





                <button

                    onClick={handleLogout}

                    className="
                    bg-red-600
                    px-4
                    py-2
                    rounded-lg
                    hover:bg-red-700
                    "

                >

                    Logout

                </button>



            </div>



        </nav>

    );


}


export default Navbar;