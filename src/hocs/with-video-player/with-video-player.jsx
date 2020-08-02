import React, {PureComponent} from "react";
import PropTypes from 'prop-types';

import VideoPlayer from "../../components/video-player/video-player.jsx";

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
        isPause: false,
        fullScreen: false,
        progress: 0,
        duration: 0,
      };

      this._playVideo = this._playVideo.bind(this);
      this._pauseVideo = this._pauseVideo.bind(this);
      this._stopVideo = this._stopVideo.bind(this);
      this._changeFullScreen = this._changeFullScreen.bind(this);
      this._changeProgress = this._changeProgress.bind(this);
    }

    _playVideo() {
      this.setState({
        isPlaying: true,
        isPause: false,
      });
    }

    _pauseVideo() {
      this.setState({
        isPlaying: false,
        isPause: true
      });
    }

    _stopVideo() {
      this.setState({
        isPlaying: false
      });
    }

    _changeFullScreen() {
      this.setState((prevState) => ({fullScreen: !prevState.fullScreen}));
    }

    _changeProgress(currentTime, duration) {
      if (this.state.duration === 0 || isNaN(this.state.duration)) {
        this.setState({duration: Math.round(duration)});
      }
      this.setState({progress: Math.round(currentTime)});
    }

    render() {
      const {isPlaying} = this.state;
      const {isMuted, videoMode} = this.props;

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
          pauseVideo = {() => {
            this._pauseVideo();
          }}
          changeFullScreen = {() => {
            this._changeFullScreen();
          }}
          isVideoPlaying={this.state.isPlaying}
          isVideoPaused={this.state.isPause}
          progress={this.state.progress}
          duration={this.state.duration}
          renderPlayer={(cardData) => {
            return (
              <VideoPlayer
                cardData = {cardData}
                isMuted = {isMuted}
                isPlaying={this.state.isPlaying}
                isPaused={this.state.isPause}
                isFullScreen={this.state.fullScreen}
                videoMode={videoMode}
                changeFullScreen = {() => {
                  this._changeFullScreen();
                }}
                changeProgress={(currentTime, duration) => {
                  this._changeProgress(currentTime, duration);
                }}
              />
            );
          }}
        />
      );
    }
  }

  WithVideoPlayer.propTypes = {
    isMuted: PropTypes.bool.isRequired,
    videoMode: PropTypes.string.isRequired,
  };

  return WithVideoPlayer;
};


export default withVideoPlayer;
