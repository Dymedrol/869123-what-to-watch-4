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
import {AddReview} from '../add-review/add-review.jsx';

import withVideoPlayer from '../../hocs/withVideoPlayer/withVideoPlayer.jsx';
const PlayerWrapper = withVideoPlayer(Player);

const mockMovie = {
  backgroundColor: `#A6B7AC`,
  backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
  description: `In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.`,
  director: `Martin Scorsese`,
  genre: `Crime`,
  id: 1,
  isFavorite: false,
  name: `Gangs of new york`,
  posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
  previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
  previewVideoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  rating: 8.8,
  released: 2002,
  ratingString: `good`,
  runTime: 167,
  scoresCount: 370881,
  starring: [`Leonardo DiCaprio`, `Cameron Diaz`, `Daniel Day-Lewis`],
  videoLink: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`
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
    const {onSignInSubmit, authorizationCode, authorizationStatus, userAvatar, onReviewSubmit} = this.props;
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
          <Route exact path='/dev-review'>
            <AddReview
              authorizationStatus = {authorizationStatus}
              userAvatar = {userAvatar}
              onReviewSubmit = {onReviewSubmit}
              movie= {mockMovie}
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
  onReviewSubmit: PropTypes.func.isRequired,
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
  },
  onReviewSubmit(review, callback) {
    dispatch(userOperation.sendReview(review, callback));
  },
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
