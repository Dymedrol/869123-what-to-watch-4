import {reducer, ActionType} from "./reducer.js";

import {Genres} from "./const.js";
import MOVIES from "./mocks/films.js";

it(`Проверка initState`, ()=>{
  expect(reducer(undefined, {})).toEqual({
    genre: Genres.ALL,
    movies: MOVIES,
  });
});

it(`Проверка смены жанра`, ()=>{
  expect(reducer({
    genre: Genres.ALL,
    movies: MOVIES,
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: Genres.CRIME
  })).toEqual({
    genre: Genres.CRIME,
    movies: MOVIES,
  });
});
