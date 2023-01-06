import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const ChatMessages = (props) => {
  const renderedMessages = props.messages.map((message, idx) => (
    <ChatMessage
      key={idx}
      text={message.message}
      time={message.time}
      fromSelf={message.fromSelf}
      fromUsername={message.fromUsername}
    />
  ));

  return (
    <div className="chat">
      <div className="chat-header clearfix">
        <div className="chat-about">
          <div className="chat-with">Chat with {props.username}</div>
          <div className="chat-num-messages">Messages</div>
        </div>
        <i className="fa fa-star"></i>
      </div>

      <div className="chat-history">
        <ul>{renderedMessages}</ul>
      </div>

      <ChatInput sendMessage={props.sendMessage} />
    </div>
  );
};

export default ChatMessages;
