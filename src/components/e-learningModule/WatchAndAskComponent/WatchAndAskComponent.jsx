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
import { useDispatch } from "react-redux";
import { setVideoTimeStoped } from "../../../redux/slices/elearningSlice.js";
import { startWatchCourseVideo } from "../../../services/courseService.js";
import { useParams } from "react-router-dom";

const WatchAndAskComponent = () => {
  const { courseVideoId } = useParams();

  const dispatch = useDispatch();
  const videoTitle = "مبحث فیزیک صوت : جلسه اول";
  const playerRef = useRef(null);
  const playerOperationRef = useRef(null);
  const currentTimeRef = useRef({ minutes: 0, seconds: 0 });
  const [helpNeeded, setHelpNeeded] = useState(false);
  const [courseVideoWatchId, setCourseVideoWatchId] = useState(null);

  useEffect(() => {
    startWatchCourseVideo(courseVideoId)
      .then((res) => {
        setCourseVideoWatchId(res.CourseVideoWatchId);
        console.log("courseVideoWatch started");
      })
      .catch((err) => {
        console.log("course video cannot be played");
      });
  }, [courseVideoId]);

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

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  }, []);

  const handleHelpButtonClick = useCallback(() => {
    setHelpNeeded(true);
    document.getElementById("chat-box-section").scrollIntoView({
      behavior: "smooth",
    });

    dispatch(setVideoTimeStoped(currentTimeRef.current));
    playerOperationRef.current.pause();
  }, [dispatch]);

  const handleAskButtonClick = () => {
    document.getElementById("chat-box-section").scrollIntoView({
      behavior: "smooth",
    });
    console.log(JSON.stringify(currentTimeRef.current));
  };

  const createWatchSessionHandler = useCallback(() => {
    console.log("session created");
  }, [courseVideoId]);

  useEffect(() => {
    let interval = null;

    const handlePlay = () => {
      //alert();
      interval = setInterval(() => {
        createWatchSessionHandler();
      }, 10000);
    };

    const handlePause = () => {
      clearInterval(interval);
    };

    const player = playerRef.current;

    if (player) {
      player.on("play", handlePlay);
      player.on("pause", handlePause);
      player.on("ended", handlePause);
    }

    return () => {
      if (player) {
        player.off("play", handlePlay);
        player.off("pause", handlePause);
        player.off("ended", handlePause);
      }
      clearInterval(interval);
    };
  }, [createWatchSessionHandler]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center items-center h-full">
        <div className="w-3/5 relative ">
          <h2 className="text-center pb-3 ">{videoTitle}</h2>
          <VideoPlayer
            options={videoJsOptions}
            onReady={handlePlayerReady}
            ref={playerOperationRef}
          />
        </div>

        <div className="flex flex-col">
          <button
            onClick={handleHelpButtonClick}
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
        </div>
      </div>

      <div id="chat-box-section" className="mt-8">
        <ChatBox helpNeeded={helpNeeded} setHelpNeeded={setHelpNeeded} />
      </div>
    </div>
  );
};

export default WatchAndAskComponent;
