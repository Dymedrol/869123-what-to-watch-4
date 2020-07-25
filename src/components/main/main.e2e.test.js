import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from './main.jsx';

import {Genres} from "../../const.js";
import MOVIES from "../../mocks/films.js";
import NameSpace from "../../reducer/nameSpace.js";

const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter(),
});

const mainMovie = {
  title: `Main movie title`,
  genre: `Main movie genre`,
  date: 2020,
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
            title={mainMovie.title}
            genre={mainMovie.genre}
            date={mainMovie.date}
            onMovieCardClickHandler={() => {}}
          />
        </Provider>
    );
    const titles = main.find(`.small-movie-card__link`);
    expect(titles).toHaveLength(MOVIES.length);
  });
});
