import React from "react";
import renderer from "react-test-renderer";
import MovieList from "./movieList.jsx";

const movies = [{
  title: `Title`,
  src: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
}];

it(`Проверка снепшота компонента MovieList`, () => {
  const tree = renderer
    .create(<MovieList
      movies={movies}
      onMovieTitleClickHandler={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});
