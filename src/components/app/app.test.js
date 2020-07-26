import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from './app.jsx';

import {Genres} from "../../const.js";
import MOVIES from "../../mocks/films.js";
import NameSpace from "../../reducer/nameSpace.js";

const mockStore = configureStore([]);

const movies = [
  {
    previewImage: `img/macbeth.jpg`,
    name: `Macbeth`,
    previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
];

it(`Проверка снепшота компонента App`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      genre: Genres.ALL,
    },
    [NameSpace.DATA]: {
      movies: MOVIES,
    },
  });
  const tree = renderer.create(
      <Provider store={store}>
        <App
          movieTitle={`movie title`}
          movieGenre={`movie genre`}
          moviePromoDate={2020}
          movies={movies}
          onMovieCardClickHandler={() => {}}
        />
      </Provider>, {
        createNodeMock: () => {
          return {};
        }})
          .toJSON();

  expect(tree).toMatchSnapshot();
});
