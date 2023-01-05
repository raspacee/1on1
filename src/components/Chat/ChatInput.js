import Button from "@mui/material/Button";
import { useState } from "react";

const ChatInput = (props) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    props.sendMessage(message);
    setMessage("");
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        className="chat-input-field"
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        onClick={handleSend}
        className="chat-input-button"
        variant="outlined"
      >
        Send
      </Button>
    </div>
  );
};

export default ChatInput;
