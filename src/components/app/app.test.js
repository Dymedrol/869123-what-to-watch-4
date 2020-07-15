import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const movies = [
  {
    src: `img/macbeth.jpg`,
    title: `Macbeth`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
];

it(`Проверка снепшота компонента App`, () => {
  const tree = renderer.create(
      <App
        title={`movie title`}
        genre={`movie genre`}
        date={2020}
        movies={movies}
      />, {
        createNodeMock: () => {
          return {};
        }})
          .toJSON();

  expect(tree).toMatchSnapshot();
});
