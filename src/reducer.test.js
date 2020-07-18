import {reducer, ActionType, filterMoviesByGenre} from "./reducer.js";

import {Genres} from "./const.js";
import MOVIES from "./mocks/films.js";

const documentaryMovies = [
  {
    src: `img/revenant.jpg`,
    title: `Revenant`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    genre: `Documentary`,
  }
];

it(`Проверка initState`, ()=>{
  expect(reducer(undefined, {})).toEqual({
    genre: Genres.ALL,
    movies: MOVIES,
    allMovies: MOVIES,
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

it(`Проверка фильтра по жанрам`, ()=>{
  expect(reducer({
    genre: `Documentary`,
    movies: MOVIES,
    allMovies: MOVIES,
  }, {
    type: ActionType.FILTER_MOVIE_BY_GENRE,
    payload: filterMoviesByGenre(`Documentary`),
  })).toEqual({
    allMovies: MOVIES,
    genre: `Documentary`,
    movies: documentaryMovies,
  });
});
