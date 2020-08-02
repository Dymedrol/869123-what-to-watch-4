import NameSpace from '../name-space.js';

export const getAuthorizationStatus = (state) => {
  return state[NameSpace.USER].authorizationStatus;
};

export const getUserAvatar = (state) => {
  return state[NameSpace.USER].userAvatar;
};

export const getAuthorizationCode = (state) => {
  return state[NameSpace.USER].authorizationCode;
};

export const getReviews = (state) => {
  return state[NameSpace.USER].reviews;
};
