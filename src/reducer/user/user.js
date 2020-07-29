import {extend} from "../../utils.js";
import {LoginStatus} from '../../const.js';

const initialState = {
  authorizationStatus: LoginStatus.NO_AUTH,
  userAvatar: ``,
};

const ActionType = {
  SET_AUTHORIZATION: `setAuthorization`,
  SET_USER_DATA: `setUserData`
};

const ActionCreator = {
  setAuthorization: (status) => ({
    type: ActionType.SET_AUTHORIZATION,
    payload: status
  }),

  setUserData: (response) => ({
    type: ActionType.SET_USER_DATA,
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
  requestAuthorization: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        const avatarUrl = formatAvatarUrl(response.data.avatar_url);

        const userData = {
          email: response.data.email,
          avatar: `${response.config.baseURL}/${avatarUrl}`,
          statusCode: response.status
        };

        dispatch(ActionCreator.setAuthorization(LoginStatus.AUTH));
        dispatch(ActionCreator.setUserData(userData));
      })
      .catch((err) => {
        throw err;
      });
  },
  loginUser: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
    .then((response) => {
      const avatarUrl = formatAvatarUrl(response.data.avatar_url);

      const userData = {
        email: response.data.email,
        avatar: `${response.config.baseURL}/${avatarUrl}`,
      };

      dispatch(ActionCreator.setAuthorization(LoginStatus.AUTH));
      dispatch(ActionCreator.setUserData(userData));
    })
    .catch((err) => {
      throw err;
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTHORIZATION:
      return extend(state, {authorizationStatus: action.payload});

    case ActionType.SET_USER_DATA:
      return extend(state, {
        userAvatar: action.payload.avatar,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator, Operation};