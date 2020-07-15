import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movieCard.jsx";

const onMovieTitleClickHandler = (event) => {
  event.preventDefault();
};

const card = {
  src: `img/macbeth.jpg`,
  title: `Movie title`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`Проверка снепшота компонента MovieCard`, () => {
  const tree = renderer
    .create(<MovieCard
      cardData={card}
      onMovieTitleClickHandler={onMovieTitleClickHandler}
      onCardHoverHandler={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});
