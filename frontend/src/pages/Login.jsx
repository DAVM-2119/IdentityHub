import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import GoogleLoginButton from "../components/GoogleLoginButton";

function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    setLoading(true);

    try {

      const response = await api.post(
        "login/",
        formData
      );

      const { access, refresh } = response.data;

      login(
        access,
        refresh
      );

      navigate("/dashboard");

    }

    catch (error) {

      setError(

        error.response?.data?.detail ||

        "Unable to login. Please try again."

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="
        min-h-screen
        bg-gray-100
        dark:bg-gray-900
        flex
        items-center
        justify-center
        p-6
      "
    >

      <div
        className="
          w-full
          max-w-md
          bg-white
          dark:bg-gray-800
          rounded-2xl
          shadow-xl
          border
          border-gray-200
          dark:border-gray-700
          p-8
        "
      >

        <h1
          className="
            text-4xl
            font-bold
            text-center
            text-gray-900
            dark:text-white
          "
        >
          IdentityHub
        </h1>

        <p
          className="
            text-center
            text-gray-600
            dark:text-gray-300
            mt-2
            mb-8
          "
        >
          Sign in to your account
        </p>

        {error && (

          <div
            className="
              mb-5
              rounded-lg
              bg-red-100
              border
              border-red-300
              text-red-700
              p-3
            "
          >
            {error}
          </div>

        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label
              className="
                block
                mb-2
                font-medium
                text-gray-700
                dark:text-gray-300
              "
            >
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                dark:bg-gray-700
                dark:border-gray-600
                dark:text-white
              "
            />

          </div>

          <div>

            <label
              className="
                block
                mb-2
                font-medium
                text-gray-700
                dark:text-gray-300
              "
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                dark:bg-gray-700
                dark:border-gray-600
                dark:text-white
              "
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-lg
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              py-3
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>

        </form>

        <div
          className="
            my-6
            text-center
            text-gray-500
            dark:text-gray-400
          "
        >
          OR
        </div>

        <div className="flex justify-center">

          <GoogleLoginButton />

        </div>

        <p
          className="
            mt-8
            text-center
            text-gray-600
            dark:text-gray-300
          "
        >
          Don't have an account?{" "}

          <Link
            to="/register"
            className="
              text-blue-600
              hover:text-blue-800
              font-semibold
            "
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;