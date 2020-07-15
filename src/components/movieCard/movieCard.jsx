import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../videoPlayer/videoPlayer.jsx";

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false
    };
  }

  render() {
    const {cardData, onMovieTitleClickHandler, onCardHoverHandler} = this.props;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={() => {
          onCardHoverHandler(cardData);
          this.setState({
            isPlaying: true
          });
        }}
        onMouseLeave = {() => {
          onCardHoverHandler(null);
          this.setState({
            isPlaying: false
          });
        }}
      >
        <div className="small-movie-card__image">
          <VideoPlayer
            isPlaying={this.state.isPlaying}
            cardData = {cardData}
            isMuted = {true}
          />
        </div>
        <h3 className="small-movie-card__title" onClick={onMovieTitleClickHandler}>
          <a className="small-movie-card__link" href="movie-page.html">{cardData.title}</a>
        </h3>
      </article>
    );
  }
}

MovieCard.propTypes = {
  cardData: PropTypes.shape({
    src: PropTypes.string,
    title: PropTypes.string,
    preview: PropTypes.string.isRequired,
  }).isRequired,
  onMovieTitleClickHandler: PropTypes.func.isRequired,
  onCardHoverHandler: PropTypes.func.isRequired,
};

export default MovieCard;
