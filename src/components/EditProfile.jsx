import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUserInfo } from "../utils/userSlice";

const EditProfile = ({ userInfo }) => {
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [age, setAge] = useState(userInfo?.age || "");
  const [gender, setGender] = useState(userInfo?.gender || "");
  const [about, setAbout] = useState(userInfo?.about || "");
  const [photoUrl, setPhotoUrl] = useState(userInfo.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const saveProfile = async () => {
    try {
      let obj = {
        firstName,
        lastName,
        age,
        gender,
        about,
        photoUrl,
      };
      const filteredObj = Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== "")
      );
      console.log(filteredObj);
      const res = await axios.patch(`${BASE_URL}/profile/edit`, filteredObj, {
        withCredentials: true,
      });
      dispatch(addUserInfo(res?.data?.data || null));
      setError("");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };
  return (
    <div>
      {showToast && (
        <div className="toast toast-top toast-center mt-13 z-10">
          <div className="alert alert-success">
            <span>Profile Saved Sucessfully.</span>
          </div>
        </div>
      )}
      <div className="flex gap-4">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title flex justify-center">Edit Profile</h2>
            <div className="flex flex-col items-center mb-2">
              <fieldset className="fieldset w-[90%] mb-2">
                <legend className="fieldset-legend">First Name: </legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset w-[90%] mb-2">
                <legend className="fieldset-legend">Last Name: </legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset w-[90%] mb-2">
                <legend className="fieldset-legend">PhotoUrl: </legend>
                <input
                  type="text"
                  className="input"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset w-[90%] mb-2">
                <legend className="fieldset-legend">Age: </legend>
                <input
                  type="text"
                  className="input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset w-[90%] mb-2">
                <legend className="fieldset-legend">Gender: </legend>
                <input
                  type="text"
                  className="input"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset w-[90%] mb-2">
                <legend className="fieldset-legend">About: </legend>
                <input
                  type="text"
                  className="input"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
                <p className="fieldset-label text-red-600">{error}</p>
              </fieldset>
            </div>
            <div className="card-actions justify-center" onClick={saveProfile}>
              <button className="btn btn-primary px-10">Save Profile</button>
            </div>
          </div>
        </div>
        <UserCard
          userData={{ about, firstName, lastName, photoUrl, age, gender }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
