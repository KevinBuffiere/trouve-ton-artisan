import PropTypes from 'prop-types';
import Seo from '../components/Seo.jsx';

function LegalPage({ title }) {
  return (
    <section className="container-custom py-5">
      <Seo title={title} description={`Page ${title.toLowerCase()} de la plateforme Trouve ton artisan.`} />
      <h1 className="h2 mb-3">{title}</h1>
      <p className="lead">Page en construction.</p>
      <p className="text-muted">
        Ce contenu sera prochainement rédigé par le cabinet spécialisé mandaté par la région Auvergne-Rhône-Alpes.
      </p>
    </section>
  );
}

LegalPage.propTypes = {
  title: PropTypes.string.isRequired,
};

export default LegalPage;
