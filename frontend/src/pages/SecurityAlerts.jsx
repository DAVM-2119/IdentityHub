import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SecurityAlerts from "../components/SecurityAlerts";

import api from "../services/api";

function SecurityAlertsPage() {

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
                        Security Alerts
                    </h1>

                    <p
                        className="
                            text-gray-600
                            dark:text-gray-300
                            mb-8
                        "
                    >
                        Review suspicious login activities and security alerts for your account.
                    </p>

                    <SecurityAlerts />

                </div>

            </main>

        </div>

    );

}

export default SecurityAlertsPage;