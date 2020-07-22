import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator} from '../../reducer/app/app.js';
import {getGenre} from '../../reducer/app/selectors.js';
import {getMovies} from '../../reducer/data/selectors.js';

class GenreList extends PureComponent {
  constructor(props) {
    super(props);

    this.getGenreList = this.getGenreList.bind(this);
  }

  getGenreList() {
    const genres = new Set();
    genres.add(`All genres`);
    this.props.movies.forEach((movie) => {
      genres.add(movie.genre);
    });
    const genreList = Array.from(genres);

    return genreList;
  }

  render() {
    const {onClick, setActiveItem} = this.props;
    const genreList = this.getGenreList();
    const genre = this.props.genre;

    return <React.Fragment>
      {genreList.map((item) => {
        const activeClass = genre === item ? `catalog__genres-item--active` : ``;

        return <li
          key={item}
          className={`catalog__genres-item ${activeClass}`}
          onClick={() => {
            onClick(item);
            setActiveItem(item);
          }}
        >
          <a href="#" className="catalog__genres-link">{item}</a>
        </li>;
      })}
    </React.Fragment>;
  }
}

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  genre: getGenre(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  }
});

GenreList.propTypes = {
  genre: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
  })),
  setActiveItem: PropTypes.func.isRequired,
};

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
