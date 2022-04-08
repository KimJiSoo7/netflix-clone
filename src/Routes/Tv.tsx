import styled from "styled-components";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import YouTubePlayer from "react-player/youtube";

const Wrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* 720 / 1280 = 0.5625 */
  background: black;
  width: 100vw;
  height: 100vh;
  margin-top: 70px;
`;

const SmallBanner = styled.div`
  position: absolute;
  top: 100px;
  left: 50px;
  width: 10vw;
  height: 5vh;
  background: red;
`;

// const SmallBanner = styled(motion.div)`

// `;

function Tv() {
  const [playing, setPlaying] = useState(true);
  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  };
  return (
    <>
      <h1>hello</h1>
      <Wrapper>
        <ReactPlayer
          style={{ position: "absolute", top: 0, left: 0 }}
          url={"https://www.youtube.com/watch?v=IE8HIsIrq4o"}
          width="100%"
          height="100%"
          playing={playing}
          controls={true} // progress bar, buttons(play, volume, maximize, option, ...)
        />
        <SmallBanner>
          <button title={playing ? "pause" : "play"} onClick={togglePlaying}>
            Click
          </button>
        </SmallBanner>
      </Wrapper>
    </>
  );
}
export default Tv;
