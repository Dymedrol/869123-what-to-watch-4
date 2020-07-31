import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {MovieList} from '../movieList/movieList.jsx';
import GenreList from '../genreList/genreList.jsx';
import ShowMore from '../showMore/showMore.jsx';
import {Player} from '../player/player.jsx';
import {PlayS} from '../svg/svg.jsx';
import withActiveItem from '../../hocs/withActiveItem/withActiveItem.jsx';
import withVideoPlayer from '../../hocs/withVideoPlayer/withVideoPlayer.jsx';
import {getMoviesByGenre} from '../../reducer/app/selectors.js';
import {videoPlayerModes} from '../../const.js';
import {Header} from '../header/header.jsx';

const MovieListWrapper = withActiveItem(MovieList);
const GenreListWrapper = withActiveItem(GenreList);
const PlayerWrapper = withVideoPlayer(Player);

const Main = (props) => {

  const {
    promoMovie,
    movies,
    onMovieCardClickHandler,
    onShowMoreClickHandler,
    movieListCount,
    onPlayButtonHandler,
    onExitButtonHandler,
    isMoviePlaying,
    authorizationStatus,
    userAvatar,
    onMyListClick,
  } = props;

  const myListButton = () => {
    if (promoMovie.isFavorite) {
      return <button
        className="btn btn--list movie-card__button"
        type="button"
        onClick={
          () => {
            onMyListClick(promoMovie.id, promoMovie.isFavorite);
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
          onMyListClick(promoMovie.id, promoMovie.isFavorite);
        }
      }>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref="#add"></use>
      </svg>
      <span>My list</span>
    </button>;
  };

  const renderMainPage = () => {

    if (isMoviePlaying) {
      return <PlayerWrapper movie={promoMovie} onExitButtonHandler={onExitButtonHandler} isMuted={true} videoMode={videoPlayerModes.FULLSCREEN}/>;
    }

    return <div>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={promoMovie.backgroundImage} alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header authorizationStatus={authorizationStatus} userAvatar={userAvatar}/>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={promoMovie.posterImage} alt={promoMovie.name} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promoMovie.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promoMovie.genre}</span>
                <span className="movie-card__year">{promoMovie.date}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={onPlayButtonHandler}>
                  <PlayS/>
                  <span>Play</span>
                </button>

                {myListButton()}

              </div>
            </div>
          </div>
        </div>

      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            <GenreListWrapper/>
          </ul>

          <MovieListWrapper
            onMovieCardClickHandler = {onMovieCardClickHandler}
            movies = {filtredMovies}
          />

          <ShowMore
            onShowMoreClickHandler={onShowMoreClickHandler}
            allMoviesLength = {allMoviesLength}
            filtredMoviesLength = {filtredMoviesLength}
          />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
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
    </div>;
  };

  const filtredMovies = movies.slice(0, movieListCount);
  const allMoviesLength = movies.length;
  const filtredMoviesLength = filtredMovies.length;

  return renderMainPage();

};

const mapStateToProps = (state) => ({
  movies: getMoviesByGenre(state),
});

Main.propTypes = {
  onMovieCardClickHandler: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
  onShowMoreClickHandler: PropTypes.func.isRequired,
  movieListCount: PropTypes.number.isRequired,
};

export {Main};
export default connect(mapStateToProps)(Main);
