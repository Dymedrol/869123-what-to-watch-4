import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from './main.jsx';
import {BrowserRouter} from 'react-router-dom';

import {Genres, LoginStatus} from "../../const.js";
import MOVIES from "../../mocks/films.js";

import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

const promoMovie = {
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

const movies = [
  {
    previewImage: `img/macbeth.jpg`,
    name: `Macbeth`,
    previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
];

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
      <BrowserRouter>
        <Provider store={store}>
          <Main
            movies={movies}
            onMovieTitleClickHandler = {() => {}}
            onMovieCardClickHandler={() => {}}
            onShowMoreClickHandler={() => {}}
            movieListCount={8}
            promoMovie={promoMovie}
            authorizationStatus = {LoginStatus.NO_AUTH}
            userAvatar={``}
          />
        </Provider>
      </BrowserRouter>
      , {
        createNodeMock: () => {
          return {};
        }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});
