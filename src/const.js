const Genres = {
  ALL: `All genres`,
  COMEDIES: `Comedies`,
  CRIME: `Crime`,
  DOCUMENTARY: `Documentary`,
  DRAMA: `Drama`,
  HORROR: `Horror`,
  KIDS_FAMILY: `Kids & Family`,
  ROMANCE: `Romance`,
  SCI_FI: `Sci-Fi`,
  THRILLERS: `Thrillers`,
};

const Tabs = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`
};

const MovieListStep = {
  MAIN: 8,
  MOVIEPAGE: 4,
};

const VideoPlayerModes = {
  SMALL: `small`,
  FULLSCREEN: `fullscreen`,
};

const Errors = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

const LoginStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
};

const ReviewLength = {
  MIN: 50,
  MAX: 400,
};

const AppRoute = {
  ROOT: `/`,
  MOVIE_PAGE: `/films`,
  LOGIN: `/login`,
  ADD_REVIEW: `/review`,
  MY_LIST: `/mylist`,
  PLAYER: `/player`
};

export {Genres, Tabs, MovieListStep, VideoPlayerModes, Errors, LoginStatus, ReviewLength, AppRoute};
