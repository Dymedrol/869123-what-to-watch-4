import React from 'react';
import renderer from 'react-test-renderer';
import {PlayS, Add} from './svg.jsx';

it(`Проверка снепшота компонента PlayS`, () => {
  const tree = renderer.create(
      <PlayS/>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Проверка снепшота компонента Add`, () => {
  const tree = renderer.create(
      <Add/>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
