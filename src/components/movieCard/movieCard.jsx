import React from "react";
import PropTypes from "prop-types";

const MovieCard = (props) => {

  const {cardData, onMovieTitleClickHandler, onCardHoverHandler} = props;

  return <article className="small-movie-card catalog__movies-card" onMouseEnter={() => onCardHoverHandler(cardData)}>
    <div className="small-movie-card__image">
      <img src={cardData.src} alt={cardData.title} width="280" height="175" />
    </div>
    <h3 className="small-movie-card__title" onClick={onMovieTitleClickHandler}>
      <a className="small-movie-card__link" href="movie-page.html">{cardData.title}</a>
    </h3>
  </article>;
};

MovieCard.propTypes = {
  cardData: PropTypes.shape({
    src: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  onMovieTitleClickHandler: PropTypes.func.isRequired,
  onCardHoverHandler: PropTypes.func.isRequired,
};

export default MovieCard;
