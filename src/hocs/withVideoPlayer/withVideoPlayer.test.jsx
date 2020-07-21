import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";

import withVideoPlayer from "./withVideoPlayer.jsx";

describe(`Проверка снэпшота withVideoPlayer`, () => {

  const card = {
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
      <article
        onMouseEnter = {onMouseEnter}
        onMouseLeave = {onMouseLeave}
        cardData = {card}
        isPlaying = {false}
      >
        {renderPlayer(cardData)}
      </article>
    );
  };

  MockComponent.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    cardData: PropTypes.shape({
      title: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      preview: PropTypes.string.isRequired,
    }),
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    renderPlayer: PropTypes.func.isRequired,
  };


  const MockComponentWrapped = withVideoPlayer(MockComponent);

  it(`рендер withVideoPlayer`, () => {
    const tree = renderer.create((
      <MockComponentWrapped
        setActiveItem = {false}
        onActiveItemChange = {() => {}}
        removeActiveItem = {() => {}}
        cardData = {card}
      />), {
      createNodeMock() {
        return {};
      }
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
