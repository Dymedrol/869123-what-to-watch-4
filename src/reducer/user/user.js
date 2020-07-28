import {extend} from "../../utils.js";
import {LoginStatus} from '../../const.js';

const initialState = {
  authorizationStatus: LoginStatus.NO_AUTH,
  userAvatar: ``,
  authorizationStatusCode: null
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `requiredAuthorization`,
  BAD_AUTHORIZATION: `badAuthorization`,
  CORRECT_AUTHORIZATION: `correctAuthorization`
};

const ActionCreator = {
  requiredAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status
  }),

  badAuthorization: (response) => ({
    type: ActionType.BAD_AUTHORIZATION,
    payload: response
  }),

  correctAuthorization: (response) => ({
    type: ActionType.CORRECT_AUTHORIZATION,
    payload: response
  })
};

const formatAvatarUrl = (url) => {
  const splittedUrl = url.split(`/`);
  const newLinkArr = splittedUrl.slice(2, splittedUrl.length);
  const newUrl = newLinkArr.join(`/`);

  return newUrl;
};

const Operation = {
  requiredAuthorization: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        const avatarUrl = formatAvatarUrl(response.data.avatar_url);

        const userData = {
          email: response.data.email,
          avatar: `${response.config.baseURL}/${avatarUrl}`,
          statusCode: response.status
        };

        dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.correctAuthorization(userData));
      })
      .catch((err) => {
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {authorizationStatus: action.payload});

    case ActionType.BAD_AUTHORIZATION:
      return extend(state, {
        authorizationStatusCode: action.payload
      });

    case ActionType.CORRECT_AUTHORIZATION:
      return extend(state, {
        userAvatar: action.payload.avatar,
        authorizationStatusCode: action.payload.statusCode,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator, Operation};