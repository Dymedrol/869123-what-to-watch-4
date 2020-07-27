import React, {PureComponent} from "react";
import VideoPlayer from "../../components/videoPlayer/videoPlayer.jsx";

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false
      };

      this._playVideo = this._playVideo.bind(this);
      this._stopVideo = this._stopVideo.bind(this);
    }

    _playVideo() {
      this.setState({
        isPlaying: true
      });
    }

    _stopVideo() {
      this.setState({
        isPlaying: false
      });
    }

    render() {
      const {isPlaying} = this.state;
      const {isMuted} = this.props;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          playVideo={() => {
            this._playVideo();
          }}
          stopVideo = {() => {
            this._stopVideo();
          }}
          isVideoPlaying={this.state.isPlaying}
          renderPlayer={(cardData) => {
            return (
              <VideoPlayer
                cardData = {cardData}
                isMuted = {isMuted}
                isPlaying={this.state.isPlaying}
              />
            );
          }}
        />
      );
    }
  }

  return WithVideoPlayer;
};

export default withVideoPlayer;
