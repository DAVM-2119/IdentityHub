import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import LoginHistory from "../components/LoginHistory";

import api from "../services/api";

function LoginHistoryPage() {

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

            catch (error) {

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

                <div
                    className="
                        bg-white
                        dark:bg-gray-800
                        rounded-xl
                        shadow-lg
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
                        Login History
                    </h1>

                    <p
                        className="
                            text-gray-600
                            dark:text-gray-300
                            mb-8
                        "
                    >
                        Review all successful logins to your account.
                    </p>

                    <LoginHistory />

                </div>

            </main>

        </div>

    );

}

export default LoginHistoryPage;