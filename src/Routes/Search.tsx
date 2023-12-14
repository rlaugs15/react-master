import { useQuery } from "react-query";
import { useHistory, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { IGetVideos, getMovies, getTVOntheAir, IVideo } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin-top: 100px;
`;

const SearchResult = styled.div`
  font-size: 50px;
  font-weight: 600;
  margin-top: 20px;
`;

const ListWrapper = styled.div`
  width: 90%;
  height: auto;
  padding: 15px;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 15px;
`;

const MoviePhoto = styled.div<{ photo: string }>`
  background-image: url(${(props) => props.photo});
  background-size: cover; /* 이미지 비율 유지하면서 div에 맞추기 */
  background-position: center center;
  width: 100%;
  height: 600px;
  border-radius: 15px;
`;

const TvPhoto = styled(MoviePhoto)`
  background-image: url(${(props) => props.photo});
`;

function Search() {
  const location = useLocation();
  const { search } = location;
  const searchParams = new URLSearchParams(search);
  const keywordValue = searchParams.get("keyword");

  const { isLoading: movieLoading, data: movieData } = useQuery<IGetVideos>(
    ["movies", "searchMovie"],
    () => getMovies()
  );
  const { isLoading: tvLoading, data: tvData } = useQuery<IGetVideos>(
    ["tvSeries", "searchTv"],
    () => getTVOntheAir()
  );

  // 영화필터
  const searchMovies = movieData?.results.filter((movie) =>
    movie.title.toLowerCase().includes(keywordValue?.toLowerCase() || "")
  );

  // tv필터
  const searchTv = tvData?.results.filter((tv) =>
    tv.name.toLowerCase().includes(keywordValue?.toLowerCase() || "")
  );

  const history = useHistory();
  const onDetailedClick = (video: IVideo) => {
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

  const loading = movieLoading && tvLoading;
  return (
    <Wrapper>
      {loading ? null : (
        <>
          <SearchResult>
            "{keywordValue}" 검색 결과({})
          </SearchResult>
          {searchMovies && (
            <ListWrapper>
              <Title>영화</Title>
              <List>
                {searchMovies.map((movie) => (
                  <MoviePhoto
                    onClick={() => onDetailedClick(movie)}
                    key={movie.id}
                    photo={makeImagePath(
                      movie.poster_path || movie.backdrop_path
                    )}
                  />
                ))}
              </List>
            </ListWrapper>
          )}
          {searchTv && (
            <ListWrapper>
              <Title>TV 시리즈</Title>
              <List>
                {searchTv.map((tv) => (
                  <TvPhoto
                    onClick={() => onDetailedClick(tv)}
                    key={tv.id}
                    photo={makeImagePath(tv.poster_path || tv.backdrop_path)}
                  />
                ))}
              </List>
            </ListWrapper>
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Search;
