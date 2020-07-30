import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from './main.jsx';

import {Genres, LoginStatus} from "../../const.js";
import MOVIES from "../../mocks/films.js";
import NameSpace from "../../reducer/nameSpace.js";

const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter(),
});

const movieMock = {
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

describe(`Main e2e test`, () => {
  it(`ПРоверяем отрисовку карточек`, () =>{

    const store = mockStore({
      [NameSpace.APP]: {
        genre: Genres.ALL,
      },
      [NameSpace.DATA]: {
        movies: MOVIES,
      },
    });

    const main = mount(
        <Provider store={store}>
          <Main
            promoMovie={movieMock}
            onMovieCardClickHandler={() => {}}
            onShowMoreClickHandler={() => {}}
            movieListCount={8}
            authorizationStatus = {LoginStatus.NO_AUTH}
          />
        </Provider>
    );
    const titles = main.find(`.small-movie-card__link`);
    expect(titles).toHaveLength(MOVIES.length);
  });
});
