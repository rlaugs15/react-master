import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { useHistory, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { getSmilar, IGetVideos, IVideo } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled(motion.div)`
  max-width: 900px;
  width: 60vw;
  height: 90vh;
  overflow-y: auto;
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.darker};
`;

const Poster = styled(motion.div)<{ photo: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  background-image: url(${(props) => makeImagePath(props.photo)});
  background-size: cover;
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 35px;
  padding: 20px 0;
  font-weight: 550;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const MainContents = styled.div`
  margin: 20px 15px;
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const MainOverView = styled.div`
  grid-column: 1 / 3;
  line-height: 1.8;
`;

const MainInfo = styled.div``;

const ReleaseDate = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const Adult = styled.div`
  display: flex;
`;

const Text = styled.div`
  color: ${(props) => props.theme.black.lighter};
  margin: 0 5px;
`;

const ManyVideo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
`;

const ManyVideoTitle = styled.div`
  margin: 0 0 25px 15px;
  font-size: 23px;
`;

const Video = styled.div`
  margin: 10px;
  border-radius: 5px;
  overflow: hidden;
`;

const VideoPoster = styled.div<{ photo: string }>`
  width: 100%;
  padding-top: 60%;
  background-image: url(${(props) => props.photo});
  background-size: cover;
`;

const VideoContent = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const VideoTitle = styled.div``;

const VideoReleaseDate = styled.div`
  padding: 5px 0;
`;

const VideoOverView = styled.div`
  width: 100%;
  height: 100px;
  overflow-y: hidden;
  text-overflow: ellipsis;
  font-size: 17px;
  padding-bottom: 3px;
`;

interface DetailedCardProps {
  movieId: number;
  photo?: string;
}

export interface IState {
  id: number;
  photo: string;
  title: string;
  overview: string;
  releaseDate?: string;
  adult: boolean;
  name: string; //여기부터 tv시리즈
  firstAirData?: string;
}

function DetailedCard({ movieId }: DetailedCardProps) {
  const history = useHistory();
  const { state } = useLocation<IState>();

  const { isLoading, data } = useQuery<IGetVideos>(["smilar", movieId], () =>
    getSmilar(movieId, state.releaseDate)
  );

  const onOverlayClick = () => history.push("/");

  const onReplVideoClick = (video: IVideo) => {
    const {
      id,
      backdrop_path,
      title,
      overview,
      release_date,
      adult,
      name,
      first_air_date,
      poster_path,
    } = video;
    history.push(`/movie/${id}`, {
      id,
      photo: backdrop_path || poster_path,
      title,
      overview,
      releaseDate: release_date,
      adult,
      name,
      firstAirData: first_air_date,
    });
  };
  return (
    <>
      <AnimatePresence>
        <Overlay
          onClick={onOverlayClick}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <Wrapper
          //ts가 movieId을 못 읽어서 useRouteMatch에 제네릭으로 추가했다.
          layoutId={movieId + ""}
        >
          <Poster photo={state.photo} />
          <Title>{state.title || state.name}</Title>
          <MainContents>
            <MainOverView>{state.overview}</MainOverView>
            <MainInfo>
              <ReleaseDate>
                <Text>{state.releaseDate ? "개봉일: " : "방영일: "}</Text>
                {state.releaseDate || state.firstAirData}
              </ReleaseDate>
              <Adult>
                <Text>시청등급 : </Text>
                {state.adult ? "청소년관람불가" : "청소년관람가능"}
              </Adult>
            </MainInfo>
          </MainContents>
          {isLoading ? null : (
            <>
              <ManyVideoTitle>같이 시청한 콘텐츠</ManyVideoTitle>
              <ManyVideo>
                {data?.results.slice(0, 11).map((video) => (
                  <Video onClick={() => onReplVideoClick(video)}>
                    <VideoPoster
                      photo={makeImagePath(
                        video.backdrop_path ?? video.poster_path
                      )}
                    />
                    <VideoContent>
                      <VideoTitle>{video.title ?? video.name}</VideoTitle>
                      <VideoReleaseDate>
                        {video.release_date ?? video.first_air_date}
                      </VideoReleaseDate>
                      <VideoOverView>{video.overview}</VideoOverView>
                    </VideoContent>
                  </Video>
                ))}
              </ManyVideo>
            </>
          )}
        </Wrapper>
      </AnimatePresence>
    </>
  );
}

export default DetailedCard;
