import { authenticateGoogleToken } from "@/network/authRequests";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";

const LoginPage = () => {
  const { setUser, setToken } = useAuthStore();

  const navigate = useNavigate();

  const handleOnSuccess = (credentialResponse: CredentialResponse) => {
    authenticateGoogleToken(credentialResponse.credential).then((res: any) => {
      if (res) {
        const { user, access_token } = res;
        setUser(user);
        setToken(access_token);
        navigate("/");
      } else {
        console.log("Authentication failed");
      }
    });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 p-4 shadow-xl rounded-xl -translate-y-[60px]">
        <h1 className="text-2xl font-1 text-center">MCQ TestGen</h1>
        <h1 className="text-xl font-2">LOGIN</h1>
        <GoogleLogin
          onSuccess={handleOnSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
