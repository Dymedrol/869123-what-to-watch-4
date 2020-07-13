import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movieCard.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const movie = {
  src: `img/bohemian-rhapsody.jpg`,
  title: `Bohemian Rhapsody`,
};

it(`Simulate click on the title`, () => {
  const onMovieTitleClickHandler = jest.fn();
  const onCardHoverHandler = jest.fn();

  const card = shallow(
      <MovieCard
        title={movie.title}
        pic={movie.src}
        cardData={movie}
        onMovieTitleClickHandler={onMovieTitleClickHandler}
        onCardHoverHandler={onCardHoverHandler}
      />
  );

  const title = card.find(`.small-movie-card__title`);
  title.simulate(`click`);

  card.simulate(`mouseenter`);

  expect(onMovieTitleClickHandler).toHaveBeenCalledTimes(1);
  expect(onCardHoverHandler).toHaveBeenCalledTimes(1);
});
