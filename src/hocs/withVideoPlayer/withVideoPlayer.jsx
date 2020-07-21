import React, {PureComponent} from "react";
import VideoPlayer from "../../components/videoPlayer/videoPlayer.jsx";

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false
      };

      this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
      this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
    }

    onMouseEnterHandler() {
      this.setState({
        isPlaying: true
      });
    }

    onMouseLeaveHandler() {
      this.setState({
        isPlaying: false
      });
    }

    render() {
      const {isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          onMouseEnter={() => {
            this.onMouseEnterHandler();
          }}
          onMouseLeave = {() => {
            this.onMouseLeaveHandler();
          }}
          renderPlayer={(cardData) => {
            return (
              <VideoPlayer
                cardData = {cardData}
                isMuted = {true}
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
