import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from './main.jsx';

import {Genres} from "../../const.js";
import MOVIES from "../../mocks/films.js";

const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter(),
});

const mainMovie = {
  title: `Main movie title`,
  genre: `Main movie genre`,
  date: 2020,
};

const movies = [
  {
    src: `img/macbeth.jpg`,
    title: `Macbeth`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
];

describe(`Main e2e test`, () => {
  it(`ПРоверяем отрисовку карточек`, () =>{

    const store = mockStore({
      genre: Genres.ALL,
      movies: MOVIES,
      allMovies: MOVIES,
    });

    const main = mount(
        <Provider store={store}>
          <Main
            title={mainMovie.title}
            genre={mainMovie.genre}
            date={mainMovie.date}
            movies={movies}
          />
        </Provider>
    );
    const titles = main.find(`.small-movie-card__link`);
    expect(titles).toHaveLength(movies.length);
  });
});
