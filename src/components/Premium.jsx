import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const verifyPremiumUser = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/premium/verify`, {
        withCredentials: true,
      });
      if (res.data.isPremium) {
        setIsPremiumUser(true);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const handleBuyClick = async (membershipType) => {
    try {
      const order = await axios.post(
        `${BASE_URL}/createOrder`,
        { notes: { membershipType } },
        { withCredentials: true }
      );
      //it should open the razorpay dialogbox
      const {
        keyId,
        amount,
        currency,
        orderId,
        notes: { firstName, lastName, emailId },
      } = order.data;
      const options = {
        key: keyId,
        amount,
        currency,
        name: "Dev Tinder",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: firstName + " " + lastName,
          email: emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: verifyPremiumUser,
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
    }
  };

  if (isPremiumUser)
    return (
      <h2 className="text-center font-bold text-4xl my-10">
        You are Already a Premium User!
      </h2>
    );
  if (loading)
    return <h2 className="text-center font-bold text-4xl my-10">Loading...</h2>;
  return (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-60 grow place-items-center">
          <h1 className="font-bold text-3xl text-[#C0C0C0]">
            Silver Membership
          </h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - 100 connection requests per day</li>
            <li> - Blue Tick</li>
            <li> - 3 months</li>
          </ul>
          <button
            className="btn btn-primary"
            onClick={() => handleBuyClick("silver")}
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-60 grow place-items-center">
          <h1 className="font-bold text-3xl text-[#FFD700]">Gold Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - Infinity connection requests per day</li>
            <li> - Blue Tick</li>
            <li> - 6 Months</li>
          </ul>
          <button
            className="btn btn-secondary"
            onClick={() => handleBuyClick("gold")}
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
