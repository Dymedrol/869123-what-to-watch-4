import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ShowMore from './showMore.jsx';

Enzyme.configure({
  adapter: new Adapter()
});

it(`Проверяем клик на showMore`, () => {
  const onShowMoreClickHandler = jest.fn();

  const showMore = shallow(
      <ShowMore
        allMoviesLength={8}
        filtredMoviesLength={5}
        onShowMoreClickHandler={onShowMoreClickHandler}
      />
  );

  const button = showMore.find(`button.catalog__button`);

  button.simulate(`click`);

  expect(onShowMoreClickHandler).toHaveBeenCalledTimes(1);
});
