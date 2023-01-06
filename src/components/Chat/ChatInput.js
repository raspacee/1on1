import Button from "@mui/material/Button";
import { useState } from "react";

const ChatInput = (props) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    props.sendMessage(message);
    setMessage("");
  };

  return (
    <div className="chat-message clearfix">
      <textarea
        name="message-to-send"
        id="message-to-send"
        placeholder="Type your message"
        rows="3"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <button onClick={handleSend} id="btn">
        Send
      </button>
    </div>
  );
};

export default ChatInput;
