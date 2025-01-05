import React from "react";
import videojs from "video.js";
import AppHeader from "../AppHeader/AppHeader.jsx";
import AppSidebar from "../AppSidebar/AppSidebar.jsx";
import ChatBox from "../ChatBox/ChatBox.jsx";
import VideoJS from "../VideoPlayer/VideoJS.jsx";

const DefaultLayout = () => {
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

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="flex justify-center items-center h-full">
          <div className="w-3/5">
            <p>This is the Video player</p>
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          </div>
        </div>
        <div>
          <ChatBox />
        </div>
      </div>
    </div>
    // <div>
    //   <AppSidebar />
    //   <div className="wrapper d-flex flex-column min-vh-100">
    //     <AppHeader />

    //     <div className="body flex-grow-1">
    //       <div className="flex flex-row"></div>
    //       <div className="flex justify-center items-center h-full">
    //         <div className="w-3/5">
    //           <p>This is the Video player</p>
    //           <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    //         </div>
    //       </div>
    //       <div>
    //         <ChatBox />
    //     <div className="flex justify-center items-center h-full">
    //       <div className="w-3/5">
    //         <p>This is the Video player</p>
    //         <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // </div>
  );
};

export default DefaultLayout;
