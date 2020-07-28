import React from "react";
import renderer from "react-test-renderer";

import withVideoPlayer from "./withVideoPlayer.jsx";

const Component = () => {
  return (
    <div>
      <p>text</p>
    </div>
  );
};

const WrappedComponent = withVideoPlayer(Component);

it(`Проверяет снепшот хока withPlayer`, () => {
  const tree = renderer.create(
      <WrappedComponent
        isMuted={true}
        videoMode={`fullscreen`}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
