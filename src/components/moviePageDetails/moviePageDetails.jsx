import React from 'react';
import PropTypes from 'prop-types';

const MoviePageDetalis = (props) => {
  const {movie} = props;

  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{movie.director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <span className="movie-card__details-value">
            {movie.starring.map((actor) => actor).join(`, `)}
          </span>
        </p>
      </div>

      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">{movie.runTime}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{movie.genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{movie.released}</span>
        </p>
      </div>
    </div>
  );
};

MoviePageDetalis.propTypes = {
  movie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    runTime: PropTypes.number.isRequired,
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
    released: PropTypes.number.isRequired,
  }).isRequired,
};

export default MoviePageDetalis;
