import {extend} from "../../utils.js";

const initialState = {
  movies: [],
  promo: {},
  favoriteMovies: [],
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO: `LOAD_PROMO`,
  LOAD_FAVORITE: `LOAD_FAVORITE`,
};

const ActionCreator = {
  loadMovies: (allMovies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: allMovies.map(parceMovietoCamalCase),
    };
  },
  loadPromo: (promo) => {
    return {
      type: ActionType.LOAD_PROMO,
      payload: parceMovietoCamalCase(promo),
    };
  },
  loadFavorite: (favoriteMovies) => {
    return {
      type: ActionType.LOAD_FAVORITE,
      payload: favoriteMovies.map(parceMovietoCamalCase),
    };
  }
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(response.data));
      });
  },
  loadPromo: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromo(response.data));
      });
  },
  loadFavorite: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavorite(response.data));
      });
  },
  changeFavoriteStatus: (movieId, isFavourite) => (dispatch, getState, api) => {
    return api
      .post(`/favorite/${movieId}/${isFavourite ? 0 : 1}`)
      .then(() => {
        dispatch(Operation.loadMovies());
        dispatch(Operation.loadPromo());
        dispatch(Operation.loadFavorite());
      });
  },
};

const parceMovietoCamalCase = (movie) => {

  const getRating = (rating) => {
    if (rating < 3) {
      return `Bad`;
    } else if (rating < 5) {
      return `Normal`;
    } else if (rating < 8) {
      return `Good`;
    } else if (rating < 10) {
      return `Very good`;
    } else {
      return `Awesome`;
    }
  };

  const newMovie = {
    backgroundColor: movie.background_color,
    backgroundImage: movie.background_image,
    description: movie.description,
    director: movie.director,
    genre: movie.genre,
    id: movie.id,
    isFavorite: movie.is_favorite,
    name: movie.name,
    posterImage: movie.poster_image,
    previewImage: movie.preview_image,
    previewVideoLink: movie.preview_video_link,
    rating: movie.rating,
    ratingString: getRating(movie.rating),
    released: movie.released,
    runTime: movie.run_time,
    scoresCount: movie.scores_count,
    starring: movie.starring,
    videoLink: movie.video_link,
  };
  return newMovie;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload
      });
    case ActionType.LOAD_PROMO:
      return extend(state, {
        promo: action.payload
      });
    case ActionType.LOAD_FAVORITE:
      return extend(state, {
        favoriteMovies: action.payload
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator, Operation};
