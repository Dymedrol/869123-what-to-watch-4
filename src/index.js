import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import App from './components/app/app.jsx';
import movies from "./mocks/films.js";
import {reducer} from "./reducer.js";

const init = () => {
  const settings = {
    movieTitle: `The Grand Budapest Hotel`,
    movieGenre: `Drama`,
    moviePromoDate: 2014,
  };

  const store = createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
  );

  ReactDOM.render(
      <Provider store={store}>
        <App
          movieTitle={settings.movieTitle}
          movieGenre={settings.movieGenre}
          moviePromoDate={settings.moviePromoDate}
          movies={movies}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();

