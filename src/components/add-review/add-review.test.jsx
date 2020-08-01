import React from 'react';
import renderer from 'react-test-renderer';
import {AddReview} from './add-review.jsx';
import {LoginStatus} from "../../const.js";
import {BrowserRouter} from 'react-router-dom';
import MOVIES from "../../mocks/films.js";

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

it(`ПРоверка снепшота компонента AddReview`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <AddReview
          movie={movie}
          authorizationStatus = {LoginStatus.NO_AUTH}
          authorizationCode = {``}
          onReviewSubmit = {() => {}}
          match={{params: {id: '1'}, isExact: true, path: "", url: ""}}
          allMovies={MOVIES}
        />
      </BrowserRouter>
      , {
        createNodeMock: () => {
          return {
            addEventListener: () => {}
          };
        }}
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
