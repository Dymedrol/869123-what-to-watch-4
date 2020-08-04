import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator} from '../../reducer/app/app.js';
import {getGenre, getGenreList} from '../../reducer/app/selectors.js';
import {getMovies} from '../../reducer/data/selectors.js';

const GenreList = (props) => {
  const {onClick, setActiveItem, genreList, genre} = props;

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
};


GenreList.propTypes = {
  genre: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
  })),
  setActiveItem: PropTypes.func.isRequired,
  genreList: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  genre: getGenre(state),
  genreList: getGenreList(state)
});

const mapDispatchToProps = (dispatch) => ({
  onClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  }
});

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
