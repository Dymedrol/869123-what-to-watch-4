import React from "react";
import ReactDOM from "react-dom";

import {Main} from './components/main/main.jsx';

const init = () => {
  const settings = {
    movieTitle: `The Grand Budapest Hotel`,
    movieGenre: `Drama`,
    moviePromoDate: 2014,
    movies: [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Titanic`],
  };

  ReactDOM.render(
      <Main
        title={settings.movieTitle}
        genre={settings.movieGenre}
        date={settings.moviePromoDate}
        movies={settings.movies}
      />,
      document.querySelector(`#root`)
  );
};

init();

