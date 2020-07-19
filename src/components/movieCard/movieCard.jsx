import React from "react";
import PropTypes from "prop-types";

const MovieCard = (props) => {
  const {cardData, onMovieTitleClickHandler, onMouseEnter, onMouseLeave, renderPlayer} = props;

  return <article
    className="small-movie-card catalog__movies-card"
    onMouseEnter={() => {
      onMouseEnter();
    }}
    onMouseLeave = {() => {
      onMouseLeave();
    }}
  >
    <div className="small-movie-card__image">
      {renderPlayer(cardData)}
    </div>
    <h3 className="small-movie-card__title" onClick={onMovieTitleClickHandler}>
      <a className="small-movie-card__link" href="movie-page.html">{cardData.title}</a>
    </h3>
  </article>
};

// MovieCard.propTypes = {
//   cardData: PropTypes.shape({
//     src: PropTypes.string,
//     title: PropTypes.string,
//     preview: PropTypes.string.isRequired,
//   }).isRequired,
//   onMovieTitleClickHandler: PropTypes.func.isRequired,
//   onCardHoverHandler: PropTypes.func.isRequired,
// };

export default MovieCard;
