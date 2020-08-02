import React from 'react';
import renderer from 'react-test-renderer';
import ShowMore from './show-more.jsx';

describe(`проверяем ShowMore`, () => {
  it(`проверяем снепшот ShowMore`, () => {
    const tree = renderer.create(
        <ShowMore
          allMoviesLength={20}
          filtredMoviesLength={5}
          onShowMoreClickHandler={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`проверяем снепшот ShowMore без кнопки`, () => {
    const tree = renderer.create(
        <ShowMore
          allMoviesLength={8}
          filtredMoviesLength={10}
          onShowMoreClickHandler={() => {}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
