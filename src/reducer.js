import {extend} from "./utils.js";
import {Genres} from "./const.js";
// import MOVIES from "./mocks/films.js";

const initialState = {
  genre: Genres.ALL,
  movies: [],
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  CHANGE_GENRE: `CHANGE_GENRE`,
};

const ActionCreator = {
  loadMovies : (allMovies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: allMovies,
    };
  },
  changeGenre: (genre) => {
    return {
      type: ActionType.CHANGE_GENRE,
      payload: genre,
    };
  },

};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(response.data));
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload
      });
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator, Operation};
