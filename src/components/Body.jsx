import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfo } from "../utils/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch(),
    navigate = useNavigate();
  const userInfo = useSelector((state) => state.userSlice);
  const fetchUser = async () => {
    try {
      const user = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUserInfo(user.data));
    } catch (err) {
      {
        if (err.status === 401) {
          navigate("/login");
        }
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    if (!userInfo) fetchUser();
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
