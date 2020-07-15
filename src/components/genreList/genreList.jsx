import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "./../../reducer.js";

class GenreList extends PureComponent {
  constructor(props) {
    super(props);

    this.allMovies = this.props.movies;

    this.getGenreList = this.getGenreList.bind(this);
  }

  getGenreList() {
    const genres = new Set();
    genres.add(`All genres`);
    this.allMovies.forEach((movie) => {
      genres.add(movie.genre);
    });
    const genreList = Array.from(genres);

    return genreList;
  }

  render() {
    const {genre, onClick} = this.props;
    const genreList = this.getGenreList();

    return <React.Fragment>
      {genreList.map((item) => {
        const activeClass = genre === item ? `catalog__genres-item--active` : ``;

        return <li
          key={item}
          className={`catalog__genres-item ${activeClass}`}
          onClick={() => {
            onClick(item);
          }}
        >
          <a href="#" className="catalog__genres-link">{item}</a>
        </li>;
      })}
    </React.Fragment>;
  }
}

const mapStateToProps = (state) => ({
  genre: state.genre,
  movies: state.movies,
});

const mapDispatchToProps = (dispatch) => ({
  onClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.getFilmsByGenre());
  }
});

GenreList.propTypes = {
  genre: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  })),
};

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);