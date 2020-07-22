import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {Genres} from "./../../const.js";
import {ActionCreator} from "./../../reducer.js";
import MovieCard from '../movieCard/movieCard.jsx';
import withVideoPlayer from '../../hocs/withVideoPlayer/withVideoPlayer.jsx';

const MovieCardWrapper = withVideoPlayer(MovieCard);

class MovieList extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {
    const {movies, setActiveItem, removeActiveItem, genre} = this.props;

    const filterMoviesByGenre = (genre, movies) => {
      if (genre === Genres.ALL) {
        return movies;
      }
      return movies.filter((movie) => movie.genre === genre);
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
  genre: state.genre,
});

// MovieList.propTypes = {
//   movies: PropTypes.arrayOf(PropTypes.shape({
//     src: PropTypes.string,
//     title: PropTypes.string,
//     preview: PropTypes.string.isRequired,
//   })).isRequired,
//   setActiveItem: PropTypes.func.isRequired,
//   removeActiveItem: PropTypes.func.isRequired,
// };

export {MovieList};
export default connect(mapStateToProps)(MovieList);
