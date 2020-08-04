import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

import {Tabs, MovieListStep, LoginStatus, AppRoute} from '../../const.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import TabList from '../tab-list/tab-list.jsx';
import MoviePageOverview from './../movie-page-overview/movie-page-overview.jsx';
import MoviePageDetails from '../movie-page-details/movie-page-details.jsx';
import MoviePageReviews from '../movie-page-reviews/movie-page-reviews.jsx';
import {MovieList} from '../movie-list/movie-list.jsx';
import {getMovies} from '../../reducer/data/selectors.js';
import {getReviews} from '../../reducer/user/selectors.js';
import {Header} from '../header/header.jsx';
import {Operation as userOperation} from "../../reducer/user/user.js";

const MovieListWrapper = withActiveItem(MovieList);
const TabListWrapper = withActiveItem(TabList);

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: Tabs.OVERVIEW,
    };

    this.onTabClickHandler = this.onTabClickHandler.bind(this);
  }

  componentDidMount() {
    const {loadReviews} = this.props;
    const movieId = parseInt(this.props.match.params.id, 10);
    loadReviews(movieId);
  }

  render() {
    const {
      allMovies,
      authorizationStatus,
      userAvatar,
      onMyListClick,
      reviews,
    } = this.props;

    const getCurentMovie = (movies, movieId) => {
      return movies.find((movie) => movie.id === movieId);
    };

    const movieId = parseInt(this.props.match.params.id, 10);

    const movie = getCurentMovie(allMovies, movieId);
    const movieListrestriction = MovieListStep.MOVIEPAGE - 1;

    let filtredMovies = allMovies.filter((item) => item.genre === movie.genre);
    filtredMovies = filtredMovies.slice(0, movieListrestriction);


    const renderSwitch = () => {
      switch (this.state.activeTab) {
        case Tabs.OVERVIEW:
          return <MoviePageOverview movie={movie} ratings={reviews.length}/>;

        case Tabs.DETAILS:
          return <MoviePageDetails movie={movie}/>;

        case Tabs.REVIEWS:
          return <MoviePageReviews reviews={reviews}/>;
      }

      return null;
    };

    const renderAddreviewButton = () => {
      if (authorizationStatus === LoginStatus.AUTH) {
        return <Link
          className="btn movie-card__button"
          to={`${AppRoute.MOVIE_PAGE}/${movie.id}${AppRoute.ADD_REVIEW}`}
        >Add review</Link>;
      }
      return null;
    };

    const myListButton = () => {
      if (movie.isFavorite) {
        return <button
          className="btn btn--list movie-card__button"
          type="button"
          onClick={
            () => {
              onMyListClick(movie.id, movie.isFavorite);
            }
          }>
          <svg viewBox="0 0 18 14" width="18" height="14">
            <use xlinkHref="#in-list"></use>
          </svg>
          <span>My list</span>
        </button>;
      }

      return <button
        className="btn btn--list movie-card__button"
        type="button"
        onClick={
          () => {
            onMyListClick(movie.id, movie.isFavorite);
          }
        }>
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
        <span>My list</span>
      </button>;
    };

    const renderMoviePage = () => {
      if (!movie) {
        return <h2>Loading...</h2>;
      }
      return <React.Fragment>
        <section className="movie-card movie-card--full" style={{background: movie.backgroundColor}}>
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={movie.backgroundImage} alt="The Grand Budapest Hotel" />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <Header authorizationStatus={authorizationStatus} userAvatar={userAvatar}/>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{movie.name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{movie.genre}</span>
                  <span className="movie-card__year">{movie.released}</span>
                </p>

                <div className="movie-card__buttons">
                  <Link
                    className="btn btn--play movie-card__button"
                    to={`${AppRoute.PLAYER}/${movie.id}/`}
                  >Play</Link>
                  {myListButton()}
                  {renderAddreviewButton()}
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={movie.posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <nav className="movie-nav movie-card__nav">
                  <TabListWrapper
                    tabs={Object.values(Tabs)}
                    onTabClickHandler={this.onTabClickHandler}
                  />
                </nav>

                {renderSwitch()}
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <div className="catalog__movies-list">
              <MovieListWrapper
                onMovieCardClickHandler = {() => {}}
                movies={filtredMovies}
              />
            </div>
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a href="main.html" className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </React.Fragment>;
    };

    return renderMoviePage();
  }

  onTabClickHandler(tab) {
    this.setState({
      activeTab: tab,
    });
  }
}

const mapStateToProps = (state) => ({
  allMovies: getMovies(state),
  reviews: getReviews(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadReviews(id) {
    dispatch(userOperation.loadReview(id));
  },
});

MoviePage.propTypes = {
  movie: PropTypes.shape({
    backgroundImage: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratingString: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    runTime: PropTypes.number.isRequired,
    previewImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.array.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  allMovies: PropTypes.array.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  userAvatar: PropTypes.string.isRequired,
  onMyListClick: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  loadReviews: PropTypes.func.isRequired,
  reviews: PropTypes.array.isRequired,
};

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
