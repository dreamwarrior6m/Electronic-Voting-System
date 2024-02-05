"use client";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../Config";
import MessageParser from "../MessageParser";
import ActionProvider from "../ActionProvider";
import "../Bot.css";


const Chat = () => {
  return (
    <div className="">
      <div className="App">
        <Chatbot
          headerText='Chatbot'
          placeholderText='Enter Your Question'
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
    </div>
  );
};

export default Chat;
