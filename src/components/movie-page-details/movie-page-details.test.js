import React from 'react';
import renderer from 'react-test-renderer';

import MoviePageDetails from './movie-page-details.jsx';
import MOVIES from "../../mocks/films.js";

const movie = MOVIES[1];

it(`Проверяет снепшот компонента FilmPageDetalis`, () => {
  const tree = renderer.create(
      <MoviePageDetails
        movie={movie}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
