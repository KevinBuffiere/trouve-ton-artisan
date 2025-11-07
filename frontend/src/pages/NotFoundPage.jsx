import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import notFoundIllustration from '../assets/not-found.svg';

function NotFoundPage() {
  return (
    <section className="container-custom py-5 text-center">
      <Seo title="Page non trouvée" />
      <img src={notFoundIllustration} alt="Page non trouvée" className="img-fluid mb-4" style={{ maxWidth: '380px' }} />
      <h1 className="display-5 fw-bold">Oups ! Page introuvable</h1>
      <p className="lead text-muted mb-4">
        La page que vous recherchez n&apos;existe pas ou a été déplacée. Vérifiez l&apos;adresse ou revenez à l&apos;accueil.
      </p>
      <Link to="/" className="btn btn-primary">
        Retour à l&apos;accueil
      </Link>
    </section>
  );
}

export default NotFoundPage;
