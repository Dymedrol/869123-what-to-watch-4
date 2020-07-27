import React from "react";
import PropTypes from "prop-types";

const MovieCard = (props) => {
  const {cardData, playVideo, stopVideo, renderPlayer, setActiveItem, removeActiveItem, onMovieCardClickHandler} = props;

  const handleMovieClick = (evt) => {
    evt.preventDefault();
    onMovieCardClickHandler(cardData);
  };

  return <article
    className="small-movie-card catalog__movies-card"
    onMouseEnter={() => {
      playVideo();
      setActiveItem(cardData.name);
    }}
    onMouseLeave = {() => {
      stopVideo();
      removeActiveItem();
    }}
    onClick = {handleMovieClick}
  >
    <div className="small-movie-card__image">
      {renderPlayer(cardData)}
    </div>
    <h3 className="small-movie-card__title">
      <a className="small-movie-card__link">{cardData.name}</a>
    </h3>
  </article>;
};

MovieCard.propTypes = {
  cardData: PropTypes.object.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  removeActiveItem: PropTypes.func.isRequired,
  onMovieCardClickHandler: PropTypes.func.isRequired,
  playVideo: PropTypes.func.isRequired,
  stopVideo: PropTypes.func.isRequired,
};

export default MovieCard;
