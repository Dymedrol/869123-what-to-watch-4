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
      title={card.title}
      pic={card.src}
      card={card}
      onMovieTitleClickHandler={onMovieTitleClickHandler}
      onCardHoverHandler={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
