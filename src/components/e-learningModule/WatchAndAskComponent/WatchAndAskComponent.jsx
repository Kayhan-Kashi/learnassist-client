import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import videojs from "video.js";
import ChatBox from "../ChatBox/ChatBox";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import {
  setHelpMeTime,
  setCourseVideoSessionTime,
  setCourseVideoWatchData,
} from "../../../redux/slices/elearningSlice.js";
import {
  createCourseVideoSession,
  startWatchCourseVideo,
  updateCourseVideoSession,
  getCourseVideoById,
} from "../../../services/courseService.js";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUserInfo,
  is_User_course_editor,
  is_control_group,
} from "../../../services/authService.js";
import loadingGif from "../../../assets/loadings/loading2.gif";
import AnswerBox from "../AnswerBox/AnswerBox.jsx";
import { sendAnswer } from "../../../services/LLMService.js";

const userInfo = getUserInfo();

const WatchAndAskComponent = () => {
  const videoTitle = "مبحث آمار مقدماتی : جلسه اول";
  const playerRef = useRef(null);
  const playerOperationRef = useRef(null);
  const currentTimeRef = useRef({ minutes: 0, seconds: 0 });
  const currentTimeFormattedRef = useRef("0:0");
  const [helpNeeded, setHelpNeeded] = useState(false);
  const timerRef = useRef({ timeElapsed: 0, intervalId: null });
  const timeDisplayRef = useRef(null);
  const navigate = useNavigate();
  const [isCourseEditor, setIsCourseEditor] = useState(null);
  const [isControlGroup, setIsControlGroup] = useState(null);

  const [questionToShow, setQuestionToShow] = useState(null);

  const dispatch = useDispatch();
  //======== Getting courseVideoId from URL and call webAPI for Starting Watch ============================
  const { courseVideoId } = useParams();
  const courseVideoIdRef = useRef(null);
  const courseVideoWatchIdRef = useRef(null);
  const [courseVideoWatchId, setCourseVideoWatchId] = useState(null);

  useEffect(() => {
    const is_user_course_editor = is_User_course_editor();
    setIsCourseEditor(is_user_course_editor);
    const isControl = is_control_group();
    setIsControlGroup(isControl);
  }, []);

  // useEffect(() => {
  //   alert(is_user_course_editor);
  //   if (is_user_course_editor != null || is_user_course_editor != undefined) {
  //     setIsCourseEditor(is_user_course_editor);
  //   }
  // }, [is_user_course_editor]);

  const [courseVideoIdState, setCourseVideoId] = useState(null);

  const [showAnswerBox, setShowAnswerBox] = useState(false);

  const questionDataRef = useRef({
    "52ac170f-3b38-486b-aba3-f63b20d44ea9": [
      {
        questionNo: 1,
        numOfTry: 0,
        isAnswered: false,
        askingMinute: 2,
        isClosed: false,
      },
      {
        questionNo: 2,
        numOfTry: 0,
        isAnswered: false,
        askingMinute: 8,
        isClosed: false,
      },
    ],
    "f468bc34-d72c-4e3b-b478-4874832eea8a": [
      {
        questionNo: 1,
        numOfTry: 0,
        isAnswered: false,
        askingMinute: 13,
        isClosed: false,
      },
      {
        questionNo: 2,
        numOfTry: 0,
        isAnswered: false,
        askingMinute: 3,
        isClosed: false,
      },
    ],
  });

  useEffect(() => {
    courseVideoId &&
      startWatchCourseVideo({ courseVideoId })
        .then((res) => {
          dispatch(
            setCourseVideoWatchData({
              courseVideoId: courseVideoId,
              courseVideoWatchId: res.data.courseVideoWatchId,
            })
          );
          setCourseVideoWatchId(res.data.courseVideoWatchId);
          console.log(
            `courseVideoWatch started ${res.data.courseVideoWatchId}`
          );
        })
        .catch((err) => {
          console.log("course video can not be played");
        })
        .finally(() => {});
    setCourseVideoId(courseVideoId);
    courseVideoIdRef.current = courseVideoId;
  }, [courseVideoId]);

  //=============== CourseSessionWatchId handling =========================================================
  const courseSessionWatchIdRef = useRef(null);
  const [courseSessionWatchId, setCourseSessionWatchId] = useState(null);

  const courseVideoData = useSelector((state) => {
    const courseVideos = state.elearningState.courseVideos;
    if (courseVideos[courseVideoId]) {
      courseSessionWatchIdRef.current =
        courseVideos[courseVideoId].watchSessionId; // by updating courseSessionWatchIdRef here from redux store it's not null when revisiting page
    }

    return courseVideos && courseVideos[courseVideoId]
      ? courseVideos[courseVideoId]
      : null;
  });

  const courseVideoDataRef = useRef(courseVideoData);
  useEffect(() => {
    courseVideoDataRef.current = courseVideoData;
  }, [courseVideoData]);

  useEffect(() => {
    courseVideoWatchId && (courseVideoWatchIdRef.current = courseVideoWatchId);
  }, [courseVideoWatchId]);

  useEffect(() => {
    courseSessionWatchIdRef.current = courseSessionWatchId;
  }, [courseSessionWatchId]);

  const pageSecondsPassRef = useRef(0);
  const pageIntervalRef = useRef(null);
  useEffect(() => {
    pageIntervalRef.current = setInterval(() => {
      pageSecondsPassRef.current += 2;
    }, 2000);

    return () => clearInterval(pageIntervalRef.current);
  });

  const intervalIdRef = useRef(null);

  const isPlayingRef = useRef(false);
  const createUpdateWatchSessionHandler = () => {
    intervalIdRef.current = setInterval(() => {
      if (!courseVideoWatchIdRef || !isPlayingRef.current) {
        // if courseVideoWatchId is not fetched from API Or the player is paused the request wont be sent
        return;
      }
      if (!courseSessionWatchIdRef.current) {
        createCourseVideoSession({
          courseVideoWatchId: courseVideoWatchIdRef.current,
          watchDurationInSeconds: pageSecondsPassRef.current,
          lastMomentSeen: currentTimeFormattedRef.current,
        })
          .then((res) => {
            console.log(
              `createCourseVideoSession : ${JSON.stringify(res.data)}`
            );
            dispatch(
              setCourseVideoSessionTime({
                courseVideoId: courseVideoId,
                lastMomentSeen: currentTimeFormattedRef.current,
                watchSessionId: res.data.courseVideoWatchSessionId,
              })
            );
            setCourseSessionWatchId(res.data.courseVideoWatchSessionId);
          })
          .catch((err) => {
            alert(err.message);
          })
          .finally(() => {});
      } else {
        updateCourseVideoSession({
          courseVideoWatchId: courseVideoWatchIdRef.current,
          watchDurationInSeconds: pageSecondsPassRef.current,
          lastMomentSeen: currentTimeFormattedRef.current,
          courseSessionWatchId: courseSessionWatchIdRef.current,
        })
          .then((res) => {
            console.log(
              `updateCourseVideoSession : ${JSON.stringify(res.data)}`
            );
            dispatch(
              setCourseVideoSessionTime({
                courseVideoId: courseVideoId,
                lastMomentSeen: currentTimeFormattedRef.current,
                watchSessionId: res.data.courseVideoWatchSessionId,
              })
            );
          })
          .catch((err) => {})
          .finally(() => {});
      }
    }, 20000);
  };

  // === Interval and player disposing ==============================
  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
        // if (playerRef.current) {
        //   playerRef.current.dispose();
        //   playerRef.current = null;
        //   console.log("player disposed");

        // }
        // playerRef.current.dispose();
        // playerRef.current = null;
        // console.log("player disposed");
        // alert("player disposed");
      }
    };
  }, [navigate]);
  //=================================================================

  const [courseVideoInfo, setCourseVideoInfo] = useState(null);
  useEffect(() => {
    getCourseVideoById({ courseVideoId }).then((res) => {
      setCourseVideoInfo(res.data);
    });
  }, [courseVideoId]);

  const videoJsOptions = useMemo(
    () => ({
      controls: true,
      // controlBar: {
      //   remainingTimeDisplay: true,
      // },
      responsive: true,
      autoplay: true,
      fluid: true,
      sources: [
        {
          //src: "/sample_video.mp4",
          src: courseVideoInfo
            ? !isControlGroup
              ? courseVideoInfo.path
              : "/control_group_" +
                courseVideoInfo.path.substr(1, courseVideoInfo.path.length)
            : "",
          type: "video/mp4",
        },
      ],
    }),
    [courseVideoInfo]
  );

  const handlePlayerReady = useCallback((player) => {
    if (!player) return; // Ensure player is not null
    playerRef.current = player;

    // Handle player events if needed
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  }, []);

  const handleTimeUpdate = useCallback((currentTime) => {
    // Store the current time in the ref
    currentTimeRef.current = currentTime;
    currentTimeFormattedRef.current = `${currentTimeRef.current.minutes}:${currentTimeRef.current.seconds}`;
    //console.log(courseVideoIdRef.current);
    const questionsArray = questionDataRef.current[courseVideoIdRef.current];
    if (questionsArray == undefined) {
      setShowAnswerBox(false);
    }
    if (questionsArray) {
      const matchingQuestion = questionsArray.find(
        (q) =>
          (q.askingMinute === currentTimeRef.current.minutes ||
            q.askingMinute + 1 === currentTimeRef.current.minutes) &&
          q.askingMinute + 1 <= q.isAnswered === false &&
          !q.isClosed &&
          q.numOfTry < 3
      );

      // console.log(JSON.stringify(questionsArray));

      if (matchingQuestion) {
        setQuestionToShow(matchingQuestion);
        setShowAnswerBox(true);
      } else {
        setQuestionToShow(null);
        setShowAnswerBox(false);
      }
    }

    // if (currentTimeRef.current.minutes === 8) {
    //   setQuestionNo(4);
    //   console.log(currentTimeRef.current.minutes);
    //   setShowAnswerBox(true);
    // }

    // Manually update the time display without causing a re-render
    if (timeDisplayRef.current) {
      timeDisplayRef.current.textContent = `${currentTime.minutes}:${
        currentTime.seconds < 10
          ? `0${currentTime.seconds}`
          : currentTime.seconds
      }`;
      //console.log(JSON.stringify(currentTime.seconds));
    }
  }, []);

  const handleHelpMeButtonClick = useCallback(() => {
    setHelpNeeded(true);
    document.getElementById("chat-box-section").scrollIntoView({
      behavior: "smooth",
    });
    dispatch(
      setHelpMeTime({
        courseVideoId,
        helpMeTime: currentTimeFormattedRef.current,
      })
    );
    playerOperationRef.current.pause();
  }, [dispatch, currentTimeRef, setHelpNeeded]);

  const handleAskButtonClick = () => {
    document.getElementById("chat-box-section").scrollIntoView({
      behavior: "smooth",
    });
    console.log(JSON.stringify(currentTimeRef.current));
  };

  const handlePromptEngineeringButtonClick = () => {
    navigate(`/elearning/prompt-engineering/${courseVideoId}`);
  };

  const handleUpdateQuestionCloseState = useCallback((questionNo) => {
    questionDataRef.current[courseVideoId] = questionDataRef.current[
      courseVideoId
    ].map((q) => (q.questionNo === questionNo ? { ...q, isClosed: true } : q));
    setShowAnswerBox(false);
  }, []);

  const handleUpdateQuestionTryState = useCallback((questionNo) => {
    questionDataRef.current[courseVideoId] = questionDataRef.current[
      courseVideoId
    ].map((q) =>
      q.questionNo === questionNo ? { ...q, numOfTry: q.numOfTry + 1 } : q
    );
    setShowAnswerBox(false);
  }, []);

  const handleGetAnswer = async (answer, question) => {
    try {
      const response = await sendAnswer({
        prompt: answer,
        helpNeeded,
        courseVideoWatchId,
        question,
        // courseVideoWatchId: courseVideoWatchIdRef.current,
      });
      return response.data.answer;
    } catch {
      return "مشکل در ارتباط با سرور";
    }
  };

  if (!courseVideoInfo) {
    return (
      <h2 className="text-xl font-bold text-center text-blue-600">
        ...در حال بارگذاری
      </h2>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="video-width">
          <h2 className="text-center pb-3 ">
            {courseVideoInfo ? courseVideoInfo.title : "جلسه"}
          </h2>
          {courseVideoInfo && (
            <VideoPlayer
              options={videoJsOptions}
              onReady={handlePlayerReady}
              onTimeUpdate={handleTimeUpdate}
              ref={{ playerOperationRef, isPlayingRef }}
              onPlay={createUpdateWatchSessionHandler}
            />
          )}
          {!isControlGroup && (
            <AnimatePresence>
              {showAnswerBox && questionToShow && (
                <AnswerBox
                  onSubmit={handleGetAnswer}
                  question={questionToShow}
                  //onClose={(q) => {}}
                  onClose={() =>
                    handleUpdateQuestionCloseState(questionToShow.questionNo)
                  }
                  onAnswerIncorrect={() =>
                    handleUpdateQuestionTryState(questionToShow.questionNo)
                  }
                />
              )}
            </AnimatePresence>
          )}
        </div>
        <div className="flex flex-row mt-10">
          {!isControlGroup && (
            <button
              onClick={handleHelpMeButtonClick}
              disabled={!courseVideoWatchId}
              className="transform text-sm sm:text-lg p-2 -translate-y-1/2 bg-green-400 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              کمکم کن
            </button>
          )}
          {!isControlGroup && (
            <button
              onClick={handleAskButtonClick}
              className="transform text-sm sm:text-lg ml-5 p-2 -translate-y-1/2 bg-yellow-400 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              سوال دارم
            </button>
          )}
          <button
            onClick={handlePromptEngineeringButtonClick}
            style={{
              display: isCourseEditor ? "" : "none",
            }}
            className="transform text-sm sm:text-lg ml-5 p-2 -translate-y-1/2 bg-blue-800 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            مهندسی پرسش ویدیو آموزشی
          </button>
        </div>
      </div>

      {/* Display Current Time Beneath the Video */}
      {/* <div className="text-center mt-4">
        <span ref={timeDisplayRef} className="text-xl font-medium">
          0:00
        </span>
      </div> */}

      <div id="chat-box-section">
        {!isControlGroup && (
          <ChatBox
            helpNeeded={helpNeeded}
            setHelpNeeded={setHelpNeeded}
            courseVideoWatchId={courseVideoWatchId}
            ref={courseVideoWatchIdRef}
          />
        )}
      </div>
    </div>
  );
};

export default WatchAndAskComponent;
