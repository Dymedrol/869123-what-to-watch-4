import React from 'react';
import PropTypes from 'prop-types';

const ShowMore = (props) => {
  const {onShowMoreClickHandler, allMoviesLength, filtredMoviesLength} = props;

  const renderShowMoreButton = () => {
    if (filtredMoviesLength < allMoviesLength) {
      return <button className="catalog__button" type="button" onClick={onShowMoreClickHandler}>Show more</button>;
    }
    return null;
  };

  return (
    <div className="catalog__more">
      {renderShowMoreButton()}
    </div>
  );
};

ShowMore.propTypes = {
  onShowMoreClickHandler: PropTypes.func.isRequired,
  allMoviesLength: PropTypes.number.isRequired,
  filtredMoviesLength: PropTypes.number.isRequired
};

export default ShowMore;
