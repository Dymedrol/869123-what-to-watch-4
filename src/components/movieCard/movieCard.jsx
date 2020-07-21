import React from "react";
import PropTypes from "prop-types";

const MovieCard = (props) => {
  const {cardData, onMouseEnter, onMouseLeave, renderPlayer, setActiveItem, removeActiveItem} = props;

  return <article
    className="small-movie-card catalog__movies-card"
    onMouseEnter={() => {
      onMouseEnter();
      setActiveItem(cardData.title);
    }}
    onMouseLeave = {() => {
      onMouseLeave();
      removeActiveItem();
    }}
  >
    <div className="small-movie-card__image">
      {renderPlayer(cardData)}
    </div>
    <h3 className="small-movie-card__title">
      <a className="small-movie-card__link" href="movie-page.html">{cardData.title}</a>
    </h3>
  </article>;
};

MovieCard.propTypes = {
  cardData: PropTypes.shape({
    src: PropTypes.string,
    title: PropTypes.string,
    preview: PropTypes.string.isRequired,
  }).isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  removeActiveItem: PropTypes.func.isRequired,
};

export default MovieCard;
