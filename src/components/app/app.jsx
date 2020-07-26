import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";

import Main from '../main/main.jsx';
import MoviePage from '../moviePage/moviePage.jsx';
import {ActionCreator} from '../../reducer/app/app.js';
import {getGenre} from '../../reducer/app/selectors.js';
import {getMovies} from '../../reducer/data/selectors.js';
import {MovieListStep} from '../../const.js';

const movieMock = {
  backgroundColor: `#D8E3E5`,
  backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Moonrise_Kingdom.jpg`,
  description: `A pair of young lovers flee their New England town, which causes a local search party to fan out to find them.`,
  director: `Wes Anderson`,
  genre: `Adventure`,
  id: 2,
  isFavorite: false,
  name: `Moonrise Kingdom`,
  posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Moonrise_Kingdom.jpg`,
  previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/moonrise-kingdom.jpg`,
  previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  rating: 7.9,
  ratingString: `good`,
  released: 2012,
  runTime: 94,
  scoresCount: 291183,
  starring: [`Jared Gilman`, `Kara Hayward`, `Bruce Willis`],
  videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
};

class App extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      movieListCount: MovieListStep.MAIN,
      currentPage: `main`,
      selectedMovie: null,
    };

    this.onMovieCardClickHandler = this.onMovieCardClickHandler.bind(this);
    this.onShowMoreClickHandler = this.onShowMoreClickHandler.bind(this);
  }

  _renderApp() {
    const {movieTitle, movieGenre, moviePromoDate, movies} = this.props;
    const {currentPage, selectedMovie, movieListCount} = this.state;

    if (currentPage === `main`) {
      return (
        <Main
          title={movieTitle}
          genre={movieGenre}
          date={moviePromoDate}
          movies={movies}
          onMovieCardClickHandler = {this.onMovieCardClickHandler}
          onShowMoreClickHandler = {this.onShowMoreClickHandler}
          movieListCount = {movieListCount}
        />
      );
    }

    if (currentPage === `movie`) {
      return (
        <MoviePage
          movie={selectedMovie}
        />
      );
    }

    return null;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            {this._renderApp()}
          </Route>
          <Route exact path='/movie-page'>
            <MoviePage
              movie={movieMock}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  onMovieCardClickHandler(movie) {
    this.setState({
      currentPage: `movie`,
      selectedMovie: movie,
    });
  }

  onShowMoreClickHandler() {
    const prevState = this.state.movieListCount;
    this.setState({
      movieListCount: prevState + MovieListStep.MAIN,
    });
  }
}

App.propTypes = {
  movieTitle: PropTypes.string.isRequired,
  movieGenre: PropTypes.string.isRequired,
  moviePromoDate: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    previewImage: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  // onMovieCardClickHandler: PropTypes.func.isRequired,
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
