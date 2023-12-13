import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { styled } from "styled-components";
import { IVideo } from "../api";
import { makeImagePath } from "../utils";

const Slider = styled.div`
  position: relative;
  margin: 100px 15px;
  height: 200px;
`;

const Title = styled.div`
  color: ${(props) => props.theme.white.lighter};
  font-size: 23px;
`;

const BoxRow = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px; //6묶음 슬라이드 사이의 간격
  margin-bottom: 5px;
  position: absolute;
  width: 90%;
  top: 50px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  font-size: 30px;
  width: 100%;
  padding-top: 40%;
  border-radius: 10px;
  cursor: pointer;
  //position: relative; whileHover 때 옆의 Box가 가려서 삭제하고 일부 css수정
  &:first-child {
    transform-origin: left center;
  }
  &:last-child {
    transform-origin: right center;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  bottom: 0;
  opacity: 0;
  top: 56px;
  position: relative;
  bottom: -1px;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const LeftArrow = styled(motion.div)`
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 100%;
  left: 0%;
  top: 40%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightArrow = styled(motion.div)`
  position: absolute;
  right: 1%;
  top: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RowVariants: Variants = {
  hidden: (isBack: boolean) => ({
    x: isBack ? -window.outerWidth - 5 : window.outerWidth + 5, //사용자의 화면 크기, +10=다음 Row와의 gap
  }),
  visible: {
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
};

const boxVariants: Variants = {
  nomal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    borderRadius: "10px 10px 0 0",
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants: Variants = {
  nomal: {
    scale: 0,
    y: -50,
  },
  hover: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.1,
    },
  },
};

interface ISlid {
  movies: IVideo[];
  title: string;
}

const offset = 6;

function Slid({ movies, title }: ISlid) {
  const [index, setIndex] = useState(0);
  const [back, setBack] = useState(false);
  //슬라이더를 연속으로 누를 경우 슬라이더 사이의 간격이 커지는 현상 해결 로직1
  const [leaving, setLeaving] = useState(false);
  //history로 url을 생성하고, bigMovieMatch로 url이 존재하면 창을 띄운다.
  const history = useHistory();

  const onClickLeftSlid = () => {
    if (movies) {
      if (leaving) return;
      setLeaving(true);
      setBack(true);
      const totalMovie = movies.length - 1; //메인화면으로 영화하나 사용하고 있으므로
      const maxIndex = Math.floor(totalMovie / offset) - 1; //페이지가 0에서 시작하므로
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const onClickRightSlid = () => {
    if (movies) {
      if (leaving) return;
      setLeaving(true);
      setBack(false);
      const totalMovie = movies.length - 1;
      const maxIndex = Math.floor(totalMovie / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  //슬라이더 버그 해결 로직2
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onBoxClicked = (movie: IVideo) => {
    const {
      id,
      backdrop_path,
      title,
      overview,
      release_date,
      adult,
      name, //여기부터 tv시리즈
      first_air_date,
      poster_path,
    } = movie;
    history.push(`/movie/${id}`, {
      id,
      photo: backdrop_path,
      title,
      overview,
      releaseDate: release_date,
      adult,
      name,
      firstAirData: first_air_date,
      tvPhoto: poster_path,
    });
  };
  return (
    <Slider>
      <Title>{title}</Title>
      {/* onExitComplete에 함수를 넣으면 exit가 끝났을 때 실행 */}
      {/* 페이지에 처음 들어갈 때 밀려들어오는 애니를 주지 않기 위해 initial={false} */}
      <AnimatePresence
        initial={false}
        onExitComplete={toggleLeaving}
        custom={back}
      >
        <BoxRow
          custom={back}
          variants={RowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {movies
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie) => (
              <Box
                key={movie.id}
                layoutId={movie.id + ""}
                onClick={() => onBoxClicked(movie)}
                variants={boxVariants}
                initial="nomal"
                whileHover="hover"
                transition={{ type: "tween" }}
                bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
              >
                {/* Box의 variants가 상속되므로 */}
                <Info variants={infoVariants}>
                  <h4>{movie.title || movie.name}</h4>
                  <h4>{movie.release_date || movie.first_air_date}</h4>
                </Info>
              </Box>
            ))}
        </BoxRow>
      </AnimatePresence>
      <LeftArrow>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          width="30"
          stroke="white"
          strokeWidth="6"
          color="white"
          cursor="pointer"
          onClick={onClickLeftSlid}
          viewBox="0 0 320 512"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            whileHover={{ pathLength: 1 }}
            transition={{ duration: 0.2 }}
            fill="#a39d9d39"
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
          />
        </svg>
      </LeftArrow>
      <RightArrow>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          width="30"
          stroke="white"
          strokeWidth="6"
          color="white"
          cursor="pointer"
          onClick={onClickRightSlid}
          viewBox="0 0 320 512"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            whileHover={{ pathLength: 1 }}
            transition={{ duration: 0.2 }}
            fill="#a39d9d39"
            d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
          />
        </svg>
      </RightArrow>
    </Slider>
  );
}

export default Slid;
