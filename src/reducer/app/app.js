import {extend} from "../../utils.js";
import {Genres} from "../../const.js";

const initialState = {
  genre: Genres.ALL,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
};

const ActionCreator = {
  changeGenre: (genre) => {
    return {
      type: ActionType.CHANGE_GENRE,
      payload: genre,
    };
  },

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload
      });
  }
  return state;
};


export {reducer, ActionType, ActionCreator};
