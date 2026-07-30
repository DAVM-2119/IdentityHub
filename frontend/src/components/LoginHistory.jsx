import { useEffect, useState } from "react";

import api from "../services/api";

function LoginHistory() {

    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadHistory = async () => {

            try {

                const response = await api.get(
                    "login-history/"
                );

                setHistory(response.data);

            }

            catch (error) {

                console.log(error);

            }

            finally {

                setLoading(false);

            }

        };

        loadHistory();

    }, []);

    if (loading) {

        return (

            <p className="text-center text-gray-500 dark:text-gray-300">

                Loading login history...

            </p>

        );

    }

    if (history.length === 0) {

        return (

            <div
                className="
                    bg-gray-50
                    dark:bg-gray-700
                    rounded-lg
                    p-6
                    text-center
                "
            >

                No login history found.

            </div>

        );

    }

    return (

        <div className="overflow-x-auto">

            <table
                className="
                    w-full
                    border-collapse
                "
            >

                <thead>

                    <tr
                        className="
                            bg-blue-600
                            text-white
                        "
                    >

                        <th className="p-3 text-left">
                            Login Time
                        </th>

                        <th className="p-3 text-left">
                            Method
                        </th>

                        <th className="p-3 text-left">
                            IP Address
                        </th>

                        <th className="p-3 text-left">
                            Browser
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {history.map((item) => (

                        <tr
                            key={item.id}
                            className="
                                border-b
                                dark:border-gray-700
                                hover:bg-gray-100
                                dark:hover:bg-gray-700
                                transition
                            "
                        >

                            <td className="p-3">
                                {new Date(
                                    item.login_time
                                ).toLocaleString()}
                            </td>

                            <td className="p-3">
                                {item.login_method}
                            </td>

                            <td className="p-3">
                                {item.ip_address}
                            </td>

                            <td className="p-3">
                                {item.browser}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default LoginHistory;