import React from "react";
import PropTypes from "prop-types";
import Main from '../main/main.jsx';

import {connect} from "react-redux";
import {ActionCreator} from '../../reducer/app/app.js';
import {getGenre} from '../../reducer/app/selectors.js';
import {getMovies} from '../../reducer/data/selectors.js';

const App = (props) => {

  const {movieTitle, movieGenre, moviePromoDate, movies} = props;

  return <Main
    title={movieTitle}
    genre={movieGenre}
    date={moviePromoDate}
    movies={movies}
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
  genre: getGenre(state),
  movies: getMovies(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
