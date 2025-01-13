import React, { useRef, useState } from "react";
import { callChatGPT } from "../../../services/chatGPTService.js";
import { useSelector } from "react-redux";

const ChatBox = () => {
  const [userMessage, setUserMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const textAreaRef = useRef(null);
  const currentTime = useSelector((state) => {
    alert("time is :");
    alert(JSON.stringify(state));
    return state.elearningState.timeClicked;
  });

  const handleSendMessage = async () => {
    if (!userMessage.trim()) {
      return;
    }

    const userMessageObj = { role: "user", content: userMessage };
    setConversation((prev) => [...prev, userMessageObj]);
    setUserMessage("");
    setLoading(true);

    try {
      const messages = [
        { role: "system", content: "You are a helpful assistant." },
        ...conversation,
        userMessageObj,
      ];
      alert(JSON.stringify(currentTime));
      const response = await callChatGPT(messages);
      const assistantMessageObj = {
        role: "assistant",
        content: response.choices[0].message.content,
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
    }
  };

  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
    autoResizeTextarea();
  };

  const autoResizeTextarea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Adjust to content
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 mb-4 bg-white rounded-2xl shadow-lg flex flex-col h-[80vh]">
      {/* Chat Header with Title */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          دستیار آموزشی
        </h1>
      </div>

      {/* Message Input Section - Placed at the top */}
      <div className="flex items-start space-x-2 mb-8 ">
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
          dir="rtl" // Set the direction to right-to-left
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none overflow-hidden"
          style={{ maxHeight: "150px" }} // Optional: Limit maximum height
        />
      </div>

      {/* Chat Conversation - Placed at the bottom */}
      <div className="flex-1 flex flex-col overflow-y-auto border-t border-gray-300 pt-4">
        <div className="flex-1 space-y-4">
          {conversation.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-start" : "justify-end"
              }`}
              dir="rtl" // Apply right-to-left direction for the content
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
    </div>
  );
};

export default ChatBox;
