import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movieCard.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const movie = {
  name: `Fantastic Beasts: The Crimes of Grindelwald`,
  previewImage: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`Simulate click on the title`, () => {
  const onMouseEnter = jest.fn();
  const onMouseLeave = jest.fn();
  const renderPlayer = jest.fn();
  const setActiveItem = jest.fn();
  const removeActiveItem = jest.fn();
  const onMovieCardClickHandler = jest.fn();

  const card = mount(
      <MovieCard
        title={movie.title}
        pic={movie.src}
        cardData={movie}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        renderPlayer={renderPlayer}
        setActiveItem={setActiveItem}
        removeActiveItem={removeActiveItem}
        onMovieCardClickHandler={onMovieCardClickHandler}

      />
  );

  card.simulate(`mouseenter`);

  expect(onMouseEnter).toHaveBeenCalledTimes(1);
});
