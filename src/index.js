import React from "react";
import ReactDOM from "react-dom";

import {Main} from './components/main/main.jsx';

const init = () => {
  const settings = {
    movieTitle: `The Grand Budapest Hotel`,
    movieGenre: `Drama`,
    moviePromoDate: 2014,
  };

  ReactDOM.render(
      <Main
        title={settings.movieTitle}
        genre={settings.movieGenre}
        date={settings.moviePromoDate}
      />,
      document.querySelector(`#root`)
  );
};

init();

