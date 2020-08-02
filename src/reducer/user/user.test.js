import {reducer, ActionType} from './user.js';
import {LoginStatus} from '../../const.js';

it(`Проверка initState`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: LoginStatus.NO_AUTH,
    userAvatar: ``,
    authorizationCode: null,
    reviews: [],
  });
});

it(`Проверка setAuthorization`, () => {
  expect(reducer({
    authorizationStatus: LoginStatus.NO_AUTH,
    userAvatar: ``,
    authorizationCode: null,
    reviews: [],
  }, {
    type: ActionType.SET_AUTHORIZATION,
    payload: LoginStatus.AUTH
  })).toEqual({
    authorizationStatus: LoginStatus.AUTH,
    userAvatar: ``,
    authorizationCode: null,
    reviews: [],
  });
});

