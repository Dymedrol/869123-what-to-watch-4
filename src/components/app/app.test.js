import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from './app.jsx';

import {Genres} from "../../const.js";
import MOVIES from "../../mocks/films.js";

const mockStore = configureStore([]);

const movies = [
  {
    src: `img/macbeth.jpg`,
    title: `Macbeth`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
];

it(`Проверка снепшота компонента App`, () => {
  const store = mockStore({
    genre: Genres.ALL,
    movies: MOVIES,
  });
  const tree = renderer.create(
      <Provider store={store}>
        <App
          movieTitle={`movie title`}
          movieGenre={`movie genre`}
          moviePromoDate={2020}
          movies={movies}
        />
      </Provider>, {
        createNodeMock: () => {
          return {};
        }})
          .toJSON();

  expect(tree).toMatchSnapshot();
});
