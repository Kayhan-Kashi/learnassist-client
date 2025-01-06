import React, { useState } from "react";
import videojs from "video.js";
import AppHeader from "../AppHeader/AppHeader.jsx";
import AppSidebar from "../AppSidebar/AppSidebar.jsx";
import ChatBox from "../ChatBox/ChatBox.jsx";
import VideoPlayer from "../VideoPlayer/VideoPlayer.jsx";

const DefaultLayout = () => {
  const videoTitle = "مبحث فیزیک صوت : جلسه اول";
  const playerRef = React.useRef(null);

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

  const handleHelpButtonClick = () => {
    document.getElementById("chat-box-section").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <main>
          <div className="flex flex-col">
            <div className="flex flex-row justify-center items-center h-full">
              <div className="w-3/5 relative">
                <h2 className="text-center pb-3">{videoTitle}</h2>
                <VideoPlayer
                  options={videoJsOptions}
                  onReady={handlePlayerReady}
                />
              </div>
              <div className="flex flex-col">
                <button
                  onClick={handleHelpButtonClick}
                  className="transform -translate-y-1/2 bg-green-400 text-white px-6 py-3 ml-10 mb-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                >
                  کمک کن
                </button>
                <button
                  onClick={handleHelpButtonClick}
                  className="transform -translate-y-1/2 bg-yellow-400 text-white px-6 py-3 ml-10 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                >
                  سوال دارم
                </button>
              </div>
            </div>
            <div id="chat-box-section">
              <ChatBox />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
