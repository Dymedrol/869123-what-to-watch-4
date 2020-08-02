import React from "react";
import PropTypes from "prop-types";
import moment from 'moment';
import {Link} from 'react-router-dom';

import {AppRoute} from '../../const.js';

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.playVideo();
  }

  render() {

    const {
      movie,
      renderPlayer,
      playVideo,
      pauseVideo,
      changeFullScreen,
      isVideoPaused,
      progress,
      duration,
    } = this.props;

    const toggleButton = () =>{
      if (isVideoPaused) {
        playVideo();
      } else {
        pauseVideo();
      }
    };

    const getProgressBarValue = () => {
      if (isNaN(duration) || duration === 0) {
        return 0;
      } else {
        return progress * 100 / duration;
      }
    };

    const getTimeValue = () => {
      if (duration) {
        return moment.utc(duration * 1000).format(`H:mm:ss`);
      }

      return `0:00:00`;
    };

    return (
      <div className="player">
        {renderPlayer(movie)}

        <Link
          className="player__exit"
          to={`${AppRoute.MOVIE_PAGE}/${movie.id}/`}
        >Exit</Link>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={getProgressBarValue()} max="100"></progress>
              <div className="player__toggler" style={{left: `${getProgressBarValue()}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{getTimeValue()}</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play" onClick={toggleButton}>
              {isVideoPaused &&
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s" />
                </svg>
                ||
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause" />
                </svg>
              }
            </button>
            <div className="player__name">{movie.name}</div>

            <button type="button" className="player__full-screen" onClick={changeFullScreen}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  playVideo: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  pauseVideo: PropTypes.func.isRequired,
  changeFullScreen: PropTypes.func.isRequired,
  isVideoPlaying: PropTypes.bool.isRequired,
  isVideoPaused: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

export {Player};
