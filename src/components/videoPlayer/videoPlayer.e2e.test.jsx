import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VideoPlayer from './videoPlayer.jsx';

const movie = {
  name: `Fantastic Beasts: The Crimes of Grindelwald`,
  previewImage: `fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
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
          videoMode = {`small`}
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
          videoMode = {`small`}
        />
    );

    expect(player.props().isPlaying).toEqual(false);
  });
});
