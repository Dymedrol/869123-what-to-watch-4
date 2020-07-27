import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";

import Main from '../main/main.jsx';
import {Player} from '../player/player.jsx';
import MoviePage from '../moviePage/moviePage.jsx';
import {ActionCreator} from '../../reducer/app/app.js';
import {getGenre} from '../../reducer/app/selectors.js';
import {getMovies} from '../../reducer/data/selectors.js';
import {MovieListStep} from '../../const.js';

import withVideoPlayer from '../../hocs/withVideoPlayer/withVideoPlayer.jsx';
const PlayerWrapper = withVideoPlayer(Player);

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
      isMoviePlaying: false,
      movieListCount: MovieListStep.MAIN,
      currentPage: `main`,
      selectedMovie: null,
    };

    this.onMovieCardClickHandler = this.onMovieCardClickHandler.bind(this);
    this.onShowMoreClickHandler = this.onShowMoreClickHandler.bind(this);
    this.onPlayButtonHandler = this.onPlayButtonHandler.bind(this);
    this.onExitButtonHandler = this.onExitButtonHandler.bind(this);
  }

  _renderApp() {
    const {promoMovie, movies} = this.props;
    const {currentPage, selectedMovie, movieListCount, isMoviePlaying} = this.state;

    if (currentPage === `main`) {
      return (
        <Main
          promoMovie = {promoMovie}
          movies={movies}
          onMovieCardClickHandler = {this.onMovieCardClickHandler}
          onShowMoreClickHandler = {this.onShowMoreClickHandler}
          onPlayButtonHandler = {this.onPlayButtonHandler}
          onExitButtonHandler = {this.onExitButtonHandler}
          movieListCount = {movieListCount}
          isMoviePlaying = {isMoviePlaying}
        />
      );
    }

    if (currentPage === `movie`) {
      return (
        <MoviePage
          movie={selectedMovie}
          onPlayButtonHandler = {this.onPlayButtonHandler}
          onExitButtonHandler = {this.onExitButtonHandler}
          isMoviePlaying = {isMoviePlaying}
        />
      );
    }

    return null;
  }

  render() {
    const {isMoviePlaying} = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            {this._renderApp()}
          </Route>
          <Route exact path='/movie-page'>
            <MoviePage
              movie={movieMock}
              onPlayButtonHandler = {this.onPlayButtonHandler}
              onExitButtonHandler = {this.onExitButtonHandler}
              isMoviePlaying = {isMoviePlaying}
            />
          </Route>
          <Route exact path='/player'>
            <PlayerWrapper
              movie={movieMock}
              onPlayButtonHandler = {this.onPlayButtonHandler}
              onExitButtonHandler = {this.onExitButtonHandler}
              isMuted={true}
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

  onPlayButtonHandler() {
    this.setState({
      isMoviePlaying: true
    });
  }

  onExitButtonHandler() {
    this.setState({
      isMoviePlaying: false
    });
  }
}

App.propTypes = {
  promoMovie: PropTypes.array.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    previewImage: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  onMovieCardClickHandler: PropTypes.func.isRequired,
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
