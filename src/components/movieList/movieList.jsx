import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import MovieCard from '../movieCard/movieCard.jsx';
import withVideoPlayer from '../../hocs/withVideoPlayer/withVideoPlayer.jsx';

const MovieCardWrapper = withVideoPlayer(MovieCard);

class MovieList extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {
    const {movies, onMovieTitleClickHandler, setActiveItem, removeActiveItem} = this.props;

    return <div className="catalog__movies-list">
      {movies.map((card) => (
        <MovieCardWrapper
          key={card.src}
          cardData={card}
          setActiveItem={setActiveItem}
          removeActiveItem={removeActiveItem}
        />
      ))}
    </div>;
  }
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    title: PropTypes.string,
    preview: PropTypes.string.isRequired,
  })).isRequired,
  onMovieTitleClickHandler: PropTypes.func.isRequired
};

export default MovieList;
