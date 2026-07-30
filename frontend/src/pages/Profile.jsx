import { useEffect, useState } from "react";

import api from "../services/api";

import Navbar from "../components/Navbar";

function Profile() {

    const [user, setUser] = useState(null);

    const [loginCount, setLoginCount] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const profileResponse = await api.get(
                    "profile/"
                );

                setUser(
                    profileResponse.data
                );

                const historyResponse = await api.get(
                    "login-history/"
                );

                setLoginCount(
                    historyResponse.data.length
                );

            }

            catch (error) {

                console.log(error);

            }

            finally {

                setLoading(false);

            }

        };

        loadProfile();

    }, []);

    if (loading) {

        return (

            <div
                className="
                    min-h-screen
                    bg-gray-100
                    dark:bg-gray-900
                    flex
                    items-center
                    justify-center
                "
            >

                <h2
                    className="
                        text-2xl
                        font-bold
                        text-gray-800
                        dark:text-white
                    "
                >
                    Loading Profile...
                </h2>

            </div>

        );

    }

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
                        mb-8
                    "
                >
                    My Profile
                </h1>

                <div
                    className="
                        bg-white
                        dark:bg-gray-800
                        rounded-xl
                        shadow-lg
                        p-8
                        max-w-3xl
                    "
                >

                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-6
                        "
                    >

                        <div>

                            <h2
                                className="
                                    text-xl
                                    font-bold
                                    mb-4
                                "
                            >
                                User Information
                            </h2>

                            <div className="space-y-4">

                                <p>

                                    <span className="font-semibold">
                                        Username:
                                    </span>

                                    <br />

                                    {user?.username}

                                </p>

                                <p>

                                    <span className="font-semibold">
                                        Email:
                                    </span>

                                    <br />

                                    {user?.email}

                                </p>

                                <p>

                                    <span className="font-semibold">
                                        Account Created:
                                    </span>

                                    <br />

                                    {new Date(
                                        user?.date_joined
                                    ).toLocaleDateString()}

                                </p>

                            </div>

                        </div>

                        <div>

                            <h2
                                className="
                                    text-xl
                                    font-bold
                                    mb-4
                                "
                            >
                                Login Statistics
                            </h2>

                            <div
                                className="
                                    bg-blue-600
                                    text-white
                                    rounded-lg
                                    p-6
                                    text-center
                                "
                            >

                                <h3
                                    className="
                                        text-5xl
                                        font-bold
                                    "
                                >
                                    {loginCount}
                                </h3>

                                <p
                                    className="
                                        mt-3
                                        text-lg
                                    "
                                >
                                    Total Logins
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>

    );

}

export default Profile;