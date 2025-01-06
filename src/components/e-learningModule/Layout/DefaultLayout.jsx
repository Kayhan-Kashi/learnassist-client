import React from "react";
import videojs from "video.js";
import AppHeader from "../AppHeader/AppHeader.jsx";
import AppSidebar from "../AppSidebar/AppSidebar.jsx";
import WatchAndAskComponent from "../WatchAndAskComponent/WatchAndAskComponent.jsx";

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
          <WatchAndAskComponent />
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
