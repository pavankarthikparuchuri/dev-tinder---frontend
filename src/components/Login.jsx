import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUserInfo } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showErr, setShowErr] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmailId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
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

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          emailId,
          password,
          firstName,
          lastName,
        },
        { withCredentials: true }
      );
      dispatch(addUserInfo(res.data));
      navigate("/profile");
    } catch (err) {
      setShowErr(err?.response?.data || "Something went wrong!");
      console.log(err);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm absolute left-0 right-0 mx-auto my-10">
      <div className="card-body">
        <h2 className="card-title flex justify-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <div className="flex flex-col items-center mb-2">
          {!isLogin && (
            <fieldset className="fieldset w-[90%]">
              <legend className="fieldset-legend">First Name: </legend>
              <input
                type="text"
                className="input"
                value={firstName}
                onChange={(e) => handleFirstNameChange(e)}
              />
            </fieldset>
          )}
          {!isLogin && (
            <fieldset className="fieldset w-[90%]">
              <legend className="fieldset-legend">Last Name: </legend>
              <input
                type="text"
                className="input"
                value={lastName}
                onChange={(e) => handleLastNameChange(e)}
              />
            </fieldset>
          )}
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
        <div
          className="card-actions justify-center"
          onClick={isLogin ? handleLoginClick : handleSignUp}
        >
          <button className="btn btn-primary px-10">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </div>
        <p
          className="fieldset-label cursor-pointer m-auto py-2"
          onClick={() => setIsLogin((prev) => !prev)}
        >
          {isLogin ? "New User? Signup Here" : "Existing User Login Here"}
        </p>
      </div>
    </div>
  );
};

export default Login;
