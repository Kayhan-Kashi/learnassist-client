import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = React.memo(
  forwardRef(({ options, onReady, onTimeUpdate, onPlay, onPause }, ref) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const { playerOperationRef, isPlayingRef } = ref;
    useEffect(() => {
      if (!playerRef.current) {
        // Initialize Video.js player
        const videoElement = document.createElement("video-js");
        videoElement.classList.add("vjs-big-play-centered");
        videoRef.current.appendChild(videoElement);

        const player = (playerRef.current = videojs(
          videoElement,
          options,
          () => {
            videojs.log("player is ready");
            onReady && onReady(player);
          }
        ));

        player.on("play", () => {
          isPlayingRef.current = true;
          if (onPlay) {
            onPlay();
          }
        });

        player.on("pause", () => {
          isPlayingRef.current = false;
          if (onPause) {
            onPause();
          }
        });

        // Set up timeupdate event listener
        player.on("timeupdate", () => {
          if (player && player.currentTime) {
            const timeInSeconds = player.currentTime();
            const minutes = Math.floor(timeInSeconds / 60);
            const seconds = Math.floor(timeInSeconds % 60);
            onTimeUpdate && onTimeUpdate({ minutes, seconds });
          }
        });
      } else {
        const player = playerRef.current;

        player.autoplay(options.autoplay);
        player.src(options.sources);
      }
    }, [options, onReady, onTimeUpdate]);

    // Dispose the Video.js player when the component unmounts
    useEffect(() => {
      const player = playerRef.current;

      return () => {
        if (player && !player.isDisposed()) {
          player.dispose();
          playerRef.current = null;
          alert("disposing inside player")
        }
      };
    }, []);

    useImperativeHandle(playerOperationRef, () => ({
      pause: () => {
        if (playerRef.current) {
          playerRef.current.pause();
        }
      },
      play: () => {
        if (playerRef.current) {
          playerRef.current.play();
        }
      },
    }));

    return (
      <div data-vjs-player>
        <div ref={videoRef} />
      </div>
    );
  })
);

export default VideoPlayer;
