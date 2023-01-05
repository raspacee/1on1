import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import _ from "lodash";

import ChatInput from "./ChatInput";
import ChatSidebar from "./ChatSidebar";
import "./Chat.css";
import ChatMessages from "./ChatMessages";

const DUMMY_CHAT = [
  {
    message: "Jamming at joe's garage",
    timestamp: "10:34",
  },
  {
    message: "Eric get the bombs",
    timestamp: "11:11",
  },
  {
    message: "Jamming asst joe's garage",
    timestamp: "10:34",
  },
];

const DUMMY_CHAT2 = [
  {
    user: "Bijay Khapung",
    message: "How are you doing MR. Price?",
    timestamp: "10:34",
  },
  {
    user: "Bijay Khapung",
    message: "I hope you remember General Sheperd",
    timestamp: "11:11",
  },
];

let socket;

function Chat() {
  const [username, setUsername] = useState(
    _.sample([
      "Bijay Khapung",
      "Mountain Dew",
      "A",
      "B",
      "Malcolm",
      "Dido",
      "Abba",
    ])
  );
  const [users, setUsers] = useState([
    { userID: "test", username: "test", chat: [] },
  ]);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    socket = io("http://localhost:4000", {
      auth: {
        username: username,
      },
    });

    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        alert(err.message);
      }
    });

    socket.on("users", (clients) => {
      setUsers((oldUsers) => {
        const filteredUsers = clients
          .map((client) => {
            return {
              userID: client.userID,
              username: client.username,
              chat: [],
            };
          })
          .filter((client) => client.username !== username);
        return filteredUsers;
      });
    });

    socket.on("user connected", (user) => {
      setUsers((oldUsers) => {
        const updatedUsers = [...oldUsers];
        updatedUsers.push({ ...user, chat: [] });
        return updatedUsers;
      });
    });

    socket.on("private message", ({ message, from }) => {
      setUsers((users) => {
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          console.log(user);
          if (user.userID == from) {
            console.log(user);
            const index = users.indexOf(user);
            addMessage(message, index, false);
          }
        }
        return users;
      });
    });
    socket.on("message", (msg) => {
      addMessage(msg);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
    };
  }, []);

  const tabHandleChange = (event, value) => {
    setTabIndex(value);
  };

  const addMessage = (message, chatIndex = tabIndex, fromSelf = false) => {
    // let newChat = _.cloneDeep(chats);
    setUsers((users) => {
      let newUsers = [...users];
      const newMessage = {
        message,
        fromSelf,
        timestamp: Date.now().toLocaleString(),
      };
      newUsers[chatIndex].chat.push(newMessage);
      return newUsers;
    });
  };

  const sendMessage = (message) => {
    socket.emit("private message", { message, to: users[tabIndex].userID });
    addMessage(message, tabIndex, true);
  };

  return (
    <>
      <div className="chat-container">
        <ChatSidebar
          users={users}
          value={tabIndex}
          handleChange={tabHandleChange}
        />
        <ChatMessages messages={users[tabIndex].chat} />
      </div>
      <ChatInput sendMessage={sendMessage} />
    </>
  );
}

export default Chat;
