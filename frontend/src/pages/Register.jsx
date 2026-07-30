import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    setLoading(true);

    setError("");

    setSuccess("");

    try {

      await api.post(
        "register/",
        formData
      );

      setSuccess(
        "Account created successfully!"
      );

      setTimeout(() => {

        navigate("/login");

      }, 1500);

    }

    catch (error) {

      console.log(error);

      if (error.response?.data) {

        const errors = Object.values(
          error.response.data
        )
          .flat()
          .join(" ");

        setError(errors);

      }

      else {

        setError(
          "Registration failed."
        );

      }

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
          Create Account
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
          Join IdentityHub
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

        {success && (

          <div
            className="
              mb-5
              rounded-lg
              bg-green-100
              border
              border-green-300
              text-green-700
              p-3
            "
          >
            {success}
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
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
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
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              py-3
              rounded-lg
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>

        <p
          className="
            mt-8
            text-center
            text-gray-600
            dark:text-gray-300
          "
        >
          Already have an account?{" "}

          <Link
            to="/login"
            className="
              text-blue-600
              hover:text-blue-800
              font-semibold
            "
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;