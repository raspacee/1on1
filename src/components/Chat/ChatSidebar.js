import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const ChatSidebar = (props) => {
  const { users, value, handleChange } = props;

  const renderedTabs = users.map((user) => (
    <Tab
      key={user.userID}
      className="chat-side-bar-item"
      label={user.username}
    />
  ));

  return (
    <Box>
      <Tabs
        className="chat-sidebar"
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        orientation="vertical"
      >
        {renderedTabs}
      </Tabs>
    </Box>
  );
};

export default ChatSidebar;
