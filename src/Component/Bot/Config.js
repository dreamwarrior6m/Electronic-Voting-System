import { createChatBotMessage } from "react-chatbot-kit";
const botName = "Bot";

const config = {
  botName: botName,
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#4F46E5",
    },
    chatButton: {
      backgroundColor: " #4F46E5",
    },
  },
};

export default config;
