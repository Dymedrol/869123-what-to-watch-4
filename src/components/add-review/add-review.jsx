import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {Header} from '../header/header.jsx';
import {reviewLength} from '../../const.js';

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isFormCorrect: null,
    };

    this._formRef = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
  }


  onSubmit(e) {
    e.preventDefault();

    const form = this._formRef.current;
    const rating = form.querySelector(`.rating__input:checked`).value;
    const comment = form.querySelector(`#review-text`).value;
    const id = this.props.movie.id;

    if (comment.length < reviewLength.MIN || comment.length > reviewLength.MAX) {
      this.setState({
        isFormCorrect: false,
      });
      return;
    }
    const review = {
      id,
      rating,
      comment,
    };

    this.props.onReviewSubmit(review);
  }

  render() {
    const {authorizationStatus, userAvatar, movie} = this.props;

    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={movie.backgroundImage} alt={movie.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header
            authorizationStatus = {authorizationStatus}
            userAvatar = {userAvatar}
          />

          <div className="movie-card__poster movie-card__poster--small">
            <img src={movie.posterImage} alt={movie.name} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form" ref={this._formRef} onSubmit={this.onSubmit}>
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3" defaultChecked />
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5" />
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" minLength={reviewLength.MIN} maxLength={reviewLength.MAX}></textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit">Post</button>
              </div>

            </div>
          </form>
        </div>

      </section>
    );
  }
}

AddReview.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  userAvatar: PropTypes.string,
  movie: PropTypes.object.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,
};

export {AddReview};

