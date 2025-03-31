import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();

  const user = useSelector((state) => state.userSlice);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = user?._id;

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });
      const chatMessages = chat?.data?.chat?.messages.map((item) => {
        return {
          firstName: item.senderId.firstName,
          lastName: item.senderId.lastName,
          senderId: item.senderId._id,
          text: item.text,
        };
      });
      setMessages(chatMessages);
      console.log(chatMessages, "::chatMessages");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);
  useEffect(() => {
    const socket = createSocketConnection();
    if (!userId) return;
    //As soon as the page loaded, the socket connection is made and joinchat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });
    socket.on("messageReceived", ({ firstName, lastName, text, senderId }) => {
      console.log(firstName + " :  " + text);
      setMessages((prev) => [...prev, { firstName, lastName, text, senderId }]);
    });
    return () => {
      //to disconnect the socket
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const handleSendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600  m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600 font-bold text-xl">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => (
          <div
            className={
              msg.senderId === user._id ? "chat chat-end" : "chat chat-start"
            }
            key={index}
          >
            <div className="chat-header">
              {msg.firstName + " " + (msg?.lastName || "")}
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">{msg.text}</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        ))}
      </div>
      <div className="p-5 border-t border-gray-600 flex gap-2 items-center">
        <input
          type="text"
          placeholder="Type here"
          className="flex-1 input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
