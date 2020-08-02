import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";

it(`Проверка снепшота компонента MoviSignIneCard`, () => {
  const tree = renderer
    .create(<SignIn
      authorizationCode={``}
      onSignInSubmit={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});
