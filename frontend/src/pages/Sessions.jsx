import { useEffect, useState } from "react";

import api from "../services/api";


function Sessions() {

    const [sessions, setSessions] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");



    const loadSessions = async () => {

        try {

            const response = await api.get(
                "sessions/"
            );


            setSessions(
                response.data
            );


        } catch (error) {

            console.log(error);


            setError(
                "Failed to load active sessions."
            );


        } finally {

            setLoading(false);

        }

    };



    useEffect(() => {

        loadSessions();

    }, []);




    const logoutSession = async (id) => {

        if (
            !window.confirm(
                "Logout this session?"
            )
        ) {

            return;

        }


        try {

            await api.delete(
                `logout-session/${id}/`
            );


            loadSessions();


        } catch (error) {

            console.log(error);


            alert(
                "Failed to logout session."
            );

        }

    };




    const logoutOtherSessions = async () => {

        const current = sessions.find(
            (session) =>
                session.is_current
        );


        if (!current) {

            alert(
                "Current session not found."
            );

            return;

        }



        try {

            await api.post(
                "logout-other-sessions/",
                {
                    session_id: current.id,
                }
            );


            loadSessions();


            alert(
                "Other sessions logged out."
            );


        } catch (error) {

            console.log(error);


            alert(
                "Failed to logout other sessions."
            );

        }

    };




    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">

                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">

                    Loading Sessions...

                </h2>

            </div>

        );

    }




    if (error) {

        return (

            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">

                <h2 className="text-xl font-semibold text-red-600">

                    {error}

                </h2>

            </div>

        );

    }




    return (

        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">


            <div className="max-w-6xl mx-auto">



                <div className="flex items-center justify-between mb-8">


                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white">

                        Active Sessions

                    </h1>



                    <button

                        onClick={logoutOtherSessions}

                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"

                    >

                        Logout Other Devices

                    </button>


                </div>





                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">


                    <table className="w-full">


                        <thead className="bg-blue-600 text-white">


                            <tr>


                                <th className="text-left px-6 py-4">

                                    Device

                                </th>



                                <th className="text-left px-6 py-4">

                                    IP Address

                                </th>



                                <th className="text-left px-6 py-4">

                                    Login Time

                                </th>



                                <th className="text-left px-6 py-4">

                                    Last Activity

                                </th>



                                <th className="text-center px-6 py-4">

                                    Status

                                </th>



                                <th className="text-center px-6 py-4">

                                    Action

                                </th>


                            </tr>


                        </thead>




                        <tbody>


                            {sessions.map((session) => (

                                <tr

                                    key={session.id}

                                    className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"

                                >



                                    <td className="px-6 py-4 text-gray-800 dark:text-white">

                                        {session.browser}

                                    </td>




                                    <td className="px-6 py-4 text-gray-800 dark:text-white">

                                        {session.ip_address}

                                    </td>




                                    <td className="px-6 py-4 text-gray-800 dark:text-white">

                                        {new Date(
                                            session.created_at
                                        ).toLocaleString()}

                                    </td>




                                    <td className="px-6 py-4 text-gray-800 dark:text-white">

                                        {new Date(
                                            session.last_activity
                                        ).toLocaleString()}

                                    </td>




                                    <td className="px-6 py-4 text-center">


                                        {session.is_current ? (

                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                                                Current

                                            </span>


                                        ) : (

                                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">

                                                Active

                                            </span>

                                        )}


                                    </td>





                                    <td className="px-6 py-4 text-center">


                                        <button

                                            onClick={() =>
                                                logoutSession(
                                                    session.id
                                                )
                                            }

                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"

                                        >

                                            Logout

                                        </button>


                                    </td>



                                </tr>


                            ))}


                        </tbody>


                    </table>


                </div>


            </div>


        </div>

    );

}



export default Sessions;