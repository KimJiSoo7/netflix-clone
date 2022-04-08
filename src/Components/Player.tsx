import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getVideos, IGetMoviesResult } from "../api";

interface IMovie {
  movieId: number;
  index: number;
  length: number;
  setNextMovie: () => void;
}

interface IVideoDetail {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: string;
  type: string;
  official: string;
  published_at: string;
  id: string;
}

interface IVideo {
  id: string;
  results: [IVideoDetail];
}

const Wrapper = styled.div`
  position: absolute;
  top: -90px;
  width: 100%;
  height: 100%;
  /* opacity: 1; */
`;

const Loader = styled.div`
  height: 20vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/**
 * Problems
 * 1. 처음으로 page rendering 됐을 때 Youtube Player가 자동으로 play되지 않는다.
 * 현재 카테고리가 Tv Shows일 때 Home으로 이동 후 page가 rendering되면 3초 후 제대로 play가 됀다.
 * 현재 카테고리가 Home일 때 page가 re-rendering되면 Youtube Player가 play돼지 않는다.
 */
function Player(props: IMovie) {
  const { data, isLoading } = useQuery<IVideo>(["movies", "video"], () =>
    getVideos(props.movieId)
  );
  const [playing, setPlaying] = useState(false);
  const autoPlay = () => setPlaying(true);
  //   useEffect(() => {
  //     if (!playing) {
  //       setTimeout(autoPlay, 3000);
  //     }
  //   }, [playing]);
  const onEnded = () => {
    props.setNextMovie();
    setPlaying(false); // setPlaying((prev) => !prev);
    {
      console.log(
        "playing: ",
        playing,
        " movieIndex: ",
        props.index,
        data?.results[0].key
      );
    }
  };

  return isLoading ? (
    <Loader>Loading...</Loader>
  ) : (
    <Wrapper>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${data?.results[0].key}`}
        width="100%"
        height="100%"
        playing={playing}
        controls={false} // progress bar, buttons(play, volume, maximize, option, ...)
        onEnded={onEnded}
        onPause={onEnded}
      />
    </Wrapper>
  );
}
export default Player;
