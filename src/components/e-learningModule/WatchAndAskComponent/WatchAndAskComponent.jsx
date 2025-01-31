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
import {
  setHelpMeTime,
  setCourseVideoSessionTime,
  setCourseVideoWatchData,
} from "../../../redux/slices/elearningSlice.js";
import {
  createCourseVideoSession,
  startWatchCourseVideo,
  updateCourseVideoSession,
} from "../../../services/courseService.js";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUserInfo,
  is_User_course_editor,
} from "../../../services/authService.js";

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

  const dispatch = useDispatch();
  //======== Getting courseVideoId from URL and call webAPI for Starting Watch ============================
  const { courseVideoId } = useParams();
  const courseVideoWatchIdRef = useRef(null);
  const [courseVideoWatchId, setCourseVideoWatchId] = useState(null);

  useEffect(() => {
    const is_user_course_editor = is_User_course_editor();
    setIsCourseEditor(is_user_course_editor);
  }, []);

  // useEffect(() => {
  //   alert(is_user_course_editor);
  //   if (is_user_course_editor != null || is_user_course_editor != undefined) {
  //     setIsCourseEditor(is_user_course_editor);
  //   }
  // }, [is_user_course_editor]);

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
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);
  //=================================================================

  const videoJsOptions = useMemo(
    () => ({
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src: "/sample_video.mp4",
          type: "video/mp4",
        },
      ],
    }),
    []
  );

  const handlePlayerReady = useCallback((player) => {
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

    // Manually update the time display without causing a re-render
    if (timeDisplayRef.current) {
      timeDisplayRef.current.textContent = `${currentTime.minutes}:${
        currentTime.seconds < 10
          ? `0${currentTime.seconds}`
          : currentTime.seconds
      }`;
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

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center items-center h-full">
        {/* Video Player Section */}
        <div className="w-3/5 relative ">
          <h2 className="text-center pb-3 ">{videoTitle}</h2>
          <VideoPlayer
            options={videoJsOptions}
            onReady={handlePlayerReady}
            onTimeUpdate={handleTimeUpdate}
            ref={{ playerOperationRef, isPlayingRef }}
            onPlay={createUpdateWatchSessionHandler}
          />
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col mt-10">
          <button
            onClick={handleHelpMeButtonClick}
            disabled={!courseVideoWatchId}
            className="transform -translate-y-1/2 bg-green-400 text-white px-6 py-3 ml-10 mb-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            کمکم کن
          </button>
          <button
            onClick={handleAskButtonClick}
            className="transform -translate-y-1/2 bg-yellow-400 text-white px-6 py-3 ml-10 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            سوال دارم
          </button>
          <button
            onClick={handlePromptEngineeringButtonClick}
            style={{
              display: isCourseEditor ? "" : "none",
            }}
            className="transform -translate-y-1/2 bg-blue-800 text-white mt-4 px-6 py-3 ml-10 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            مهندسی پرسش
            <br />
            ویدیو آموزشی
          </button>
        </div>
      </div>

      {/* Display Current Time Beneath the Video */}
      {/* <div className="text-center mt-4">
        <span ref={timeDisplayRef} className="text-xl font-medium">
          0:00
        </span>
      </div> */}

      {/* Chat Box Section */}
      <div id="chat-box-section" className="mt-8">
        <ChatBox
          helpNeeded={helpNeeded}
          setHelpNeeded={setHelpNeeded}
          courseVideoWatchId={courseVideoWatchId}
          ref={courseVideoWatchIdRef}
        />
      </div>
    </div>
  );
};

export default WatchAndAskComponent;
