const ChatMessage = (props) => {
  return (
    <div className="chat-message">
      <div className="chat-message-text">{props.text}</div>
      <div className="chat-message-timestamp">{props.timestamp} PM</div>
    </div>
  );
};

export default ChatMessage;
