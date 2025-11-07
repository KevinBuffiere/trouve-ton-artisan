import PropTypes from 'prop-types';
import { StarFill, StarHalf, Star } from 'react-bootstrap-icons';

const MAX_STARS = 5;

function RatingStars({ value }) {
  const stars = [];
  for (let index = 1; index <= MAX_STARS; index += 1) {
    const diff = value - index + 1;
    if (diff >= 1) {
      stars.push(<StarFill key={index} className="text-warning" aria-hidden="true" />);
    } else if (diff > 0) {
      stars.push(<StarHalf key={index} className="text-warning" aria-hidden="true" />);
    } else {
      stars.push(<Star key={index} className="text-warning" aria-hidden="true" />);
    }
  }

  return (
    <span className="rating-stars" aria-label={`Note ${value.toFixed(1)} sur 5`}>
      {stars}
      <span className="rating-stars__label">{value.toFixed(1)} / 5</span>
    </span>
  );
}

RatingStars.propTypes = {
  value: PropTypes.number.isRequired,
};

export default RatingStars;
