import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";

import Main from '../main/main.jsx';
import {Player} from '../player/player.jsx';
import MoviePage from '../moviePage/moviePage.jsx';
import SignIn from '../signIn/signIn.jsx';
import {ActionCreator} from '../../reducer/app/app.js';
import {getGenre} from '../../reducer/app/selectors.js';
import {getMovies, getPromo} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus, getAuthorizationCode, getUserAvatar} from '../../reducer/user/selectors.js';
import {MovieListStep, videoPlayerModes} from '../../const.js';
import {Operation as userOperation} from "../../reducer/user/user.js";

import withVideoPlayer from '../../hocs/withVideoPlayer/withVideoPlayer.jsx';
const PlayerWrapper = withVideoPlayer(Player);

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
    const {promoMovie, authorizationStatus, userAvatar} = this.props;
    const {currentPage, selectedMovie, movieListCount, isMoviePlaying} = this.state;

    if (currentPage === `main`) {
      return (
        <Main
          promoMovie = {promoMovie}
          onMovieCardClickHandler = {this.onMovieCardClickHandler}
          onShowMoreClickHandler = {this.onShowMoreClickHandler}
          onPlayButtonHandler = {this.onPlayButtonHandler}
          onExitButtonHandler = {this.onExitButtonHandler}
          movieListCount = {movieListCount}
          isMoviePlaying = {isMoviePlaying}
          authorizationStatus = {authorizationStatus}
          userAvatar = {userAvatar}
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
          authorizationStatus = {authorizationStatus}
          userAvatar = {userAvatar}
        />
      );
    }

    return null;
  }

  render() {
    const {isMoviePlaying, promoMovie} = this.state;
    const {onSignInSubmit, authorizationCode} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            {this._renderApp()}
          </Route>
          <Route exact path='/movie-page'>
            <MoviePage
              movie={promoMovie}
              onPlayButtonHandler = {this.onPlayButtonHandler}
              onExitButtonHandler = {this.onExitButtonHandler}
              isMoviePlaying = {isMoviePlaying}
            />
          </Route>
          <Route exact path='/player'>
            <PlayerWrapper
              movie={promoMovie}
              onPlayButtonHandler = {this.onPlayButtonHandler}
              onExitButtonHandler = {this.onExitButtonHandler}
              isMuted={true}
              videoMode={videoPlayerModes.FULLSCREEN}
            />
          </Route>
          <Route exact path='/login'>
            <SignIn
              onSignInSubmit={onSignInSubmit}
              authorizationCode = {authorizationCode}
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
  promoMovie: PropTypes.object.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    previewImage: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  userAvatar: PropTypes.string,
  onSignInSubmit: PropTypes.func.isRequired,
  authorizationCode: PropTypes.string,
};

const mapStateToProps = (state) => ({
  genre: getGenre(state),
  movies: getMovies(state),
  authorizationStatus: getAuthorizationStatus(state),
  authorizationCode: getAuthorizationCode(state),
  userAvatar: getUserAvatar(state),
  promoMovie: getPromo(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  },
  onSignInSubmit(formData) {
    dispatch(userOperation.loginUser({formData}));
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
