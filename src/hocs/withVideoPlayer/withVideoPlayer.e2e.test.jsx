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
      onMouseLeave,
      renderPlayer,
      cardData,
    } = props;

    return (
      <article>
        {renderPlayer(cardData)}
      </article>
    );
  };

  const MockComponentWrapped = withVideoPlayer(MockComponent);


  it(`рендер withVideoPlayer`, () => {

    const wrapper = mount(<MockComponentWrapped
      cardData = {cardData}
        setActiveItem = {false}
        onActiveItemChange = {() => {}}
        removeActiveItem = {() => {}}
    />);

    window.HTMLMediaElement.prototype.play = () => {};

    // console.log('asdasd  ', wrapper.find('video').instance());

    const video = wrapper.find('video');

    console.log('11111  ', video.instance())

    const {_videoRef} = video.instance();

    jest.spyOn(_videoRef.current, `play`);

    wrapper.instance().componentDidMount();

    wrapper.find(`article`).simulate(`mouseover`);

    expect(_videoRef.current.play).toHaveBeenCalledTimes(1);


  });
});
