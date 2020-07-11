import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const mainMovie = {
  title: `Main movie title`,
  genre: `Main movie genre`,
  date: 2020,
};

const movieTitles = [
  `Movie title 1`,
  `Movie title 2`,
  `Movie title 3`
];

describe(`Main e2e test`, () => {
  it(`Клик на title каротчки`, () =>{
    const onMovieTitleClickHandler = jest.fn();
    const main = mount(
        <Main
          title={mainMovie.title}
          genre={mainMovie.genre}
          date={mainMovie.date}
          movies={movieTitles}
          onMovieTitleClickHandler={onMovieTitleClickHandler}
        />
    );
    const titles = main.find(`.small-movie-card__link`);
    expect(titles).toHaveLength(movieTitles.length);
    titles.at(0).simulate(`click`);
    expect(onMovieTitleClickHandler.mock.calls.length).toBe(1);
  });
});
