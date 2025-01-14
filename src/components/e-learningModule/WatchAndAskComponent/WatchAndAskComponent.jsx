import React, { useRef } from "react";
import videojs from "video.js";
import ChatBox from "../ChatBox/ChatBox";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { useDispatch } from "react-redux";
import { setVideoTimeStoped } from "../../../redux/slices/elearningSlice.js";

const WatchAndAskComponent = () => {
  const dispatch = useDispatch();
  const videoTitle = "مبحث فیزیک صوت : جلسه اول";
  const playerRef = useRef(null);
  const playerOperationRef = useRef(null);
  const currentTimeRef = useRef({ minutes: 0, seconds: 0 });

  // A separate ref for the element that displays the time
  const timeDisplayRef = useRef(null);

  const videoJsOptions = {
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
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // Handle player events if needed
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  const handleTimeUpdate = (currentTime) => {
    // Store the current time in the ref
    currentTimeRef.current = currentTime;

    // Manually update the time display without causing a re-render
    if (timeDisplayRef.current) {
      timeDisplayRef.current.textContent = `${currentTime.minutes}:${
        currentTime.seconds < 10
          ? `0${currentTime.seconds}`
          : currentTime.seconds
      }`;
    }
  };

  const handleHelpButtonClick = () => {
    document.getElementById("chat-box-section").scrollIntoView({
      behavior: "smooth",
    });
    dispatch(setVideoTimeStoped(currentTimeRef.current));
    playerOperationRef.current.pause();
  };

  const handleAskButtonClick = () => {
    document.getElementById("chat-box-section").scrollIntoView({
      behavior: "smooth",
    });
    console.log(JSON.stringify(currentTimeRef.current));
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center items-center h-full">
        {/* Video Player Section */}
        <div className="w-3/5 relative">
          <h2 className="text-center pb-3">{videoTitle}</h2>
          <VideoPlayer
            options={videoJsOptions}
            onReady={handlePlayerReady}
            onTimeUpdate={handleTimeUpdate}
            ref={playerOperationRef}
          />
        </div>

        {/* Buttons Section */}
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

      {/* Display Current Time Beneath the Video */}
      <div className="text-center mt-4">
        <span ref={timeDisplayRef} className="text-xl font-medium">
          0:00
        </span>
      </div>

      {/* Chat Box Section */}
      <div id="chat-box-section" className="mt-8">
        <ChatBox />
      </div>
    </div>
  );
};

export default WatchAndAskComponent;
