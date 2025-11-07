import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, EnvelopeOpen, PersonBadge, Phone } from 'react-bootstrap-icons';
import api from '../services/apiClient.js';
import ArtisanCard from '../components/ArtisanCard.jsx';
import LoadingState from '../components/LoadingState.jsx';
import ErrorState from '../components/ErrorState.jsx';
import Seo from '../components/Seo.jsx';
import heroIllustration from '../assets/hero-illustration.svg';

const steps = [
  {
    id: 1,
    title: 'Choisir la catégorie',
    description: 'Sélectionnez la famille d\'artisanat qui correspond à votre besoin.',
    icon: <PersonBadge aria-hidden="true" size={28} />,
  },
  {
    id: 2,
    title: 'Explorer les artisans',
    description: 'Parcourez les profils détaillés et trouvez l\'artisan qui vous convient.',
    icon: <ArrowRight aria-hidden="true" size={28} />,
  },
  {
    id: 3,
    title: 'Envoyer un message',
    description: 'Contactez l\'artisan grâce à un formulaire simplifié et sécurisé.',
    icon: <EnvelopeOpen aria-hidden="true" size={28} />,
  },
  {
    id: 4,
    title: 'Recevoir une réponse',
    description: 'L\'artisan vous répond sous 48 heures pour finaliser votre projet.',
    icon: <Phone aria-hidden="true" size={28} />,
  },
];

function HomePage() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchHighlightedArtisans() {
      try {
        setLoading(true);
        const { data } = await api.get('/artisans', { params: { highlighted: true, limit: 3 } });
        if (mounted) {
          setArtisans(data.data || []);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchHighlightedArtisans();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Seo
        title="Accueil"
        description="Trouver un artisan de confiance en Auvergne-Rhône-Alpes : comparez, contactez et obtenez une réponse sous 48 h."
      />
      <section className="container-custom py-5">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-6">
            <div className="hero-banner">
              <p className="text-uppercase fw-semibold mb-3">Auvergne-Rhône-Alpes</p>
              <h1 className="display-5 fw-bold mb-3">Le point de rencontre entre artisans et particuliers</h1>
              <p className="lead mb-4">
                Une plateforme inclusive et sécurisée pour contacter des artisans locaux, vérifier leurs spécialités et obtenir
                un accompagnement rapide.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/artisans" className="btn btn-light text-primary fw-semibold">
                  Rechercher un artisan
                </Link>
                <Link to="/comment-trouver-mon-artisan" className="btn btn-outline-light">
                  Découvrir le fonctionnement
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 text-center text-lg-end">
            <img src={heroIllustration} alt="Personnes recherchant un artisan sur un ordinateur" className="img-fluid" />
          </div>
        </div>
      </section>

      <section className="container-custom pb-5">
        <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3 mb-4">
          <div>
            <h2 className="h3 mb-2">Comment trouver mon artisan ?</h2>
            <p className="text-muted mb-0">
              Suivez ces étapes simples pour entrer en relation avec un professionnel près de chez vous.
            </p>
          </div>
          <Link to="/artisans" className="btn btn-primary">
            Voir tous les artisans
          </Link>
        </div>
        <div className="row g-4">
          {steps.map((step) => (
            <div className="col-12 col-sm-6 col-lg-3" key={step.id}>
              <div className="step-card h-100">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <span className="badge rounded-pill bg-primary-subtle text-primary fw-semibold">{step.id}</span>
                  <div className="text-primary" aria-hidden="true">
                    {step.icon}
                  </div>
                </div>
                <h3 className="h5">{step.title}</h3>
                <p className="text-muted mb-0">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-custom pb-5">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
          <div>
            <h2 className="h3 mb-2">Les artisans du mois</h2>
            <p className="text-muted mb-0">Découvrez une sélection d\'artisans plébiscités par les habitants de la région.</p>
          </div>
          <Link to="/artisans" className="btn btn-outline-primary">
            Parcourir le répertoire
          </Link>
        </div>
        {loading ? (
          <LoadingState label="Chargement des artisans du mois…" />
        ) : error ? (
          <ErrorState message="Impossible de récupérer les artisans du mois pour le moment." />
        ) : (
          <div className="artisan-grid" role="list">
            {artisans.map((artisan) => (
              <ArtisanCard artisan={artisan} key={artisan.slug} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default HomePage;
