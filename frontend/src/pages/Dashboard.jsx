import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";


function Dashboard() {


    const navigate = useNavigate();


    const [user, setUser] = useState(null);



    useEffect(() => {


        const loadProfile = async () => {


            try {


                const response = await api.get(
                    "profile/"
                );


                setUser(
                    response.data
                );


            }

            catch(error) {


                console.log(error);


            }


        };


        loadProfile();


    }, []);




    return (


        <div
            className="
                min-h-screen
                bg-gray-100
                dark:bg-gray-900
                text-black
                dark:text-white
            "
        >


            <Navbar />



            <main
                className="
                    max-w-6xl
                    mx-auto
                    p-8
                "
            >


                <h1
                    className="
                        text-3xl
                        font-bold
                        mb-6
                    "
                >

                    Dashboard

                </h1>




                {
                    user && (

                        <UserCard
                            user={user}
                        />

                    )
                }





                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        lg:grid-cols-4
                        gap-6
                        mt-8
                    "
                >



                    <button

                        onClick={() =>
                            navigate("/profile")
                        }

                        className="
                            bg-blue-600
                            hover:bg-blue-700
                            hover:scale-105
                            cursor-pointer
                            text-white
                            rounded-xl
                            p-6
                            shadow-lg
                            transition-all
                            duration-300
                        "

                    >

                        <h2
                            className="
                                text-xl
                                font-bold
                            "
                        >

                            Profile

                        </h2>


                        <p className="mt-2">

                            Manage your account information.

                        </p>


                    </button>





                    <button

                        onClick={() =>
                            navigate("/sessions")
                        }

                        className="
                            bg-green-600
                            hover:bg-green-700
                            hover:scale-105
                            cursor-pointer
                            text-white
                            rounded-xl
                            p-6
                            shadow-lg
                            transition-all
                            duration-300
                        "

                    >

                        <h2
                            className="
                                text-xl
                                font-bold
                            "
                        >

                            Active Sessions

                        </h2>


                        <p className="mt-2">

                            Manage logged-in devices.

                        </p>


                    </button>





                    <button

                        onClick={() =>
                            navigate("/login-history")
                        }

                        className="
                            bg-purple-600
                            hover:bg-purple-700
                            hover:scale-105
                            cursor-pointer
                            text-white
                            rounded-xl
                            p-6
                            shadow-lg
                            transition-all
                            duration-300
                        "

                    >

                        <h2
                            className="
                                text-xl
                                font-bold
                            "
                        >

                            Login History

                        </h2>


                        <p className="mt-2">

                            Review previous login activities.

                        </p>


                    </button>





                    <button

                        onClick={() =>
                            navigate("/security-alerts")
                        }

                        className="
                            bg-orange-600
                            hover:bg-orange-700
                            hover:scale-105
                            cursor-pointer
                            text-white
                            rounded-xl
                            p-6
                            shadow-lg
                            transition-all
                            duration-300
                        "

                    >

                        <h2
                            className="
                                text-xl
                                font-bold
                            "
                        >

                            Security Alerts

                        </h2>


                        <p className="mt-2">

                            View suspicious activities.

                        </p>


                    </button>



                </div>



            </main>



        </div>


    );


}


export default Dashboard;