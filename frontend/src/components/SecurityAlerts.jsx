import { useEffect, useState } from "react";

import api from "../services/api";


function SecurityAlerts() {

    const [alerts, setAlerts] = useState([]);

    const [error, setError] = useState("");



    useEffect(() => {

        const loadAlerts = async () => {

            try {

                const response = await api.get(
                    "security-alerts/"
                );

                setAlerts(response.data);


            } catch (error) {

                console.log(error);

                setError(
                    "Failed to load security alerts."
                );

            }

        };


        loadAlerts();


    }, []);




    const markAsRead = async (id) => {

        try {

            await api.patch(
                `security-alerts/${id}/read/`
            );


            setAlerts(

                alerts.map((alert)=>


                    alert.id === id

                    ?

                    {
                        ...alert,
                        is_read:true
                    }

                    :

                    alert


                )

            );


        } catch(error){

            console.log(error);

        }

    };



    return (

        <div
            className="
            bg-white
            dark:bg-gray-800
            rounded-xl
            shadow-lg
            p-6
            mt-8
            "
        >


            <h2
                className="
                text-2xl
                font-bold
                mb-5
                "
            >

                🚨 Security Alerts

            </h2>



            {
                error &&

                <p
                    className="
                    text-red-500
                    "
                >
                    {error}
                </p>

            }



            {
                alerts.length === 0 ?


                (

                    <p
                        className="
                        text-gray-500
                        dark:text-gray-300
                        "
                    >

                        No suspicious activity detected.

                    </p>

                )


                :


                (

                    alerts.map((alert)=>(


                        <div

                            key={alert.id}

                            className="
                            border
                            rounded-lg
                            p-4
                            mb-3
                            dark:border-gray-600
                            "

                        >


                            <h3
                                className="
                                font-semibold
                                text-red-600
                                "
                            >

                                {alert.alert_type}

                            </h3>



                            <p
                                className="
                                dark:text-gray-200
                                "
                            >

                                {alert.message}

                            </p>



                            <p
                                className="
                                text-sm
                                text-gray-500
                                mt-2
                                "
                            >

                                {
                                    new Date(
                                        alert.created_at
                                    )
                                    .toLocaleString()
                                }

                            </p>



                            {
                                !alert.is_read &&


                                <button

                                    onClick={() =>
                                        markAsRead(alert.id)
                                    }

                                    className="
                                    mt-3
                                    bg-blue-600
                                    text-white
                                    px-4
                                    py-2
                                    rounded-lg
                                    hover:bg-blue-700
                                    "

                                >

                                    Mark as read

                                </button>

                            }


                        </div>


                    ))

                )

            }


        </div>

    );

}


export default SecurityAlerts;