import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from "react-redux";
import thunk from 'redux-thunk';

import App from './components/app/app.jsx';
import reducer from "./reducer/reducer.js";
import {Operation} from "./reducer/data/data.js";
import {createAPI} from './api.js';

const api = createAPI();

const init = () => {
  const promoMovie = {
    backgroundColor: `#A6B7AC`,
    backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
    description: `In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.`,
    director: `Martin Scorsese`,
    genre: `Crime`,
    id: 1,
    isFavorite: false,
    name: `Gangs of new york`,
    posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
    previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
    previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    rating: 8.8,
    released: 2002,
    ratingString: `good`,
    runTime: 167,
    scoresCount: 370881,
    starring: [`Leonardo DiCaprio`, `Cameron Diaz`, `Daniel Day-Lewis`],
    videoLink: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`
  };

  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );

  store.dispatch(Operation.loadMovies());

  ReactDOM.render(
      <Provider store={store}>
        <App
          promoMovie = {promoMovie}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();

