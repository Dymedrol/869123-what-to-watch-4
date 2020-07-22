import {reducer, ActionType} from './app.js';
import {Genres} from "../../const.js";
import MOVIES from "../../mocks/films.js";

it(`Проверка initState`, () => {
  expect(reducer(void 0, {})).toEqual({
    genre: Genres.ALL,
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
