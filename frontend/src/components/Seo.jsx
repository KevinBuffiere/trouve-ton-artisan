import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

function Seo({ title, description }) {
  const fullTitle = title ? `${title} • Trouve ton artisan` : 'Trouve ton artisan – Auvergne-Rhône-Alpes';
  const metaDescription =
    description ||
    "Trouvez facilement un artisan qualifié en Auvergne-Rhône-Alpes et contactez-le en toute simplicité grâce à notre plateforme.";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_FR" />
    </Helmet>
  );
}

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

Seo.defaultProps = {
  title: undefined,
  description: undefined,
};

export default Seo;
