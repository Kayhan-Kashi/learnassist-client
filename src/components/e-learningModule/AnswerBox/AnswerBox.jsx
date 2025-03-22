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
        }, 3000);
      } else if (feedback.includes("مشکل")) {
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        onAnswerIncorrect();
      }
      setAnswer(feedback);
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: -200, opacity: 0 }} // Start position (above)
      animate={{ y: 0, opacity: 1 }} // End position (normal)
      exit={{ y: -100, opacity: 0 }} // Exit animation (go up)
      transition={{ duration: 1, ease: "easeOut" }}
      className="answer-box absolute left-0 sm:left-80 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-4 rounded-lg w-96 z-50"
      style={{ zIndex: 9999 }} // Ensure it's above other elements
    >
      <textarea
        className="w-full border rounded p-2 focus:outline-none text-right"
        rows="3"
        placeholder={"جواب را اینجا بنویس"}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button
        className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {!isLoading ? "ارسال" : "... در حال بررسی جواب "}
      </button>
      <button
        className="mt-2 w-full bg-yellow-300 text-black py-2 rounded hover:bg-yellow-700 "
        onClick={() => onClose()}
      >
        جواب را نمی دانم
      </button>
    </motion.div>
  );
};

export default AnswerBox;
