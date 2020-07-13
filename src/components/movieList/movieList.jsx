import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import MovieCard from '../movieCard/movieCard.jsx';

class MovieList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };
  }

  render() {
    const {movies, onMovieTitleClickHandler} = this.props;

    return <div className="catalog__movies-list">
      {movies.map((card) => (
        <MovieCard
          key={card.src}
          cardData={card}
          onMovieTitleClickHandler={onMovieTitleClickHandler}
          onCardHoverHandler={(cardData) => {
            this.setState({
              activeCard: cardData,
            });
          }}
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