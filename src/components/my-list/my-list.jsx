import React from "react";
import PropTypes from "prop-types";
import {Header} from '../header/header.jsx';
import {MovieList} from '../movieList/movieList.jsx';
import withActiveItem from '../../hocs/withActiveItem/withActiveItem.jsx';

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
};

// MovieCard.propTypes = {
//   cardData: PropTypes.object.isRequired,
//   renderPlayer: PropTypes.func.isRequired,
//   setActiveItem: PropTypes.func.isRequired,
//   removeActiveItem: PropTypes.func.isRequired,
//   onMovieCardClickHandler: PropTypes.func.isRequired,
//   playVideo: PropTypes.func.isRequired,
//   stopVideo: PropTypes.func.isRequired,
// };

export default MyList;
