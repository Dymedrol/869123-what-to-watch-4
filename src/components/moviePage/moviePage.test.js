import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

import MoviePage from "./moviePage.jsx";
import NameSpace from "../../reducer/nameSpace.js";
import {Genres} from "../../const.js";
import MOVIES from "../../mocks/films.js";

const mockStore = configureStore([]);

const movie = {
  backgroundColor: `#D8E3E5`,
  backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Moonrise_Kingdom.jpg`,
  description: `A pair of young lovers flee their New England town, which causes a local search party to fan out to find them.`,
  director: `Wes Anderson`,
  genre: `Adventure`,
  id: 2,
  isFavorite: false,
  name: `Moonrise Kingdom`,
  posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Moonrise_Kingdom.jpg`,
  previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/moonrise-kingdom.jpg`,
  previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  rating: 7.9,
  ratingString: `good`,
  released: 2012,
  runTime: 94,
  scoresCount: 291183,
  starring: [`Jared Gilman`, `Kara Hayward`, `Bruce Willis`],
  videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
};

it(`Проверка снепшота компонента Main`, () => {
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
        <MoviePage
          movie={movie}
        />
      </Provider>, {
        createNodeMock: () => {
          return {};
        }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});
