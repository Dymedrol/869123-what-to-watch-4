import React from "react";
import PropTypes from 'prop-types';

import MovieCard from '../movie-card/movie-card.jsx';
import withVideoPlayer from '../../hocs/with-video-player/with-video-player.jsx';
import {VideoPlayerModes} from '../../const.js';

const MovieCardWrapper = withVideoPlayer(MovieCard);

const MovieList = (props) => {
  const {movies, setActiveItem, removeActiveItem} = props;

  return <div className="catalog__movies-list">
    {movies.map((card) => (
      <MovieCardWrapper
        key={card.previewImage}
        cardData={card}
        setActiveItem={setActiveItem}
        removeActiveItem={removeActiveItem}
        isMuted={true}
        videoMode={VideoPlayerModes.SMALL}
      />
    ))}
  </div>;
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  removeActiveItem: PropTypes.func.isRequired,
};

export {MovieList};
