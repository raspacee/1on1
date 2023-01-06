import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import _ from "lodash";

import ChatInput from "./ChatInput";
import ChatSidebar from "./ChatSidebar";
import "./ChatStyles.css";
import ChatMessages from "./ChatMessages";

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
  const [socketID, setSocketID] = useState("");
  const [users, setUsers] = useState([
    {
      userID: "test",
      username: "test",
      chat: [
        {
          username: "Bijay Khapung",
          message: "How are you doing MR. Price?",
          time: "1/6/2023, 2:06:22 PM",
          fromSelf: true,
        },
        {
          username: "Bijay Khapung",
          message: "I hope you remember General Sheperd",
          timestamp: "11:11",
          fromSelf: false,
        },
      ],
    },
    {
      userID: "jodie",
      username: "john doe",
      chat: [
        {
          username: "Jodie Foster",
          message: "lorem ipsum",
          timestamp: "10:34",
        },
        {
          username: "Bijay Khapung",
          message: "lorem ipsum 123",
          timestamp: "11:11",
        },
      ],
    },
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

    socket.on("connection info", (info) => {
      setSocketID(info.socketID);
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
        return oldUsers.concat(filteredUsers);
      });
    });

    socket.on("user connected", (user) => {
      setUsers((oldUsers) => {
        const updatedUsers = [...oldUsers];
        updatedUsers.push({ ...user, chat: [] });
        return updatedUsers;
      });
    });

    socket.on("private message", ({ message, from, fromUsername, time }) => {
      setUsers((users) => {
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          if (user.userID == from) {
            const index = users.indexOf(user);
            addMessage(message, from, fromUsername, time, index);
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

  const addMessage = (
    message,
    from,
    fromUsername,
    time,
    chatIndex = tabIndex
  ) => {
    setUsers((users) => {
      let newUsers = [...users];
      let fromSelf;
      fromSelf = from == socketID ? true : false;
      const newMessage = {
        message,
        fromSelf,
        fromUsername,
        time,
      };
      newUsers[chatIndex].chat.push(newMessage);
      return newUsers;
    });
  };

  const sendMessage = (message) => {
    const time = new Date().toLocaleString();
    socket.emit("private message", {
      message,
      to: users[tabIndex].userID,
      time,
    });
    addMessage(message, socketID, username, time, tabIndex);
  };

  return (
    <>
      <div className="chat-container clearfix">
        <ChatSidebar
          users={users}
          value={tabIndex}
          handleChange={tabHandleChange}
        />
        <ChatMessages
          sendMessage={sendMessage}
          messages={users[tabIndex].chat}
          username={users[tabIndex].username}
        />
      </div>
    </>
  );
}

export default Chat;
