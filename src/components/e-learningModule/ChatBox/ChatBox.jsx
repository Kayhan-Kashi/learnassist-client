import React, { useRef, useState, useEffect, forwardRef } from "react";
import { GetChatDialogues, sendPrompt } from "../../../services/LLMService.js";
import { useSelector } from "react-redux";

const ChatBox = forwardRef(
  ({ helpNeeded, setHelpNeeded, courseVideoWatchId }, ref) => {
    const [userPrompt, setUserPrompt] = useState("");
    const [conversation, setConversation] = useState([]);
    const [isAnyDialogueAdded, setIsAnyDialogueAdded] = useState(false);
    const [loading, setLoading] = useState(false);
    const textAreaRef = useRef(null);
    const lastMessageRef = useRef(null);
    const currentTime = useSelector(
      (state) => state.elearningState.currentVideoHelpMeTime
    );
    const courseVideoWatchIdRef = ref;

    useEffect(() => {
      if (helpNeeded) {
        setIsAnyDialogueAdded(true);
        setUserPrompt(`دقیقه ${currentTime} ویدیو آموزشی را بیشتر توضیح بده`);
      }
    }, [helpNeeded, currentTime]);

    useEffect(() => {
      if (courseVideoWatchId) {
        GetChatDialogues({ courseVideoWatchId }).then((res) => {
          const data = res.data;
          const formattedData = data.flatMap((item) => [
            { role: "user", content: item.prompt },
            { role: "assistant", content: item.answer },
          ]);
          // setConversation((prev) => [...prev, ...formattedData]);
          setConversation(formattedData);
        });
      }
    }, [courseVideoWatchId]);

    useEffect(() => {
      if (helpNeeded && userPrompt.trim()) {
        handleSendMessage();
      }
    }, [helpNeeded, userPrompt]);

    const handleSendMessage = async () => {
      if (!userPrompt.trim()) return;
      setIsAnyDialogueAdded(true);
      setConversation((prev) => [
        ...prev,
        { role: "user", content: userPrompt },
      ]);
      setLoading(true);
      try {
        const response = await sendPrompt({
          prompt: userPrompt,
          helpNeeded,
          courseVideoWatchId,
          // courseVideoWatchId: courseVideoWatchIdRef.current,
        });
        setConversation((prev) => [
          ...prev,
          { role: "assistant", content: response.data.answer },
        ]);
        setUserPrompt("");
      } catch (error) {
        setConversation((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Error fetching response from ChatGPT.",
          },
        ]);
      } finally {
        setLoading(false);
        setHelpNeeded(false);
      }
    };

    useEffect(() => {
      if (lastMessageRef.current && isAnyDialogueAdded) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [conversation]);

    return (
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg flex flex-col">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            دستیار آموزشی
          </h1>
        </div>
        <div className="flex items-start space-x-2 mb-4">
          <button
            onClick={handleSendMessage}
            disabled={!courseVideoWatchIdRef.current || loading}
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
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="سوالت رو اینجا بپرس ..."
            rows="1"
            dir="rtl"
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none overflow-hidden"
            style={{ maxHeight: "150px" }}
          />
        </div>
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
  }
);

export default ChatBox;
