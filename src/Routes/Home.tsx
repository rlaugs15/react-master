import styled from "styled-components";
import { useQuery } from "react-query";
import { getMovies, IGetVideos } from "../api";
import { useRouteMatch } from "react-router-dom";
import DetailedCard from "../Components/DetailedCard";
import Banner from "../Components/Banner";

import CategoryList from "../Components/CategoryList";

const Wrapper = styled.div`
  background-color: black;
  height: 200vh;
  //슬라이더를 클릭했을 때 일시적으로 X축 Scroll Bar가 등장하면서 오른쪽으로 창이 길어지는 현상 해결
  //후기: 슬라이더와 화면 하단에 오류가 생김. 글로벌스타일에 ::-webkit-scrollbar로 해결
  //추가: html에도 overflow-x:hidden 붙여주면 검은화면이 안 나옴
  //overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FakeContainer = styled.div`
  width: ${window.innerWidth}px;
  height: ${window.innerHeight - 180}px;
  background-color: black;
`;

const ManySlid = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 5px;
  & > * {
    margin: 50px 5px;
  }
  &:first-child,
  &:last-child {
    margin: 0 5px;
  }
`;

function Home() {
  const { isLoading, data } = useQuery<IGetVideos>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movie/:movieId");

  //슬라이더가 다음 페이지로 넘어가기 위한 인덱스 시스템

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>로딩 중...</Loader>
      ) : (
        <>
          <FakeContainer>
            <Banner movies={data?.results || []} />
          </FakeContainer>
          <ManySlid>
            <CategoryList />
          </ManySlid>
        </>
      )}
      {bigMovieMatch ? (
        <DetailedCard movieId={Number(bigMovieMatch.params.movieId)} />
      ) : null}
    </Wrapper>
  );
}

export default Home;
