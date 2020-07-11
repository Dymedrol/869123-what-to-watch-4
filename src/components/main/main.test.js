import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

it(`Проверка снепшота компонента Main`, () => {
  const tree = renderer.create(
      <Main
        title={`movie title`}
        genre={`movie genre`}
        date={2020}
        movies={[`movie 1`, `movie 2`, `movie 3`]}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
