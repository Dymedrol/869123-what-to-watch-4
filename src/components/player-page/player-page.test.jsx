import React from "react";
import renderer from "react-test-renderer";
import {PlayerPage} from "./player-page.jsx";
import {BrowserRouter} from 'react-router-dom';

import MOVIES from "../../mocks/films.js";

it(`Проверка снепшота компонента PlayerPage`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <PlayerPage
            allMovies={MOVIES}
            match={{params: {id: `0`}, isExact: true, path: ``, url: ``}}
            playVideo={() => {}}
          />
        </BrowserRouter>, {
          createNodeMock: () => {
            return {};
          }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});
