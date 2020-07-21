import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {GenreList} from './genreList.jsx';
import {Genres} from '../../const.js';
import MOVIES from '../../mocks/films.js';

const mockStore = configureStore([]);

it(`render GenresList`, () => {

  const store = mockStore({
    genre: Genres.ALL,
    movies: MOVIES,
    allMovies: MOVIES,
  });

  console.log(store.allMovies)

  const tree = renderer.create(
      <Provider store={store}>
        <GenreList
          genre={Genres.ALL}
          onClick={()=>{}}
          movies={MOVIES}
          allMovies={MOVIES}
        />
      </Provider>, {
        createNodeMock: () => {
          return {};
        }})
    .toJSON();


  expect(tree).toMatchSnapshot();
});
