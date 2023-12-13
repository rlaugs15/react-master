const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IVideo {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  name: string;
}

export interface IGetVideos {
  page: number;
  results: IVideo[];
  total_pages: number;
  total_results: number;
}

export async function getMovies() {
  return await fetch(
    `${BASE_PATH}/movie/now_playing?language=ko&page=1&api_key=${API_KEY}`
  ).then((response) => response.json());
}

export async function getSmilar(id: number, releaseDate?: string) {
  return await fetch(
    `${BASE_PATH}/${
      releaseDate ? "movie" : "tv"
    }/${id}/similar?language=ko&page=1&api_key=${API_KEY}`
  ).then((response) => response.json());
}

export async function getTVOntheAir() {
  return await fetch(
    `${BASE_PATH}/tv/on_the_air?language=ko&page=1&api_key=${API_KEY}`
  ).then((response) => response.json());
}

/* export async function getTVSmilar(id: number) {
  return await fetch(
    `${BASE_PATH}/tv/${id}/similar?language=ko&page=1&api_key=${API_KEY}`
  ).then((response) => response.json());
} */
