import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CFormCheck,
} from "@coreui/react";
import {
  createCourseAssessment,
  getCourseAssessment,
} from "../../../services/assessment.js";

export default function UserCourseAssessment() {
  const { courseAssessmentId } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isButtonFocused, setIsButtonFocused] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCourseAssessment({ courseAssessmentId })
      .then((response) => {
        setQuestions(response.data.questions || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("مشکلی در دریافت اطلاعات رخ داده است.");
        setLoading(false);
      });
  }, [courseAssessmentId]);

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerId });
  };

  const handleSubmit = async () => {
    // Validate: Ensure all questions have answers
    if (Object.keys(selectedAnswers).length !== questions.length) {
      alert("لطفاً تمامی سوالات را پاسخ دهید.");
      return;
    }

    // Ask for confirmation before sending
    const isConfirmed = window.confirm(
      "آیا مطمئن هستید که می‌خواهید آزمون را ارسال کنید؟"
    );
    if (!isConfirmed) return;

    // Format the payload to send
    const requestBody = {
      CourseAssessmentId: courseAssessmentId,
      QuestionAnswer: Object.keys(selectedAnswers).reduce((acc, questionId) => {
        const answerId = selectedAnswers[questionId];
        acc[questionId] = {
          AnswerId: answerId,
          Value: null, // you can set Value to null or handle if there's a value for the answer
        };
        return acc;
      }, {}),
    };

    createCourseAssessment(requestBody)
      .then((res) => {
        console.log("Submitted Successfully:", res.data);
        alert("آزمون با موفقیت ارسال شد.");
      })
      .catch((error) => {
        console.error("Error submitting assessment:", error);
        alert("مشکلی در ارسال اطلاعات رخ داده است.");
      });
  };

  const handleFocus = () => {
    setIsButtonFocused(true);
  };

  const handleBlur = () => {
    setIsButtonFocused(false);
  };

  if (loading) {
    return (
      <h2 className="text-xl font-bold text-right text-blue-600">
        در حال بارگذاری...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className="text-xl font-bold text-right text-red-600">{error}</h2>
    );
  }

  if (!questions.length) {
    return (
      <h2 className="text-xl font-bold text-right text-gray-600">
        سوالی یافت نشد.
      </h2>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-100 rounded-lg shadow-lg text-right rtl">
      <h2 className="text-xl font-bold text-right mb-4 text-blue-600">
        آزمون درس آمار
      </h2>
      {questions.map((question, index) => (
        <CCard
          key={question.questionId}
          className="mb-4 border border-blue-400 shadow-md max-w-5xl mx-auto"
        >
          <CCardHeader className="bg-blue-600 text-black text-lg font-bold p-3 rounded-t-lg">
            سؤال {index + 1}: {question.questionTitle}
          </CCardHeader>
          <CCardBody className="p-4 bg-white rounded-b-lg">
            {question.answers.map((a) => (
              <div key={a.answerId} className="d-flex align-items-center mb-2">
                <label
                  htmlFor={`q${question.questionId}a${a.answerId}`}
                  className="cursor-pointer flex-grow text-right"
                >
                  {a.answerTitle}
                </label>
                <CFormCheck
                  type="radio"
                  name={`question${question.questionId}`}
                  id={`q${question.questionId}a${a.answerId}`}
                  value={a.answerId}
                  checked={selectedAnswers[question.questionId] === a.answerId}
                  onChange={() =>
                    handleAnswerSelect(question.questionId, a.answerId)
                  }
                  style={{ marginLeft: "1rem" }}
                />
              </div>
            ))}
          </CCardBody>
        </CCard>
      ))}
      <div className="text-center mt-6">
        <CButton
          className="transition-transform duration-300 ease-in-out transform focus:scale-110 bg-blue-600 text-white"
          onClick={handleSubmit}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            backgroundColor: isButtonFocused ? "#1D4ED8" : "#2563EB", // Change color on focus
            color: "white",
          }}
        >
          ارسال
        </CButton>
      </div>
    </div>
  );
}
