import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUserInfo } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showErr, setShowErr] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmailId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUserInfo(res.data));
      navigate("/");
    } catch (err) {
      setShowErr(err?.response?.data || "Something went wrong!");
      console.log(err);
    }
  };
  return (
    <div className="card bg-base-300 w-96 h-75 shadow-sm absolute left-0 right-0 top-0 bottom-0 m-auto">
      <div className="card-body">
        <h2 className="card-title flex justify-center">Login</h2>
        <div className="flex flex-col items-center mb-2">
          <fieldset className="fieldset w-[90%]">
            <legend className="fieldset-legend">Email ID: </legend>
            <input
              type="text"
              className="input"
              value={emailId}
              onChange={(e) => handleEmailChange(e)}
            />
          </fieldset>
          <fieldset className="fieldset w-[90%]">
            <legend className="fieldset-legend">Password: </legend>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
            />
            <p className="fieldset-label text-red-600">{showErr}</p>
          </fieldset>
        </div>
        <div className="card-actions justify-center" onClick={handleLoginClick}>
          <button className="btn btn-primary px-10">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
