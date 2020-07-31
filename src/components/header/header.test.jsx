import React from "react";
import renderer from "react-test-renderer";
import {Header} from "./header.jsx";

import {LoginStatus} from "../../const.js";

it(`Проверка снепшота компонента Header`, () => {
  const tree = renderer
    .create(<Header
      authorizationStatus = {LoginStatus.AUTH}
      userAvatar={``}
    />, {
      createNodeMock: () => {
        return {};
      }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});
