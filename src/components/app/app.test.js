import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';

it(`Проверка снепшота компонента App`, () => {
  const tree = renderer.create(
      <App
        title={`movie title`}
        genre={`movie genre`}
        date={2020}
        movies={[`movie 1`, `movie 2`, `movie 3`]}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
