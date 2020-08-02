import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import {Player} from './player.jsx';

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

it(`ПРоверка снепшота компонента Player`, () => {
  const tree = renderer.create(
      <BrowserRouter>
        <Player
          movie={movie}
          playVideo={() => {}}
          onExitButtonHandler={() => {}}
          renderPlayer={() => {}}
          pauseVideo={() => {}}
          changeFullScreen={() => {}}
          isVideoPlaying={false}
          isVideoPaused={false}
          progress={0}
          duration={100}
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
