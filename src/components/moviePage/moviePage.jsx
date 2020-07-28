import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {Tabs} from '../../const.js';
import withActiveItem from '../../hocs/withActiveItem/withActiveItem.jsx';
import TabList from '../tabList/tabList.jsx';
import MoviePageOverview from './../moviePageOverview/moviePageOverview.jsx';
import MoviePageDetails from '../moviePageDetails/moviePageDetails.jsx';
import MoviePageReviews from '../moviePageReviews/moviePageReviews.jsx';
import {MovieList} from '../movieList/movieList.jsx';
import {getMovies} from '../../reducer/data/selectors.js';

const MovieListWrapper = withActiveItem(MovieList);

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: `Overview`,
    };

    this.onTabClickHandler = this.onTabClickHandler.bind(this);
  }

  render() {
    const {movie, allMovies} = this.props;
    const backgroundStyle = {
      background: movie.backgroundColor,
    };
    const TabListWrapper = withActiveItem(TabList);
    const filtredMovies = allMovies.filter((item) => item.genre === movie.genre);

    const renderSwitch = () => {
      switch (this.state.activeTab) {
        case `Overview`:
          return <MoviePageOverview movie={movie}/>;

        case `Details`:
          return <MoviePageDetails movie={movie}/>;

        case `Reviews`:
          return <MoviePageReviews movie={movie}/>;
      }

      return null;
    };

    return <React.Fragment>
      <section className="movie-card movie-card--full" style={backgroundStyle}>
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={movie.backgroundImage} alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movie.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{movie.genre}</span>
                <span className="movie-card__year">{movie.released}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <a href="add-review.html" className="btn movie-card__button">Add review</a>
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
  }

  onTabClickHandler(tab) {
    this.setState({
      activeTab: tab,
    });
  }
}

const mapStateToProps = (state) => ({
  allMovies: getMovies(state),
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
  }).isRequired,
  allMovies: PropTypes.array.isRequired,
};

export {MoviePage};
export default connect(mapStateToProps)(MoviePage);
