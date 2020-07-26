import React from 'react';
import PropTypes from 'prop-types';

const moviePageOverview = (props) => {
  const {movie} = props;

  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{movie.rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{movie.ratingString}</span>
          <span className="movie-rating__count">{movie.runTime} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{movie.description}</p>

        <p className="movie-card__director"><strong>Director: {movie.director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {movie.starring.map((actor) => actor).join(`, `)} and other</strong></p>
      </div>
    </React.Fragment>
  );
};

moviePageOverview.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.oneOfType([
      PropTypes.arrayOf(
          PropTypes.string
      ),
      PropTypes.string
    ]).isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(
        PropTypes.string
    ).isRequired,
    ratingString: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
  }).isRequired,
};

export default moviePageOverview;
