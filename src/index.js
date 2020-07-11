import React from "react";
import ReactDOM from "react-dom";
import App from './components/app/app.jsx';
import movies from "./mocks/films.js";

const init = () => {
  const settings = {
    movieTitle: `The Grand Budapest Hotel`,
    movieGenre: `Drama`,
    moviePromoDate: 2014,
  };

  ReactDOM.render(
      <App
        title={settings.movieTitle}
        genre={settings.movieGenre}
        date={settings.moviePromoDate}
        movies={movies}
      />,
      document.querySelector(`#root`)
  );
};

init();

