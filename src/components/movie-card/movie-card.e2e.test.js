import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card.jsx";
import {BrowserRouter} from 'react-router-dom';

Enzyme.configure({
  adapter: new Adapter(),
});

const movie = {
  name: `Fantastic Beasts: The Crimes of Grindelwald`,
  previewImage: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`Проверка наведения на карточку`, () => {
  const renderPlayer = jest.fn();
  const setActiveItem = jest.fn();
  const removeActiveItem = jest.fn();
  const onMovieCardClickHandler = jest.fn();
  const playVideo = jest.fn();
  const stopVideo = jest.fn();

  const movieCard = mount(
      <BrowserRouter>
        <MovieCard
          title={movie.title}
          pic={movie.src}
          cardData={movie}
          renderPlayer={renderPlayer}
          setActiveItem={setActiveItem}
          removeActiveItem={removeActiveItem}
          onMovieCardClickHandler={onMovieCardClickHandler}
          playVideo={playVideo}
          stopVideo={stopVideo}
        />
      </BrowserRouter>
  );

  const card = movieCard.find(`.small-movie-card`);

  card.simulate(`mouseenter`);
  card.simulate(`mouseleave`);

  expect(playVideo).toHaveBeenCalledTimes(1);
  expect(stopVideo).toHaveBeenCalledTimes(1);
});
