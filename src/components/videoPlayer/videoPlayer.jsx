import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";


class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();
    this._duration = null;
    this._timeoutPlayHandler = null;
  }

  _launchFullScreen(element) {
    if (element.requestFullScreen) {
      element.requestFullScreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    }
  }

  _changeFullscreen(video) {
    const {changeFullScreen} = this.props;

    if (video.classList.contains(`fullscreen`)) {
      video.classList.remove(`fullscreen`);
      changeFullScreen();
    }
  }

  componentDidMount() {
    const video = this._videoRef.current;
    const {changeProgress} = this.props;

    video.src = this.props.cardData.previewVideoLink;
    video.muted = this.props.isMuted;

    video.ontimeupdate = () => {
      if (changeProgress) {
        changeProgress(video.currentTime, video.duration);
      }
    };
  }

  componentWillUnmount() {
    const video = this._videoRef.current;
    video.onplay = null;
    video.ontimeupdate = null;
    video.onpause = null;
    video.muted = null;
    video.src = ``;
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    const {isPlaying, isPaused, isFullScreen, videoMode} = this.props;

    switch (videoMode) {
      case `fullscreen`:
        if (isPlaying) {
          video.play();
        } else {
          if (isPaused) {
            video.pause();
          } else {
            video.load();
          }
        }
        break;
      case `small`:
        if (isPlaying) {
          this._timeoutPlayHandler = setTimeout(() => video.play(), 1000);
        } else {
          if (this._timeoutPlayHandler) {
            clearTimeout(this._timeoutPlayHandler);
            this._timeoutPlayHandler = null;
          }
          video.load();
        }
        break;
    }


    video.addEventListener(`webkitfullscreenchange`, () => {
      this._changeFullscreen(video);
    });
    video.addEventListener(`mozfullscreenchange`, () => {
      this._changeFullscreen(video);
    });
    video.addEventListener(`fullscreenchange`, () => {
      this._changeFullscreen(video);
    });

    if (isFullScreen) {
      this._launchFullScreen(video);
      video.classList.add(`fullscreen`);
    }
  }

  render() {
    const previewImage = this.props.cardData.previewImage;

    return (
      <video
        ref = {this._videoRef}
        poster = {previewImage}
        className={`player__video`}
      />
    );
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isMuted: PropTypes.bool.isRequired,
  cardData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    previewVideoLink: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
  }),
  changeFullScreen: PropTypes.func.isRequired,
  changeProgress: PropTypes.func.isRequired,
  isPaused: PropTypes.bool.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
  videoMode: PropTypes.string.isRequired,
};

export default VideoPlayer;
