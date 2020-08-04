import React, {PureComponent} from 'react';
import PropTypes from "prop-types";

import {Header} from '../header/header.jsx';
import {ReviewLength} from '../../const.js';

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this._formRef = React.createRef();
    this._buttonRef = React.createRef();
    this._textAreaRef = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
    this.onTextareaChange = this.onTextareaChange.bind(this);
    this.toggleFormDisability = this.toggleFormDisability.bind(this);
  }

  toggleFormDisability() {
    this._textAreaRef.current.disabled = !this._textAreaRef.current.disabled;
    this._buttonRef.current.disabled = !this._buttonRef.current.disabled;
  }

  onTextareaChange() {
    const form = this._formRef.current;
    const comment = form.querySelector(`#review-text`).value;

    if (comment.length > ReviewLength.MIN && comment.length < ReviewLength.MAX) {
      this._buttonRef.current.disabled = false;
    }
  }

  onSubmit(e) {
    e.preventDefault();

    this.toggleFormDisability();

    const form = this._formRef.current;
    const rating = form.querySelector(`.rating__input:checked`).value;
    const comment = form.querySelector(`#review-text`).value;
    const id = this.props.movieId;

    const review = {
      id,
      rating,
      comment
    };

    this.props.onReviewSubmit(review, this.toggleFormDisability);
  }

  render() {
    const {authorizationStatus, userAvatar, allMovies} = this.props;

    const getCurentMovie = (movies, movieId) => {
      return movies.find((movie) => movie.id === movieId);
    };

    const movieId = parseInt(this.props.movieId, 10);

    const movie = getCurentMovie(allMovies, movieId);

    if (!movie) {
      return <h2>Loading...</h2>;
    }

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
              <textarea
                ref={this._textAreaRef}
                className="add-review__textarea"
                name="review-text" id="review-text"
                placeholder="Review text"
                minLength={ReviewLength.MIN}
                maxLength={ReviewLength.MAX}
                onChange={this.onTextareaChange}>
              </textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit" ref={this._buttonRef} disabled={true}>Post</button>
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
  onReviewSubmit: PropTypes.func.isRequired,
  allMovies: PropTypes.array.isRequired,
  movieId: PropTypes.string.isRequired
};

export {AddReview};

