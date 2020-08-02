import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.js';

const MovieCard = (props) => {
  const {cardData, playVideo, stopVideo, renderPlayer, setActiveItem, removeActiveItem} = props;

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
  >
    <div className="small-movie-card__image">
      {renderPlayer(cardData)}
    </div>
    <h3 className="small-movie-card__title">
      <Link
        className="small-movie-card__link"
        to={`${AppRoute.MOVIE_PAGE}/${cardData.id}/`}
      >{cardData.name}</Link>
    </h3>
  </article>;
};

MovieCard.propTypes = {
  cardData: PropTypes.object.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  removeActiveItem: PropTypes.func.isRequired,
  playVideo: PropTypes.func.isRequired,
  stopVideo: PropTypes.func.isRequired,
};

export default MovieCard;
