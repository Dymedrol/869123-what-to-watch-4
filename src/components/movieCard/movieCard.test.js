import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movieCard.jsx";

const onMovieTitleClickHandler = (event) => {
  event.preventDefault();
};

const card = {
  src: `img/we-need-to-talk-about-kevin.jpg`,
  title: `Movie title`,
};

it(`Проверка снепшота компонента MovieCard`, () => {
  const tree = renderer
    .create(<MovieCard
      cardData={card}
      onMovieTitleClickHandler={onMovieTitleClickHandler}
      onCardHoverHandler={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
