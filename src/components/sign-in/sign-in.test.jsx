import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from 'react-router-dom';

import SignIn from "./sign-in.jsx";

it(`Проверка снепшота компонента SignIn`, () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <SignIn
        authorizationCode={``}
        onSignInSubmit={() => {}}
        />
    </BrowserRouter>, {
      createNodeMock: () => {
        return {};
      }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});
