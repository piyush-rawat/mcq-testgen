import { googleLogout } from "@react-oauth/google";
import { useAuthStore } from "../store";
import Button from "./Button";
import { logoutRequest } from "@/network/authRequests";

const Navbar = () => {
  const { access_token, clearAuthData, user } = useAuthStore();

  const handleLogout = () => {
    logoutRequest(() => {
      googleLogout();
      clearAuthData();
    });
  };

  return (
    <div className="flex flex-row items-center p-4 bg-1 h-[60px] justify-between">
      <h1 className="text-white text-xl font-1 font-bold">MCQ TestGen</h1>
      <div>
        {access_token && (
          <div className="flex items-center gap-4">
            <div>
              <img src={user?.picture} className="size-[30px] rounded-full" />
            </div>

            <Button onClick={handleLogout}>Logout</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
