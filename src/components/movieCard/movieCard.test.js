import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movieCard.jsx";

const card = {
  src: `img/macbeth.jpg`,
  title: `Movie title`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`Проверка снепшота компонента MovieCard`, () => {
  const tree = renderer
    .create(<MovieCard
      cardData={card}
      onCardHoverHandler={() => {}}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
      renderPlayer={() => {}}
      setActiveItem={() => {}}
      removeActiveItem={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});
