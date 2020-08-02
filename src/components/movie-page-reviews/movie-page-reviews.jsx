import React from 'react';
import moment from 'moment';
import PropTypes from "prop-types";

const MoviePageReviews = (props) => {
  const {reviews} = props;

  const leftCol = [];
  const rightCol = [];

  reviews.forEach((el, i) => {
    if (i % 2 === 0) {
      leftCol.push(el);
    } else {
      rightCol.push(el);
    }
  });

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {leftCol.map((el) => (
          <div className="review" key={el.id}>
            <blockquote className="review__quote">
              <p className="review__text">{el.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{el.user.name}</cite>
                <time className="review__date" dateTime={moment(el.date).format(`YYYY-M-D`)}>{moment(el.date).format(`LL`)}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{el.rating}</div>
          </div>
        ))}
      </div>
      <div className="movie-card__reviews-col">
        {rightCol.map((el) => (
          <div className="review" key={el.date}>
            <blockquote className="review__quote">
              <p className="review__text">{el.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{el.user.name}</cite>
                <time className="review__date" dateTime={moment(el.date).format(`YYYY-M-D`)}>{moment(el.date).format(`LL`)}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{el.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

MoviePageReviews.propTypes = {
  reviews: PropTypes.array.isRequired,
};

export default MoviePageReviews;
