import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  checkUserAssessment,
} from "../../../services/assessmentService.js";

import question1 from "../../../assets/questions/question1.jpg";

export default function UserCourseAssessment() {
  const { courseAssessmentId } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [isButtonFocused, setIsButtonFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    // Check if the user has already completed the assessment
    checkUserAssessment({ courseAssessmentId })
      .then((response) => {
        if (response.data.courseUserAssessmentId) {
          setAssessmentCompleted(true);
        } else {
          return getCourseAssessment({ courseAssessmentId });
        }
      })
      .then((response) => {
        if (!assessmentCompleted) {
          setQuestions(response?.data?.questions || []);
        }
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
    if (Object.keys(selectedAnswers).length !== questions.length) {
      alert("لطفاً تمامی سوالات را پاسخ دهید.");
      return;
    }

    const isConfirmed = window.confirm(
      "آیا مطمئن هستید که می‌خواهید آزمون را ارسال کنید؟"
    );
    if (!isConfirmed) return;

    const requestBody = {
      CourseAssessmentId: courseAssessmentId,
      QuestionAnswer: Object.keys(selectedAnswers).reduce((acc, questionId) => {
        acc[questionId] = {
          AnswerId: selectedAnswers[questionId],
          Value: null,
        };
        return acc;
      }, {}),
    };

    createCourseAssessment(requestBody)
      .then((res) => {
        console.log("Submitted Successfully:", res.data);
        alert("آزمون با موفقیت ارسال شد.");
        navigate(
          "/elearning/watch-course/52ac170f-3b38-486b-aba3-f63b20d44ea9"
        );
      })
      .catch((error) => {
        console.error("Error submitting assessment:", error);
        alert("مشکلی در ارسال اطلاعات رخ داده است.");
      });
  };

  if (loading) {
    return (
      <h2 className="text-xl font-bold text-center text-blue-600">
        ...در حال بارگذاری
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className="text-xl font-bold text-right text-red-600">{error}</h2>
    );
  }

  if (assessmentCompleted) {
    return (
      <h2 className="text-xl font-bold text-center p-4 border-cyan-600 border-2 text-green-600">
        شما قبلاً این آزمون را تکمیل کرده‌اید
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
            {question.picturePath && (
              <img src={`/questions/${question.picturePath}.jpg`} />
            )}
          </CCardBody>
        </CCard>
      ))}
      <div className="text-center mt-6">
        <CButton
          className="transition-transform duration-300 ease-in-out transform focus:scale-110 bg-blue-600 text-white"
          onClick={handleSubmit}
          onFocus={() => setIsButtonFocused(true)}
          onBlur={() => setIsButtonFocused(false)}
          style={{
            backgroundColor: isButtonFocused ? "#1D4ED8" : "#2563EB",
            color: "white",
          }}
        >
          ارسال
        </CButton>
      </div>
    </div>
  );
}
