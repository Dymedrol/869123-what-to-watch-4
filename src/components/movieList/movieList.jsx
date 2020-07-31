import React, {PureComponent} from "react";
import PropTypes from 'prop-types';

import MovieCard from '../movieCard/movieCard.jsx';
import withVideoPlayer from '../../hocs/withVideoPlayer/withVideoPlayer.jsx';
import {videoPlayerModes} from '../../const.js';

const MovieCardWrapper = withVideoPlayer(MovieCard);

class MovieList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movies, setActiveItem, removeActiveItem, onMovieCardClickHandler} = this.props;

    return <div className="catalog__movies-list">
      {movies.map((card) => (
        <MovieCardWrapper
          key={card.previewImage}
          cardData={card}
          setActiveItem={setActiveItem}
          removeActiveItem={removeActiveItem}
          onMovieCardClickHandler={onMovieCardClickHandler}
          isMuted={true}
          videoMode={videoPlayerModes.SMALL}
        />
      ))}
    </div>;
  }
}

// MovieList.propTypes = {
//   movies: PropTypes.array.isRequired,
//   setActiveItem: PropTypes.func.isRequired,
//   removeActiveItem: PropTypes.func.isRequired,
//   onMovieCardClickHandler: PropTypes.func.isRequired,
// };

export {MovieList};
