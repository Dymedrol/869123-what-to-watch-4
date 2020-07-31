import {extend} from "../../utils.js";
import {LoginStatus} from '../../const.js';

const initialState = {
  authorizationStatus: LoginStatus.NO_AUTH,
  userAvatar: ``,
  authorizationCode: null
};

const ActionType = {
  SET_AUTHORIZATION: `setAuthorization`,
  SET_USER_DATA: `setUserData`,
  SET_AUTHORIZATION_CODE: `setAutorizationCode`,
};

const ActionCreator = {
  setAuthorization: (status) => ({
    type: ActionType.SET_AUTHORIZATION,
    payload: status
  }),

  setUserData: (response) => ({
    type: ActionType.SET_USER_DATA,
    payload: response
  }),
  setAuthorizationCode: (response) => ({
    type: ActionType.SET_AUTHORIZATION_CODE,
    payload: response
  })
};

const Operation = {
  requestAuthorization: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        const userData = {
          email: response.data.email,
          avatar: `https://4.react.pages.academy${response.data.avatar_url}`,
          statusCode: response.status
        };

        dispatch(ActionCreator.setAuthorization(LoginStatus.AUTH));
        dispatch(ActionCreator.setUserData(userData));
      })
      .catch((err) => {
        throw err;
      });
  },
  loginUser: (data) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: data.formData.login,
      password: data.formData.password,
    })
    .then((response) => {

      const userData = {
        email: response.data.email,
        avatar: `${response.config.baseURL}/${response.data.avatar_url}`,
      };

      dispatch(ActionCreator.setAuthorization(LoginStatus.AUTH));
      dispatch(ActionCreator.setUserData(userData));
    })
    .catch((err) => {
      dispatch(ActionCreator.setAuthorizationCode(err.response.status));
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

    case ActionType.SET_AUTHORIZATION_CODE:
      return extend(state, {
        authorizationCode: action.payload,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator, Operation};
