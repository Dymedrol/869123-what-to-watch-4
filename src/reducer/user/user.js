import {extend} from "../../utils.js";
import {LoginStatus} from '../../const.js';
import history from "../../history.js";

const initialState = {
  authorizationStatus: LoginStatus.NO_AUTH,
  userAvatar: ``,
  authorizationCode: null,
  reviews: [],
};

const ActionType = {
  SET_AUTHORIZATION: `setAuthorization`,
  SET_USER_DATA: `setUserData`,
  SET_AUTHORIZATION_CODE: `setAutorizationCode`,
  SEND_REVIEW: `createReview`,
  LOAD_REVIEW: `loadReview`,
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
  }),
  createReview: (review) => ({
    type: ActionType.SEND_REVIEW,
    payload: review
  }),
  loadReview: (review) => ({
    type: ActionType.LOAD_REVIEW,
    payload: review
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
        avatar: `https://4.react.pages.academy${response.data.avatar_url}`,
      };

      dispatch(ActionCreator.setAuthorization(LoginStatus.AUTH));
      dispatch(ActionCreator.setUserData(userData));

    })
    .catch((err) => {
      dispatch(ActionCreator.setAuthorizationCode(err.response.status));
      throw err;
    });
  },
  sendReview: (review, callback) => (dispatch, getState, api) => {
    return api.post(`/comments/${review.id}`, {
      rating: review.rating,
      comment: review.comment
    })
    .then(() => {
      callback();
      history.push(`/films/${review.id}`);
      location.reload();
    })
    .catch((err) => {
      throw err;
    });
  },
  loadReview: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.loadReview(response.data));
      })
      .catch((err) => {
        throw err;
      });
  },
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

    case ActionType.LOAD_REVIEW:
      return extend(state, {
        reviews: action.payload,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator, Operation};
