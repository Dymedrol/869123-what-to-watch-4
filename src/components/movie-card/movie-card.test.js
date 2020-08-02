import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";
import {BrowserRouter} from 'react-router-dom';

const card = {
  previewImage: `img/macbeth.jpg`,
  name: `Movie title`,
  previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`Проверка снепшота компонента Header`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <MovieCard
            cardData={card}
            onCardHoverHandler={() => {}}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
            renderPlayer={() => {}}
            setActiveItem={() => {}}
            removeActiveItem={() => {}}
            onMovieCardClickHandler={() => {}}
            playVideo={() => {}}
            stopVideo={() => {}}
          />
        </BrowserRouter>, {
          createNodeMock: () => {
            return {};
          }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});
