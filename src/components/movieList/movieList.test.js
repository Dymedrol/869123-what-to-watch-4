import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import MovieList from "./movieList.jsx";
import NameSpace from "../../reducer/nameSpace.js";
import {Genres} from "../../const.js";


const mockStore = configureStore([]);

const movies = [{
  name: `Title`,
  previewImage: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
}];

it(`Проверка снепшота компонента MovieList`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      genre: Genres.ALL,
    },
    [NameSpace.DATA]: movies,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <MovieList
            movies={movies}
            setActiveItem={() => {}}
            removeActiveItem={() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});
