import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';

import {Header} from '../header/header.jsx';
import {MovieList} from '../movie-list/movie-list.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import {AppRoute} from '../../const.js';

const MovieListWrapper = withActiveItem(MovieList);

const MyList = (props) => {
  const {authorizationStatus, userAvatar, myList, onMovieCardClickHandler} = props;

  return <div className="user-page">

    <Header authorizationStatus={authorizationStatus} userAvatar={userAvatar} additionalClass={`user-page__head`}/>

    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <MovieListWrapper
        onMovieCardClickHandler = {onMovieCardClickHandler}
        movies = {myList}
      />
    </section>

    <footer className="page-footer">
      <div className="logo">
        <Link
          className="logo__link logo__link--light"
          to={AppRoute.ROOT}
        >
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  </div>;
};

MyList.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  userAvatar: PropTypes.string,
  myList: PropTypes.array.isRequired,
  onMovieCardClickHandler: PropTypes.func,
};

export default MyList;
