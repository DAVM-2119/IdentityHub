function UserCard({ user }) {


    return (

        <div className="
            bg-white
            dark:bg-gray-800
            shadow-lg
            rounded-xl
            p-6
            border
        ">


            <h2 className="
                text-xl
                font-bold
                mb-4
            ">

                User Information

            </h2>



            <p className="mb-2">

                <b>
                    Username:
                </b>

                {" "}

                {user.username}

            </p>



            <p>

                <b>
                    Email:
                </b>

                {" "}

                {user.email}

            </p>



        </div>

    );

}


export default UserCard;