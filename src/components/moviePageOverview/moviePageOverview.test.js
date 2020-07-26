import React from 'react';
import renderer from 'react-test-renderer';

import MoviePageOverview from './moviePageOverView.jsx';
import MOVIES from "../../mocks/films.js";

const movie = MOVIES[1];

it(`Проверяет снепшот компонента FilmPageDetalis`, () => {
  const tree = renderer.create(
      <MoviePageOverview
        movie={movie}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
