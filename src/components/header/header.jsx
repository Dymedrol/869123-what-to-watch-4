import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {LoginStatus} from '../../const.js';

import {authorizationStatus, xxx} from '../../reducer/app/selectors.js';

const Header = (props) => {

  const {authorizationStatus} = props;

  const renderAvatar = () => {
    if (authorizationStatus === LoginStatus.AUTH) {
      return (
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      );
    } else {
      return <a  className="user-block__link">Sign in</a>;
    }
  };


  return <header className="page-header movie-card__head">
      <div className="logo">
        <a className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <div className="user-block">
        {renderAvatar()}
      </div>
    </header>

};

export {Header};
