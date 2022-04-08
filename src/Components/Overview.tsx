import { motion } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import { transform } from "typescript";
import { getLogo } from "../api";
import { makeImagePath } from "../utils";

interface IOverview {
  title: string;
  summary: string;
  movieId: number;
}

interface ILogo {
  production_companies: [ILogoDetail];
}

interface ILogoDetail {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

const Wrapper = styled(motion.div)`
  position: relative;
  top: 25vh;
  left: 5vw;
  width: 40vw;
  height: 40vh;
  background-color: rgba(0, 0, 0, 0.3);
  color: ${(props) => props.theme.white};
  transform-origin: left center;
`;

const Logo = styled(motion.div)<{ logoPath: string }>`
  width: 100%; //60vw;;
  height: 12vh;
  margin-left: 12px;
  background-image: url(${(props) => makeImagePath(props.logoPath)});
  background-repeat: no-repeat;
  background-size: contain;
  filter: invert(100%);
  transform-origin: left center;
`;

const Summary = styled(motion.div)`
  padding: 10px 20px;
  font-size: 2vw;
`;

const Title = styled.h1`
  /* padding: 5px; */
  font-size: 5vw;
`;

// const

const logoVariant = {
  normal: {
    scale: 1,
  },
  animate: {
    scale: 0.8,
    transition: { delay: 2, duration: 1, type: "tween" },
  },
};

const wrapperVariant = {
  normal: {
    scale: 1,
  },
  animate: {
    scale: 1,
    height: "12vh",
    y: "28vh",
    width: "25vw",
    //   y: -30,
    transition: { delay: 2, duration: 1, type: "tween" },
  },
};

const summaryVariant = {
  normal: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
    transition: { delay: 1.5, duration: 1, type: "tween" },
  },
};

function Overview({ title, summary, movieId }: IOverview) {
  const { data, isLoading } = useQuery<ILogo>(["movies", "logo"], () =>
    getLogo(movieId)
  );

  let logoPath = "";
  if (data?.production_companies) {
    const logoPaths: ILogoDetail[] = data.production_companies.filter(
      (item) => item.logo_path !== null
    );
    if (logoPaths.length > 0) {
      logoPath = logoPaths[0].logo_path;
    } else {
      logoPath = "";
    }
  }

  return isLoading ? null : (
    <Wrapper variants={wrapperVariant} initial="normal" animate="animate">
      <Logo
        variants={logoVariant}
        initial="normal"
        animate="animate"
        logoPath={logoPath}
      />
      <Summary variants={summaryVariant} initial="normal" animate="animate">
        <Title>{title}</Title>
        {summary}
      </Summary>
    </Wrapper>
  );
}
export default Overview;
