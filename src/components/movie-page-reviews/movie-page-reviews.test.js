import React from 'react';
import renderer from 'react-test-renderer';

import MoviePageReviews from './movie-page-reviews.jsx';
import MOVIES from "../../mocks/films.js";

const movie = MOVIES[1];

it(`Проверяет снепшот компонента FilmPageDetalis`, () => {
  const tree = renderer.create(
      <MoviePageReviews
        movie={movie}
        reviews={[]}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
