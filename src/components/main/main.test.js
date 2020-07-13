import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

const movies = [
  {
    src: `img/macbeth.jpg`,
    title: `Macbeth`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
];

it(`Проверка снепшота компонента Main`, () => {
  const tree = renderer.create(
      <Main
        title={`movie title`}
        genre={`movie genre`}
        date={2020}
        movies={movies}
        onMovieTitleClickHandler = {() => {}}
      />, {
        createNodeMock: () => {
          return {};
        }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});
