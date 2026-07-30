import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../contexts/AuthContext";

function GoogleLoginButton() {

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {

    const loadingToast = toast.loading(
      "Signing in with Google..."
    );

    try {

      const response =await axios.post(
          "https://identityhub-5ygq.onrender.com/api/google/",

        {
          access_token: credentialResponse.credential,
        }

      );

      const { access, refresh } = response.data;

      login(
        access,
        refresh
      );

      toast.dismiss(loadingToast);

      toast.success(
        "Welcome to IdentityHub!"
      );

      navigate("/dashboard");

    }

    catch (error) {

      console.log(
        "STATUS:",
        error.response?.status
      );

      console.log(
        "DATA:",
        error.response?.data
      );

      toast.dismiss(loadingToast);

      toast.error(

        error.response?.data?.detail ||

        "Google login failed."

      );

    }

  };

  return (

    <GoogleLogin

      onSuccess={handleSuccess}

      onError={() => {

        toast.error(
          "Google login failed."
        );

      }}

    />

  );

}

export default GoogleLoginButton;