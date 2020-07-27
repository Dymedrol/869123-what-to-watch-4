import React from "react";
import PropTypes from "prop-types";

// const Player = (props) => {

//   const {movie, onExitButtonHandler, renderPlayer, playVideo, stopVideo, isVideoPlaying} = props;

//   const toggleButton = () =>{
//     if (isVideoPlaying) {
//       stopVideo();
//     } else {
//       playVideo();
//     }
//   }

//   return <div className="player">
//       {renderPlayer(movie)}

//       <button type="button" className="player__exit" onClick={onExitButtonHandler}>Exit</button>

//       <div className="player__controls">
//         <div className="player__controls-row">
//           <div className="player__time">
//             <progress className="player__progress" value="30" max="100"></progress>
//             <div className="player__toggler" style={{style : '30%'}}>Toggler</div>
//           </div>
//           <div className="player__time-value">1:30:29</div>
//         </div>

//         <div className="player__controls-row">
//           <button type="button" className="player__play" onClick={toggleButton}>
//             {isVideoPlaying &&
//               <svg viewBox="0 0 14 21" width="14" height="21">
//                 <use xlinkHref="#pause" />
//               </svg>
//               ||
//               <svg viewBox="0 0 19 19" width="19" height="19">
//                 <use xlinkHref="#play-s" />
//               </svg>
//             }
//           </button>
//           <div className="player__name">{movie.name}</div>

//           <button type="button" className="player__full-screen">
//             <svg viewBox="0 0 27 27" width="27" height="27">
//               <use xlinkHref="#full-screen"></use>
//             </svg>
//             <span>Full screen</span>
//           </button>
//         </div>
//       </div>
//     </div>
// };

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.playVideo();
  }

  render() {

  const {movie, onExitButtonHandler, renderPlayer, playVideo, stopVideo, isVideoPlaying} = this.props;

  const toggleButton = () =>{
    if (isVideoPlaying) {
      stopVideo();
    } else {
      playVideo();
    }
  }
    return (
      <div className="player">
        {renderPlayer(movie)}

        <button type="button" className="player__exit" onClick={onExitButtonHandler}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="30" max="100"></progress>
              <div className="player__toggler" style={{style : '30%'}}>Toggler</div>
            </div>
            <div className="player__time-value">1:30:29</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play" onClick={toggleButton}>
              {isVideoPlaying &&
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause" />
                </svg>
                ||
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s" />
                </svg>
              }
            </button>
            <div className="player__name">{movie.name}</div>

            <button type="button" className="player__full-screen">
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

export {Player};