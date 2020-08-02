import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import {videoPlayerModes} from '../../const.js';
import withVideoPlayer from '../../hocs/withVideoPlayer/withVideoPlayer.jsx';
import {Player} from '../player/player.jsx';

const PlayerWrapper = withVideoPlayer(Player);

class PlayerPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      allMovies,
    } = this.props;

    const getCurentMovie = (movies, movieId) => {
      return movies.find((movie) => movie.id === movieId);
    };

    const movieId = parseInt(this.props.match.params.id, 10);
    const movie = getCurentMovie(allMovies, movieId);

    if (!movie) {
      return <h2>Loading...</h2>;
    }

    return (
      <PlayerWrapper movie={movie} isMuted={true} videoMode={videoPlayerModes.FULLSCREEN}/>
    );

  }

  onTabClickHandler(tab) {
    this.setState({
      activeTab: tab,
    });
  }
}

PlayerPage.propTypes = {
  allMovies: PropTypes.array.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
};

export {PlayerPage};
