import NameSpace from './../name-space';

export const getAuthorizationStatus = (state) => {
  return state[NameSpace.USER].authorizationStatus;
};

export const getAuthorizationStatusCode = (state) => {
  return state[NameSpace.USER].authorizationStatusCode;
};

export const getUserAvatar = (state) => {
  return state[NameSpace.USER].userAvatar;
};