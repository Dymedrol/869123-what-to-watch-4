import React from "react";
import PropTypes from "prop-types";
import Main from '../main/main.jsx';

import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";

const onMovieTitleClickHandler = () => {};

const App = (props) => {

  const {movieTitle, movieGenre, moviePromoDate, movies} = props;

  return <Main
    title={movieTitle}
    genre={movieGenre}
    date={moviePromoDate}
    movies={movies}
    onMovieTitleClickHandler={onMovieTitleClickHandler}
  />;
};

App.propTypes = {
  movieTitle: PropTypes.string.isRequired,
  movieGenre: PropTypes.string.isRequired,
  moviePromoDate: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  genre: state.genre,
  movies: state.movies,
});

const mapDispatchToProps = (dispatch) => ({
  onClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.getFilmsByGenre());
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
