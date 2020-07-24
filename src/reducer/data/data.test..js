import MockAdapter from 'axios-mock-adapter';
import {reducer, ActionType, Operation} from './data.js';
import {createAPI} from './../../api.js';


const api = createAPI(() => {});

it(`Проверка initState`, () => {
  expect(reducer(void 0, {})).toEqual({
    movies: [],
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
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_MOVIES,
        payload: [{fake: true}],
      });
    });
});


