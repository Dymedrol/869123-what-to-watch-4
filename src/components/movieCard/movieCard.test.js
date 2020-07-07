import React from 'react';
import renderer from 'react-test-renderer';
import {MovieCard} from './movieCard.jsx';

it(`Проверка снепшота компонента MovieCard`, () => {
  const tree = renderer.create(
      <MovieCard
        title={`movie`}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
