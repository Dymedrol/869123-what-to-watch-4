import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from "./videoPlayer.jsx";

const movie = {
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  src: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`VideoPlayer is rendered correctly`, () => {
  const tree = renderer.create(<VideoPlayer
    isPlaying = {true}
    cardData = {movie}
    isMuted = {true}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
