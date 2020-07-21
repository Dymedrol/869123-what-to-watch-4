import React from "react";
import PropTypes from "prop-types";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withVideoPlayer from "./withVideoPlayer.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Проверка withVideoPlayer `, () => {

  const cardData = {
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    src: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    preview: `https://www.kinomania.ru/load/n?file=//fs.kinomania.ru/media/video/a/e1/ae1ea61fe9c315fbd913c38d6ddc7c0d.480.mp4`,
  };

  const MockComponent = (props) => {
    const {
      onMouseEnter,
      renderPlayer,
    } = props;

    return (
      <article
        onMouseEnter={() => {
          onMouseEnter();
        }}
      >
        {renderPlayer(cardData)}
      </article>
    );
  };

  MockComponent.propTypes = {
    onMouseEnter: PropTypes.func.isRequired,
    renderPlayer: PropTypes.func.isRequired,
    cardData: PropTypes.object.isRequired,
  };

  const MockComponentWrapped = withVideoPlayer(MockComponent);


  it(`рендер withVideoPlayer`, () => {

    const wrapper = mount(<MockComponentWrapped
      cardData = {cardData}
    />);

    window.HTMLMediaElement.prototype.play = () => {};
    const video = wrapper.find(`video`);
    jest.spyOn(video.instance(), `play`);
    wrapper.find(`article`).simulate(`mouseenter`);

    // expect(video.instance().play).toHaveBeenCalledTimes(1);

    setTimeout(() => {
      expect(video.instance().play).toHaveBeenCalledTimes(1);
    }, 1500);

  });
});
