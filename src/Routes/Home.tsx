import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import Overview from "../Components/Overview";
import Player from "../Components/Player";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const VideoBanner = styled.div`
  width: 100%;
  height: 100vh;
  /* background-color: red; */
  color: ${(props) => props.theme.white.lighter};
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

// const Overview = styled.p`
//   font-size: 30px;
//   width: 50%;
// `;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 3px;
  grid-template-columns: repeat(5, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  height: 120px;
  width: 100%;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: left center;
  }
  &:last-child {
    transform-origin: right center;
  }
`;

const Info = styled(motion.div)`
  padding: 5px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  /* bottom: 0; */
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  /* text-align: center; */
  font-size: 22px;
  position: relative;
  top: -26px;
  left: 4px;
`;

const BigOverView = styled.p`
  position: relative;
  top: -23px;
  color: ${(props) => props.theme.white.lighter};
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth - 27,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth + 27,
  },
};

const boxVariant = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -30,
    transition: { delay: 0.3, duration: 0.5, type: "tween" },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.3, duration: 0.5, type: "tween" },
  },
};

// 영화갯수 총 20개, background용1개 + 19개
// 19개 5/5/5/4 (slider)
const offset = 5;
// let page = 0;

function Home() {
  const history = useHistory(); // url 왔다갔다 할 수 있음
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useViewportScroll();
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [movieIndex, setMovieIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const setNextMovie = () => {
    movieIndex !== data?.results.length
      ? setMovieIndex((prev) => prev + 1)
      : setMovieIndex(0);
    console.log("movieIndex ", movieIndex);
  };
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };
  const onOverlayClick = () => history.goBack(); // or history.goBack();
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => String(movie.id) === bigMovieMatch.params.movieId
    ); // find() returns a first item that matched with a condition
  const ref = useRef<HTMLVideoElement>(null);
  const [showControl, setShowControl] = useState(false);
  // control bar visible 관련 함수
  const handleControlVisible = () => {
    if (!showControl) {
      setShowControl(true);
      setTimeout(() => {
        setShowControl(false);
      }, 2000);
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          {/* <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner> */}
          {/* <div
            style={{
              // position: "relative",
              // top: "100px",
              backgroundSize: "cover",
              backgroundImage: `url(${`https://image.tmdb.org/t/p/original/wdrCwmRnLFJhEoH8GSfymY85KHT.png`})`,
              backgroundColor: "red",
              color: "white",
              height: "200px",
              width: "400px",
            }}
          >
            Hi
          </div> */}
          <VideoBanner onClick={increaseIndex}>
            {data?.results && (
              <>
                <Player
                  key={data?.results[movieIndex].id}
                  movieId={data.results[movieIndex].id}
                  index={movieIndex}
                  length={data.results.length}
                  setNextMovie={() => setNextMovie}
                />
                <Overview
                  title={data.results[movieIndex].title}
                  summary={data.results[movieIndex].overview}
                  movieId={data.results[movieIndex].id}
                />
              </>
            )}
          </VideoBanner>

          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }} // spring: 튕김, linear:
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(index * offset, offset * (index + 1))
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      onClick={() => onBoxClicked(movie.id)}
                      variants={boxVariant}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                      key={movie.id}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>

          <AnimatePresence>
            {bigMovieMatch && (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1, transition: { duration: 0.4 } }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 70 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        // src={makeImagePath(clickedMovie.backdrop_path, "w500")}
                        style={{
                          backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)),  url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverView>{clickedMovie.overview}</BigOverView>
                    </>
                  )}
                </BigMovie>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
