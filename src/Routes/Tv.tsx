import styled from "styled-components";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
  background: red;
`;

// const SmallBanner = styled(motion.div)`

// `;

function Tv() {
  const [playing, setPlaying] = useState(false);
  const callBackFunc = () => setPlaying(true);
  useEffect(() => {
    setTimeout(callBackFunc, 5000);
  }, []);
  const onEnded = () => {};
  return (
    <Wrapper>
      <ReactPlayer
        style={{ position: "absolute", top: 0, left: 0 }}
        url={`https://www.youtube.com/watch?v=IE8HIsIrq4o`}
        width="100%"
        height="100%"
        playing={playing}
        controls={false} // progress bar, buttons(play, volume, maximize, option, ...)
        onEnded={onEnded}
      />
      <SmallBanner></SmallBanner>
    </Wrapper>
  );
}
export default Tv;
