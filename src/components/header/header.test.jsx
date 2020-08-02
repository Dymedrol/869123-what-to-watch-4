import React from "react";
import renderer from "react-test-renderer";
import {Header} from "./header.jsx";
import {BrowserRouter} from 'react-router-dom';

import {LoginStatus} from "../../const.js";

it(`Проверка снепшота компонента Header`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <Header
            authorizationStatus = {LoginStatus.AUTH}
            userAvatar={``}
          />
        </BrowserRouter>, {
          createNodeMock: () => {
            return {};
          }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});
