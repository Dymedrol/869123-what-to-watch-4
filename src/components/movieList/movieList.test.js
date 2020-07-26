import React from "react";
import renderer from "react-test-renderer";

import {MovieList} from "./movieList.jsx";
import MOVIES from "../../mocks/films.js";

it(`Проверка снепшота компонента MovieList`, () => {

  const tree = renderer
    .create(
        <MovieList
          setActiveItem={() => {}}
          removeActiveItem={() => {}}
          onMovieCardClickHandler={() => {}}
          movies = {MOVIES}
        />, {
          createNodeMock: () => {
            return {};
          }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});
