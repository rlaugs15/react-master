import { useQuery } from "react-query";
import { getMovies, getTVOntheAir, IGetVideos } from "../api";
import Slid from "./Slid";

function CategoryList() {
  const { data: playMovieData } = useQuery<IGetVideos>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const { data: onTheAirTvData } = useQuery<IGetVideos>(
    ["tvSeries", "onTheAirTV"],
    getTVOntheAir
  );
  return (
    <>
      <Slid
        movies={playMovieData?.results || []}
        title={"현재 상영 중인 영화"}
      />
      <Slid
        movies={onTheAirTvData?.results || []}
        title={"현재 상영 중인 TV시리즈"}
      />
    </>
  );
}

export default CategoryList;
