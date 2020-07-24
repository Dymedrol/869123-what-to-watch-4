import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import MovieCard from '../movieCard/movieCard.jsx';
import withVideoPlayer from '../../hocs/withVideoPlayer/withVideoPlayer.jsx';
import {getMoviesByGenre} from '../../reducer/app/selectors.js';

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
        />
      ))}
    </div>;
  }
}

const mapStateToProps = (state) => ({
  movies: getMoviesByGenre(state),
});

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    previewImage: PropTypes.string,
    name: PropTypes.string,
    previewVideoLink: PropTypes.string.isRequired,
  })).isRequired,
  setActiveItem: PropTypes.func.isRequired,
  removeActiveItem: PropTypes.func.isRequired,
};

export {MovieList};
export default connect(mapStateToProps)(MovieList);
