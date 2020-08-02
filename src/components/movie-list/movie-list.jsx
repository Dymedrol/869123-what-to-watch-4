import React, {PureComponent} from "react";
import PropTypes from 'prop-types';

import MovieCard from '../movie-card/movie-card.jsx';
import withVideoPlayer from '../../hocs/with-video-player/with-video-player.jsx';
import {videoPlayerModes} from '../../const.js';

const MovieCardWrapper = withVideoPlayer(MovieCard);

class MovieList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movies, setActiveItem, removeActiveItem} = this.props;

    return <div className="catalog__movies-list">
      {movies.map((card) => (
        <MovieCardWrapper
          key={card.previewImage}
          cardData={card}
          setActiveItem={setActiveItem}
          removeActiveItem={removeActiveItem}
          isMuted={true}
          videoMode={videoPlayerModes.SMALL}
        />
      ))}
    </div>;
  }
}

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  removeActiveItem: PropTypes.func.isRequired,
};

export {MovieList};