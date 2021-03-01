import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Review from './review';
import ReviewForm from './review-form';
import Loader from '../loader';

import styles from './reviews.module.css';

import {
  reviewsLoadingSelector,
  reviewsLoadedSelector,
} from '../../redux/selectors';
import { loadReviews } from '../../redux/actions';
import { connect } from 'react-redux';

const Reviews = ({ reviews, restaurantId, loadReviews, loading, loaded }) => {
  useEffect(() => {
    if (!loading[restaurantId] && !loaded[restaurantId]) {
      loadReviews(restaurantId);
    }
  }, [loadReviews, restaurantId]);

  if (loading[restaurantId]) return <Loader />;
  if (!loading[restaurantId] && !loaded[restaurantId]) return 'No data :(';

  return (
    <div className={styles.reviews}>
      {reviews.map((id) => (
        <Review key={id} id={id} />
      ))}
      <ReviewForm restaurantId={restaurantId} />
    </div>
  );
};

Reviews.propTypes = {
  restaurantId: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default connect(
  (state) => ({
    loading: reviewsLoadingSelector(state),
    loaded: reviewsLoadedSelector(state),
  }),
  { loadReviews }
)(Reviews);
