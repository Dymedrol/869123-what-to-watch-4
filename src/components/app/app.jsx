import React from "react";

import PropTypes from "prop-types";

import {Main} from '../main/main.jsx';

const onMovieTitleClickHandler = () => {};

export const App = (props) => {

  const {title, genre, date, movies} = props;

  return <Main
    title={title}
    genre={genre}
    date={date}
    movies={movies}
    onMovieTitleClickHandler={onMovieTitleClickHandler}
  />;
};

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  movies: PropTypes.array.isRequired,
};
