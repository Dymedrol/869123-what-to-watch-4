import NameSpace from '../nameSpace.js';

export const getMovies = (state) => {
  return state[NameSpace.DATA].movies;
};

export const getPromo = (state) => {
  return state[NameSpace.DATA].promo;
};

