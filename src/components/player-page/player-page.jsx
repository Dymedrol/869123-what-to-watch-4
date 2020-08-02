import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import {videoPlayerModes, LoginStatus, AppRoute} from '../../const.js';
import {getMovies} from '../../reducer/data/selectors.js';
import withVideoPlayer from '../../hocs/withVideoPlayer/withVideoPlayer.jsx';
import {Player} from '../player/player.jsx';
import {Operation as userOperation} from "../../reducer/user/user.js";

const PlayerWrapper = withVideoPlayer(Player);

class PlayerPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      allMovies,
      onPlayButtonHandler,
      onExitButtonHandler,
      authorizationStatus,
    } = this.props;

    console.log(allMovies);

    const getCurentMovie = (movies, movieId) => {
      console.log(movies, movieId)
      return movies.find((movie) => movie.id === movieId);
    };

    const movieId = parseInt(this.props.match.params.id, 10);

    const movie = getCurentMovie(allMovies, movieId);

    if (!movie) {
      return <h2>Loading...</h2>;
    }

    return (
      <PlayerWrapper movie={movie} onExitButtonHandler={onExitButtonHandler} isMuted={true} videoMode={videoPlayerModes.FULLSCREEN}/>
    );

  }

  onTabClickHandler(tab) {
    this.setState({
      activeTab: tab,
    });
  }
}

// MoviePage.propTypes = {
//   movie: PropTypes.shape({
//     backgroundImage: PropTypes.string.isRequired,
//     backgroundColor: PropTypes.string.isRequired,
//     genre: PropTypes.string.isRequired,
//     posterImage: PropTypes.string.isRequired,
//     rating: PropTypes.number.isRequired,
//     ratingString: PropTypes.string.isRequired,
//     released: PropTypes.number.isRequired,
//     runTime: PropTypes.number.isRequired,
//     previewImage: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     previewVideoLink: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     director: PropTypes.string.isRequired,
//     starring: PropTypes.array.isRequired,
//     isFavorite: PropTypes.bool.isRequired,
//     id: PropTypes.number.isRequired,
//   }).isRequired,
//   allMovies: PropTypes.array.isRequired,
//   onPlayButtonHandler: PropTypes.func.isRequired,
//   onExitButtonHandler: PropTypes.func.isRequired,
//   isMoviePlaying: PropTypes.bool.isRequired,
//   authorizationStatus: PropTypes.string.isRequired,
//   userAvatar: PropTypes.string.isRequired,
//   onMyListClick: PropTypes.func.isRequired,
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.string.isRequired
//     })
//   }),
//   loadReviews: PropTypes.func.isRequired,
//   reviews: PropTypes.array.isRequired,
// };

export {PlayerPage};
