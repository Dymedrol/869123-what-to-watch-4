import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from 'react-router-dom';

import {MovieList} from "./movie-list.jsx";
import MOVIES from "../../mocks/films.js";

it(`Проверка снепшота компонента MovieList`, () => {

  const tree = renderer
    .create(
        <BrowserRouter>
          <MovieList
            setActiveItem={() => {}}
            removeActiveItem={() => {}}
            onMovieCardClickHandler={() => {}}
            movies = {MOVIES}
          />
        </BrowserRouter>, {
          createNodeMock: () => {
            return {};
          }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});
