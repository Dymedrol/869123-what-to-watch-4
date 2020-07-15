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

const movies = [
  {
    src: `img/macbeth.jpg`,
    title: `Macbeth`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
];

describe(`Main e2e test`, () => {
  it(`Клик на title каротчки`, () =>{
    const onMovieTitleClickHandler = jest.fn();
    const main = mount(
        <Main
          title={mainMovie.title}
          genre={mainMovie.genre}
          date={mainMovie.date}
          movies={movies}
          onMovieTitleClickHandler={onMovieTitleClickHandler}
        />
    );
    const titles = main.find(`.small-movie-card__link`);
    expect(titles).toHaveLength(movies.length);
    titles.at(0).simulate(`click`);
    expect(onMovieTitleClickHandler.mock.calls.length).toBe(1);
  });
});
