import React from 'react';
import PropTypes from 'prop-types';

const TabList = (props) => {
  const {tabs, setActiveItem, activeElement, onTabClickHandler} = props;

  let activeTab = activeElement;

  if (activeTab === null) {
    activeTab = `Overview`;
  }

  return (
    <ul className="movie-nav__list">
      {tabs.map((item) => {
        const activeClass = activeTab === item ? `movie-nav__item--active` : ``;

        return <li
          className={`movie-nav__item ${activeClass}`}
          key={`tab-${item}`}
          onClick={() => {
            setActiveItem(item);
            onTabClickHandler(item);
          }}
        >
          <a className="movie-nav__link">{item}</a>
        </li>;
      })}
    </ul>
  );
};

TabList.propTypes = {
  tabs: PropTypes.array.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  onTabClickHandler: PropTypes.func.isRequired,
  activeElement: PropTypes.string,
};

export default TabList;
