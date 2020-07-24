import {createSelector} from "reselect";
import {Genres} from "./../../const.js";
import NameSpace from '../nameSpace.js';

export const getGenre = (state) => {
  return state[NameSpace.APP].genre;
};

const filterMoviesByGenre = (state) => {
  const currentGenre = state[NameSpace.APP].genre;
  const allMovies = state[NameSpace.DATA].movies;
  if (currentGenre === Genres.ALL) {
    return allMovies;
  }
  return allMovies.filter((movie) => movie.genre === currentGenre);
};

export const getMoviesByGenre = createSelector(
    (state) => state,
    filterMoviesByGenre
);

const makeGenreList = (state) => {
  const movies = state[NameSpace.DATA].movies;
  const genres = new Set();
  genres.add(`All genres`);
  movies.forEach((movie) => {
    genres.add(movie.genre);
  });
  const genreList = Array.from(genres);

  return genreList;
};

export const getGenreList = createSelector(
    (state) => state,
    makeGenreList
);
