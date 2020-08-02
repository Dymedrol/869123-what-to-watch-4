import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import {connect} from "react-redux";

import Main from '../main/main.jsx';
import MoviePage from '../moviePage/moviePage.jsx';
import SignIn from '../signIn/signIn.jsx';
import {AddReview} from '../add-review/add-review.jsx';
import {PlayerPage} from '../player-page/player-page.jsx';
import {PrivateRoute} from '../private-route/private-route.jsx';

import {ActionCreator} from '../../reducer/app/app.js';
import {Operation} from '../../reducer/data/data.js';
import {getGenre} from '../../reducer/app/selectors.js';
import {getMovies, getPromo, getfavoriteMovies} from '../../reducer/data/selectors.js';
import {getAuthorizationStatus, getAuthorizationCode, getUserAvatar} from '../../reducer/user/selectors.js';
import {MovieListStep, AppRoute} from '../../const.js';
import {Operation as userOperation} from "../../reducer/user/user.js";
import MyList from '../my-list/my-list.jsx';
import history from "../../history.js";

const mockMovie = {
  backgroundColor: `#A6B7AC`,
  backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
  description: `In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.`,
  director: `Martin Scorsese`,
  genre: `Crime`,
  id: 1,
  isFavorite: true,
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
      movieListCount: MovieListStep.MAIN,
      currentPage: `main`,
      selectedMovie: null,
    };

    this.onMovieCardClickHandler = this.onMovieCardClickHandler.bind(this);
    this.onShowMoreClickHandler = this.onShowMoreClickHandler.bind(this);
  }

  render() {
    const {movieListCount} = this.state;
    const {
      onSignInSubmit,
      authorizationCode,
      authorizationStatus,
      userAvatar,
      onReviewSubmit,
      promoMovie,
      favoriteMovies,
      onMyListClick,
      movies,
    } = this.props;

    return (
      <BrowserRouter history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            <Main
              promoMovie = {promoMovie}
              onMovieCardClickHandler = {this.onMovieCardClickHandler}
              onShowMoreClickHandler = {this.onShowMoreClickHandler}
              movieListCount = {movieListCount}
              authorizationStatus = {authorizationStatus}
              userAvatar = {userAvatar}
              onMyListClick = {onMyListClick}
            />
          </Route>
          <Route
            exact
            path={`${AppRoute.MOVIE_PAGE}/:id/`}
            render={(props) =>
              <MoviePage
                {...props}
                movie={mockMovie}
                authorizationStatus = {authorizationStatus}
                userAvatar = {userAvatar}
                onMyListClick = {onMyListClick}

              />}
          />
          <PrivateRoute
            exact
            path={`${AppRoute.MOVIE_PAGE}/:id${AppRoute.ADD_REVIEW}`}
            authorizationStatus = {authorizationStatus}
            render={(props) => {
              return (
                <AddReview
                  movieId={props.computedMatch.params.id}
                  userAvatar = {userAvatar}
                  authorizationStatus = {authorizationStatus}
                  onReviewSubmit = {onReviewSubmit}
                  allMovies = {movies}
                />
              );
            }}
          />

          <Route
            exact
            path={`${AppRoute.PLAYER}/:id`}
            render={(props) =>
              <PlayerPage
                {...props}
                allMovies = {movies}
              />}
          />
          <Route exact path={AppRoute.LOGIN}>
            <SignIn
              onSignInSubmit={onSignInSubmit}
              authorizationCode = {authorizationCode}
            />
          </Route>
          <PrivateRoute
            exact
            path={AppRoute.MY_LIST}
            authorizationStatus = {authorizationStatus}
            render={() => {
              return (
                <MyList
                  authorizationStatus = {authorizationStatus}
                  userAvatar = {userAvatar}
                  myList = {favoriteMovies}
                  onMovieCardClickHandler = {this.onMovieCardClickHandler}
                />
              );
            }}
          />
          <Route
            render={() => (
              <React.Fragment>
                <h1>
                  404.
                  <br />
                  <br />
                  <small>Page not found</small>
                </h1>
                <Link to={AppRoute.ROOT}>Go to main page</Link>
              </React.Fragment>
            )}
          />
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
  favoriteMovies: PropTypes.array.isRequired,
  onMyListClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  genre: getGenre(state),
  movies: getMovies(state),
  authorizationStatus: getAuthorizationStatus(state),
  authorizationCode: getAuthorizationCode(state),
  userAvatar: getUserAvatar(state),
  promoMovie: getPromo(state),
  favoriteMovies: getfavoriteMovies(state),
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
  changeActiveMovie(movie) {
    dispatch(ActionCreator.changeActiveMovie(movie));
  },
  onMyListClick(movieId, isFavourite) {
    dispatch(Operation.changeFavoriteStatus(movieId, isFavourite));
  },
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
