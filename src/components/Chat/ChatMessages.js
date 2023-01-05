import ChatMessage from "./ChatMessage";

const ChatMessages = (props) => {
  const renderedMessages = props.messages.map((message, idx) => (
    <ChatMessage
      key={idx}
      text={message.message}
      timestamp={message.timestamp}
    />
  ));

  return <div className="chat-messages">{renderedMessages}</div>;
};

export default ChatMessages;
