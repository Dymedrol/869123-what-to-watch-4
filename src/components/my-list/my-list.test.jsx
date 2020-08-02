import React from "react";
import renderer from "react-test-renderer";
import MyList from "./my-list.jsx";
import {LoginStatus} from "../../const.js";
import {BrowserRouter} from 'react-router-dom';

const movies = [
  {
    previewImage: `img/macbeth.jpg`,
    name: `Macbeth`,
    previewVideoLink: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
];

it(`Проверка снепшота компонента MyList`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <MyList
            authorizationStatus={LoginStatus.NO_AUTH}
            userAvatar={``}
            myList={movies}
            onMovieCardClickHandler={() => {}}
          />
        </BrowserRouter>
        , {
          createNodeMock: () => {
            return {};
          }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});
