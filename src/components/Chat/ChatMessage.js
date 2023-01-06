import moment from "moment";

const ChatMessage = (props) => {
  return (
    <li className="clearfix">
      <div className={`message-data ${props.fromSelf ? "" : "align-right"}`}>
        <span className="message-data-time">
          {moment(props.time).fromNow()}
        </span>
        <span className="message-data-name">{props.fromUsername}</span>
        <i className="circle me"></i>
      </div>
      <div
        className={`message ${
          props.fromSelf ? "my-message" : "other-message float-right"
        }`}
      >
        {props.text}
      </div>
    </li>
  );
};

export default ChatMessage;
