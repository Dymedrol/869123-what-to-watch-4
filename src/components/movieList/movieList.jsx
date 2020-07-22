import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {Genres} from "./../../const.js";
import MovieCard from '../movieCard/movieCard.jsx';
import withVideoPlayer from '../../hocs/withVideoPlayer/withVideoPlayer.jsx';
import {getGenre} from '../../reducer/app/selectors.js';

const MovieCardWrapper = withVideoPlayer(MovieCard);

class MovieList extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {
    const {movies, setActiveItem, removeActiveItem, genre} = this.props;

    const filterMoviesByGenre = (currentGenre, allMovies) => {
      if (currentGenre === Genres.ALL) {
        return allMovies;
      }
      return allMovies.filter((movie) => movie.genre === currentGenre);
    };

    return <div className="catalog__movies-list">
      {filterMoviesByGenre(genre, movies).map((card) => (
        <MovieCardWrapper
          key={card.preview_image}
          cardData={card}
          setActiveItem={setActiveItem}
          removeActiveItem={removeActiveItem}
        />
      ))}
    </div>;
  }
}

const mapStateToProps = (state) => ({
  genre: getGenre(state),
});

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    title: PropTypes.string,
    preview: PropTypes.string.isRequired,
  })).isRequired,
  setActiveItem: PropTypes.func.isRequired,
  removeActiveItem: PropTypes.func.isRequired,
  genre: PropTypes.string.isRequired,
};

export {MovieList};
export default connect(mapStateToProps)(MovieList);
