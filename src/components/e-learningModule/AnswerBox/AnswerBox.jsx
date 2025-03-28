import { useState } from "react";
import { motion } from "framer-motion";

const AnswerBox = ({ onSubmit, onClose, question, onAnswerIncorrect }) => {
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (onSubmit) {
      setIsLoading(true);
      var feedback = await onSubmit(answer, question);
      if (feedback.includes("آفرین")) {
        setTimeout(() => {
          onClose();
        }, 5000);
      } else if (feedback.includes("مشکل")) {
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        onAnswerIncorrect();
        setTimeout(() => {
          setAnswer(""); // Clear the textarea after 2 seconds
        }, 3000);
      }
      setAnswer(feedback);
      setIsLoading(false);
    }
  };
  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-gray-100 pt-2 pb-2"
      style={{ zIndex: 9999 }} // Ensure it's above other elements
      initial={{ opacity: 0 }} // Start with zero opacity (invisible)
      animate={{ opacity: 1 }} // Animate to full opacity (visible)
      exit={{ opacity: 0 }} // Optional: animate to invisible when exiting
      transition={{ duration: 1 }} // Fade in over 1 second
    >
      <div className="flex flex-row">
        <textarea
          className="w-96 border rounded p-2 focus:outline-none text-right" // Set width to 96 for wider textarea
          rows="2"
          placeholder={"جواب را اینجا بنویس"}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onInput={(e) => setAnswer(e.target.value)} // This ensures the text updates smoothly
        />
      </div>

      <div className="flex flex-row w-96">
        <button
          className="mt-2 w-full bg-yellow-300 text-black py-2 rounded hover:bg-yellow-700 mr-2"
          onClick={() => onClose()}
        >
          جواب را نمی دانم
        </button>
        <button
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={handleSubmit}
          disabled={!answer.trim()} // Disable the button if answer is empty or contains only spaces
        >
          {!isLoading ? "ارسال" : "... در حال بررسی جواب "}
        </button>
      </div>
    </motion.div>
  );
};

export default AnswerBox;
