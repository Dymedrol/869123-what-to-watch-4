import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VideoPlayer from './videoPlayer.jsx';

const movie = {
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  src: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Тест состояний плеера`, () => {
  it(`Состояние Play`, () => {
    const player = mount(
        <VideoPlayer
          isPlaying = {true}
          cardData = {movie}
          isMuted = {true}
        />
    );

    expect(player.props().isPlaying).toEqual(true);
  });

  it(`Состояние stop`, () => {
    const player = mount(
        <VideoPlayer
          isPlaying = {false}
          cardData = {movie}
          isMuted = {true}
        />
    );

    expect(player.props().isPlaying).toEqual(false);
  });
});
