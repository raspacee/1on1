const ChatSidebar = (props) => {
  const { users, value, handleChange } = props;

  const renderedUsers = users.map((user, index) => {
    return (
      <li
        key={user.userID}
        className="clearfix"
        onClick={(e) => {
          props.handleChange(e, index);
        }}
      >
        <div className="about">
          <div className="name">{user.username}</div>
          <div className="status">
            <i className="online"></i>online
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="people-list" id="people-list">
      <div className="search">
        <input type="text" placeholder="search here" />
        <i className="fa fa-search"></i>
      </div>
      <ul className="list">{renderedUsers}</ul>
    </div>
  );
};

export default ChatSidebar;
