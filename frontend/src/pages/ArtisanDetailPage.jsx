import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/apiClient.js';
import LoadingState from '../components/LoadingState.jsx';
import ErrorState from '../components/ErrorState.jsx';
import RatingStars from '../components/RatingStars.jsx';
import Seo from '../components/Seo.jsx';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

function ArtisanDetailPage() {
  const { slug } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    let active = true;
    async function fetchArtisan() {
      try {
        setLoading(true);
        const { data } = await api.get(`/artisans/${slug}`);
        if (active) {
          setArtisan(data.data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchArtisan();
    return () => {
      active = false;
    };
  }, [slug]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    setFeedback(null);
    try {
      await api.post(`/artisans/${slug}/contact`, formData);
      setFeedback({ type: 'success', message: "Votre message a bien été envoyé. L'artisan vous répondra sous 48h." });
      setFormData(initialForm);
    } catch (submitError) {
      setFeedback({ type: 'error', message: "Impossible d'envoyer le message actuellement." });
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <LoadingState label="Chargement de la fiche artisan…" />;
  }

  if (error || !artisan) {
    return (
      <section className="container-custom py-5">
        <Seo title="Artisan introuvable" />
        <ErrorState
          title="Artisan introuvable"
          message="Cet artisan n'est plus disponible ou la page a été déplacée."
          action={
            <Link className="btn btn-primary mt-3" to="/artisans">
              Retourner à la liste des artisans
            </Link>
          }
        />
      </section>
    );
  }

  return (
    <section className="container-custom py-5">
      <Seo title={artisan.name} description={artisan.shortDescription} />
      <nav aria-label="Fil d'Ariane" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Accueil</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/artisans">Artisans</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {artisan.name}
          </li>
        </ol>
      </nav>

      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <article className="card border-0 shadow-sm overflow-hidden">
            <div className="ratio ratio-16x9 bg-light">
              <img
                src={artisan.coverImageUrl || '/placeholder-artisan.svg'}
                alt={artisan.name}
                className="w-100 h-100 object-fit-cover"
              />
            </div>
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between gap-3 mb-3">
                <div>
                  <h1 className="h3 mb-1">{artisan.name}</h1>
                  <p className="mb-0 text-muted">{artisan.specialty?.name}</p>
                </div>
                <RatingStars value={artisan.rating || 0} />
              </div>
              <p className="lead">{artisan.description}</p>
              <dl className="row mb-0">
                <dt className="col-sm-4">Localisation</dt>
                <dd className="col-sm-8">{artisan.city} ({artisan.department})</dd>
                <dt className="col-sm-4">Zone d'intervention</dt>
                <dd className="col-sm-8">{artisan.serviceArea}</dd>
                {artisan.website && (
                  <>
                    <dt className="col-sm-4">Site web</dt>
                    <dd className="col-sm-8">
                      <a href={artisan.website} target="_blank" rel="noreferrer">
                        {artisan.website}
                      </a>
                    </dd>
                  </>
                )}
              </dl>
            </div>
          </article>
        </div>
        <div className="col-12 col-lg-5">
          <div className="card contact-card border-0 p-4 h-100">
            <h2 className="h4">Contacter {artisan.name}</h2>
            <p className="text-muted">
              Remplissez ce formulaire pour adresser votre demande directement à l&apos;artisan. Une réponse vous sera apportée
              sous 48 heures.
            </p>
            {feedback ? (
              <div className={`alert ${feedback.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="status">
                {feedback.message}
              </div>
            ) : null}
            <form className="d-grid gap-3" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="contact-name" className="form-label">
                  Nom
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="form-label">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="form-label">
                  Téléphone (optionnel)
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="form-label">
                  Objet
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  className="form-control"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="form-label">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-control"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={sending}>
                {sending ? 'Envoi en cours…' : 'Envoyer ma demande'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArtisanDetailPage;
