import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeFeedInfo } from "../utils/feedSlice";
const UserCard = ({ userData, getFeed }) => {
  const { _id, about, firstName, lastName, photoUrl, age, gender } = userData;
  const feedData = useSelector((state) => state.feedSlice);
  const dispatch = useDispatch();
  const handleSendRequest = async (status, id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeedInfo(_id));
      if (feedData.length == 1) {
        getFeed();
      }
    } catch (err) {
      console.log("ERROR: ", err.message);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-lg">
      <figure>
        <img src={photoUrl} alt="photo" className="object-cover w-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <span>{age + " , " + gender}</span>}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
