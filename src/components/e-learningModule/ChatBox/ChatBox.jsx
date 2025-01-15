import React, { useRef, useState, useEffect, memo } from "react";
import { callChatGPT, sendPrompt } from "../../../services/chatGPTService.js";
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";

const ChatBox = memo(({ helpNeeded, setHelpNeeded }) => {
  const [userMessage, setUserMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const textAreaRef = useRef(null);
  const lastMessageRef = useRef(null);
  const currentTime = useSelector((state) => state.elearningState.timeClicked);

  useEffect(() => {
    if (helpNeeded) {
      setUserMessage("این دقیقه را بیشتر توضیح بده");
      //alert(userMessage);
      handleSendMessage();
    }
  }, [helpNeeded]);

  const handleSendMessage = async () => {
    if (helpNeeded) {
      alert(userMessage);
      alert(helpNeeded);
    }
    if (!userMessage.trim()) return;

    const userMessageObj = { role: "user", content: userMessage };
    setConversation((prev) => [...prev, userMessageObj]);
    if (!helpNeeded) setUserMessage("");
    setLoading(true);

    try {
      const messages = [
        { role: "system", content: "You are a helpful assistant." },
        ...conversation,
        userMessageObj,
      ];
      const response = await sendPrompt(userMessage, helpNeeded);
      const assistantMessageObj = {
        role: "assistant",
        content: response.answer,
      };

      setConversation((prev) => [...prev, assistantMessageObj]);
    } catch (error) {
      const errorMessageObj = {
        role: "assistant",
        content: "Error fetching response from ChatGPT.",
      };
      setConversation((prev) => [...prev, errorMessageObj]);
    } finally {
      setLoading(false);
      setHelpNeeded(false);
    }
  };

  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
    autoResizeTextarea();
  };

  const autoResizeTextarea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    // Scroll to the last message when the conversation updates
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg flex flex-col">
      {/* Chat Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          دستیار آموزشی
        </h1>
      </div>

      {/* Message Input Section */}
      <div className="flex items-start space-x-2 mb-4">
        <button
          onClick={handleSendMessage}
          disabled={loading}
          className={`px-4 py-2 font-semibold rounded-lg ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-blue-600 transition-colors"
          }`}
        >
          {loading ? "..." : "ارسال"}
        </button>

        <textarea
          ref={textAreaRef}
          value={userMessage}
          onChange={handleInputChange}
          placeholder="سوالت رو اینجا بپرس ..."
          rows="1"
          dir="rtl"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none overflow-hidden"
          style={{ maxHeight: "150px" }}
        />
      </div>

      {/* Chat Conversation */}
      <div className="space-y-4">
        {conversation.map((msg, index) => (
          <div
            key={index}
            ref={index === conversation.length - 1 ? lastMessageRef : null}
            className={`flex ${
              msg.role === "user" ? "justify-start" : "justify-end"
            }`}
            dir="rtl"
          >
            <div
              className={`max-w-[75%] p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ChatBox;
