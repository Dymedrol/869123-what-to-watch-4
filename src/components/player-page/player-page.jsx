import React from "react";
import PropTypes from "prop-types";

import {VideoPlayerModes} from '../../const.js';
import withVideoPlayer from '../../hocs/with-video-player/with-video-player.jsx';
import {Player} from '../player/player.jsx';

const PlayerWrapper = withVideoPlayer(Player);

const PlayerPage = (props) => {
  const {allMovies} = props;

  const getCurentMovie = (movies, movieId) => {
    return movies.find((movie) => movie.id === movieId);
  };

  const movieId = parseInt(props.match.params.id, 10);
  const movie = getCurentMovie(allMovies, movieId);

  if (!movie) {
    return <h2>Loading...</h2>;
  }

  return  <PlayerWrapper movie={movie} isMuted={true} videoMode={VideoPlayerModes.FULLSCREEN}/>
};

PlayerPage.propTypes = {
  allMovies: PropTypes.array.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
};

export {PlayerPage};
