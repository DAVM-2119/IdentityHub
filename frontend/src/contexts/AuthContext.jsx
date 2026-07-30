import { createContext, useContext, useState } from "react";


const AuthContext = createContext();



export function AuthProvider({ children }) {


    const [isAuthenticated, setIsAuthenticated] = useState(

        Boolean(
            localStorage.getItem("access")
        )

    );



    const login = (access, refresh) => {


        localStorage.setItem(
            "access",
            access
        );


        localStorage.setItem(
            "refresh",
            refresh
        );


        setIsAuthenticated(true);


    };



    const logout = () => {


        localStorage.removeItem(
            "access"
        );


        localStorage.removeItem(
            "refresh"
        );


        setIsAuthenticated(false);


    };



    return (

        <AuthContext.Provider

            value={{

                isAuthenticated,

                login,

                logout

            }}

        >

            {children}

        </AuthContext.Provider>

    );


}



export function useAuth() {


    return useContext(AuthContext);


}