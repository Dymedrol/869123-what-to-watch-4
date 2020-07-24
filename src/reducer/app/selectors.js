import {createSelector} from "reselect";
import {Genres} from "./../../const.js";
import NameSpace from '../nameSpace.js';
import {getMovies} from '../data/selectors.js';

export const getGenre = (state) => {
  return state[NameSpace.APP].genre;
};

export const getMoviesByGenre = createSelector(
    [getGenre, getMovies],
    (genre, movies) => {
      if (genre === Genres.ALL) {
        return movies;
      }
      return movies.filter((movie) => movie.genre === genre);
    }
);

export const getGenreList = createSelector(
    [getMovies],
    (movies) => {
      const genres = new Set();
      genres.add(`All genres`);
      movies.forEach((movie) => {
        genres.add(movie.genre);
      });
      const genreList = Array.from(genres);

      return genreList;
    }
);
