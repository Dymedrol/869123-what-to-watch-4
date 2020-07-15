import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movieCard.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const movie = {
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  src: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`Simulate click on the title`, () => {
  const onMovieTitleClickHandler = jest.fn();
  const onCardHoverHandler = jest.fn();

  const card = mount(
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
