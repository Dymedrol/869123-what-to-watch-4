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
  const settings = {
    movieTitle: `The Grand Budapest Hotel`,
    movieGenre: `Drama`,
    moviePromoDate: 2014,
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
          movieTitle={settings.movieTitle}
          movieGenre={settings.movieGenre}
          moviePromoDate={settings.moviePromoDate}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();

