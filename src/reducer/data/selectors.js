import NameSpace from '../nameSpace.js';

export const getMovies = (state) => {
    console.log('@@@')
    console.log(state[NameSpace.DATA].movies)
  return state[NameSpace.DATA].movies;
};

export const getPromo = (state) => {
  return state[NameSpace.DATA].promo;
};

export const getfavoriteMovies = (state) => {
  return state[NameSpace.DATA].favoriteMovies;
};

