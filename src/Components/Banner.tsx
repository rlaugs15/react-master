import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { IVideo } from "../api";
import { makeImagePath } from "../utils";

const LeftArrow = styled(motion.div)`
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 100%;
  left: 0%;
  top: 45%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightArrow = styled(motion.div)`
  position: absolute;
  right: 1%;
  top: 45%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BannerWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const BannerCard = styled(motion.div)<{ bgPhoto: string }>`
  position: absolute;
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: flex-start;
  padding: 50px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
`;

const Content = styled.div``;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const OverView = styled.p`
  font-size: 24px;
  width: 50%;
`;

const bannerVariants: Variants = {
  hidden: (isBack: boolean) => ({
    x: isBack ? -window.outerWidth : window.outerWidth,
  }),
  visible: {
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? window.outerWidth : -window.outerWidth,
  }),
};

interface IBanner {
  movies: IVideo[];
}

function Banner({ movies }: IBanner) {
  const [bannerCount, setBannerCount] = useState(0);
  const [back, setBack] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const dataLength = movies.length;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBack(false);
      setBannerCount((prev) => (prev === dataLength - 2 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 clearInterval 호출하여 메모리 누수 방지
  }, [dataLength]); // dataLength가 변경(컴포넌트가 마운트, 언마운트되면 배열의 길이가 초기화되므로)될 때마다 effect를 다시 실행

  const leftMoving = () => {
    if (movies) {
      if (leaving) return;
      setLeaving(false);
      setBack(true);
      setBannerCount((prev) => (prev === 0 ? dataLength - 2 : prev - 1));
    }
  };

  const rightMoving = () => {
    if (movies) {
      if (leaving) return;
      setLeaving(true);
      setBack(false);
      setBannerCount((prev) => (prev === dataLength - 2 ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <AnimatePresence
      initial={false}
      custom={back}
      onExitComplete={toggleLeaving}
    >
      <BannerWrapper key={bannerCount}>
        {movies
          .slice(1)
          .slice(bannerCount, bannerCount + 1)
          .map((movie) => (
            <BannerCard
              custom={back}
              variants={bannerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 1 }}
              key={movie.id}
              bgPhoto={makeImagePath(movie.backdrop_path || "")}
            >
              <Content>
                <Title>{movie.title}</Title>
                <OverView>{movie.overview}</OverView>
              </Content>
            </BannerCard>
          ))}
      </BannerWrapper>
      <LeftArrow>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="80"
          width="50"
          stroke="white"
          strokeWidth="6"
          color="white"
          cursor="pointer"
          onClick={leftMoving}
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
          height="80"
          width="50"
          stroke="white"
          strokeWidth="6"
          color="white"
          cursor="pointer"
          onClick={rightMoving}
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
    </AnimatePresence>
  );
}

export default Banner;
