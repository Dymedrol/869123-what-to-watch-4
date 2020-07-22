import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";


class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();
    this._timeoutPlayHandler = null;
  }

  componentDidMount() {
    const video = this._videoRef.current;

    video.src = this.props.cardData.preview_video_link;
    video.muted = this.props.isMuted;
  }

  componentWillUnmount() {
    const video = this._videoRef.current;
    video.onplay = null;
    video.muted = null;
    video.src = ``;
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
      this._timeoutPlayHandler = setTimeout(() => video.play(), 1000);
    } else {
      if (this._timeoutPlayHandler) {
        clearTimeout(this._timeoutPlayHandler);
        this._timeoutPlayHandler = null;
      }
      video.load();
    }
  }

  render() {
    const preview_image = this.props.cardData.preview_image;

    return (
      <video
        ref = {this._videoRef}
        poster = {preview_image}
        className={`player__video`}
      />
    );
  }
}

// VideoPlayer.propTypes = {
//   isPlaying: PropTypes.bool.isRequired,
//   isMuted: PropTypes.bool.isRequired,
//   cardData: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     src: PropTypes.string.isRequired,
//     preview: PropTypes.string.isRequired,
//   }),
// };

export default VideoPlayer;
