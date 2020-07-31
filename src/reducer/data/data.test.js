import MockAdapter from 'axios-mock-adapter';
import {reducer, Operation} from './data.js';
import {createAPI} from './../../api.js';

const testMovies = [
  {
    backgroundColor: `#A6B7AC`,
    backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
    description: `In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.`,
    director: `Martin Scorsese`,
    genre: `Crime`,
    id: 1,
    isFavorite: false,
    name: `Gangs of new york`,
    posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
    previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
    previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    rating: 8.8,
    released: 2002,
    ratingString: `good`,
    runTime: 167,
    scoresCount: 370881,
    starring: [`Leonardo DiCaprio`, `Cameron Diaz`, `Daniel Day-Lewis`],
    videoLink: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`
  },
  {
    backgroundColor: `#D8E3E5`,
    backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Moonrise_Kingdom.jpg`,
    description: `A pair of young lovers flee their New England town, which causes a local search party to fan out to find them.`,
    director: `Wes Anderson`,
    genre: `Adventure`,
    id: 2,
    isFavorite: false,
    name: `Moonrise Kingdom`,
    posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Moonrise_Kingdom.jpg`,
    previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/moonrise-kingdom.jpg`,
    previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    rating: 7.9,
    ratingString: `good`,
    released: 2012,
    runTime: 94,
    scoresCount: 291183,
    starring: [`Jared Gilman`, `Kara Hayward`, `Bruce Willis`],
    videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  },
];

const api = createAPI(() => {});

it(`Проверка initState`, () => {
  expect(reducer(void 0, {})).toEqual({
    movies: [],
    promo: {},
    favoriteMovies: [],
  });
});

it(`Проверка вызова к апи /films`, function () {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const moviesLoader = Operation.loadMovies();

  apiMock
    .onGet(`/films`)
    .reply(200, [{fake: true}]);

  return moviesLoader(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
});

it(`Reducer при не правильном ActionType возвращает initState`, () => {
  expect(reducer({
    movies: [],
    promo: {},
    favoriteMovies: [],
  }, {
    type: null,
    payload: testMovies
  })).toEqual({
    movies: [],
    promo: {},
    favoriteMovies: [],
  });
});

it(`Проверка вызова к апи /films/promo`, function () {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const loadPromo = Operation.loadPromo();

  apiMock
    .onGet(`/films/promo`)
    .reply(200, [{fake: true}]);

  return loadPromo(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
});

it(`Проверка вызова к апи /favorite`, function () {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const loadFavorite = Operation.loadFavorite();

  apiMock
    .onGet(`/favorite`)
    .reply(200, [{fake: true}]);

  return loadFavorite(dispatch, () => {}, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
});
