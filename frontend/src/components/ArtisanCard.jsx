import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { GeoAlt } from 'react-bootstrap-icons';
import RatingStars from './RatingStars.jsx';

function ArtisanCard({ artisan }) {
  return (
    <article className="card artisan-card h-100" role="listitem">
      <Link to={`/artisans/${artisan.slug}`} className="text-decoration-none text-dark">
        <div className="artisan-card__header">
          <img
            src={artisan.coverImageUrl || '/placeholder-artisan.svg'}
            alt=""
            className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
            loading="lazy"
          />
          {artisan.specialty?.name ? <span className="artisan-card__badge">{artisan.specialty.name}</span> : null}
        </div>
        <div className="artisan-card__body">
          <div className="d-flex justify-content-between align-items-start gap-2">
            <h3 className="h5 mb-2">{artisan.name}</h3>
            <RatingStars value={artisan.rating || 0} />
          </div>
          <p className="text-muted mb-2">{artisan.shortDescription}</p>
          <p className="text-muted d-flex align-items-center gap-2 mb-0">
            <GeoAlt aria-hidden="true" />
            <span>
              {artisan.city} ({artisan.department})
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
}

ArtisanCard.propTypes = {
  artisan: PropTypes.shape({
    id: PropTypes.number,
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number,
    shortDescription: PropTypes.string,
    city: PropTypes.string,
    department: PropTypes.string,
    coverImageUrl: PropTypes.string,
    specialty: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default ArtisanCard;
