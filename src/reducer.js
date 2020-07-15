import {extend} from "./utils.js";
import {Genres} from "./const.js";
import MOVIES from "./mocks/films.js";

const initialState = {
  genre: Genres.ALL,
  movies: MOVIES,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  FILTER_MOVIE_BY_GENRE: `FILTER_MOVIE_BY_GENRE`,
};

const ActionCreator = {
  changeGenre: (genre) => {
    return {
      type: ActionType.CHANGE_GENRE,
      payload: genre,
    };
  },

  getFilmsByGenre: (movies, genre) => {
    return {
      type: ActionType.FILTER_MOVIE_BY_GENRE,
      payload: filterMoviesByGenre(genre, movies),
    };
  }
};

const allMovies = initialState.movies;

const filterMoviesByGenre = (genre) => {
  if (genre === Genres.ALL) {
    return allMovies;
  }
  return allMovies.filter((movie) => movie.genre === genre);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload
      });

    case ActionType.FILTER_MOVIE_BY_GENRE:
      return extend(state, {
        movies: filterMoviesByGenre(state.genre),
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator, filterMoviesByGenre};
