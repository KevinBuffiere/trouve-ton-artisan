import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import api from '../services/apiClient.js';
import { useCategoriesContext } from '../context/CategoriesContext.jsx';
import ArtisanCard from '../components/ArtisanCard.jsx';
import LoadingState from '../components/LoadingState.jsx';
import ErrorState from '../components/ErrorState.jsx';
import Seo from '../components/Seo.jsx';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ArtisanDirectoryPage() {
  const { categories } = useCategoriesContext();
  const { slug } = useParams();
  const queryParams = useQuery();
  const search = queryParams.get('q') || '';
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const activeCategory = useMemo(() => categories.find((category) => category.slug === slug), [categories, slug]);

  useEffect(() => {
    let active = true;
    async function fetchArtisans() {
      try {
        setLoading(true);
        const params = {};
        if (slug) params.category = slug;
        if (search) params.q = search;
        const { data } = await api.get('/artisans', { params });
        if (active) {
          setArtisans(data.data || []);
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

    fetchArtisans();
    return () => {
      active = false;
    };
  }, [slug, search]);

  const pageTitle = slug ? `Artisans ${activeCategory ? `• ${activeCategory.name}` : ''}` : 'Artisans de la région';
  const description = slug
    ? `Retrouvez les artisans de la catégorie ${activeCategory?.name || 'sélectionnée'} en Auvergne-Rhône-Alpes.`
    : search
    ? `Résultats pour la recherche « ${search} » dans l\'annuaire des artisans Auvergne-Rhône-Alpes.`
    : "Parcourez l'annuaire des artisans en Auvergne-Rhône-Alpes et trouvez le professionnel idéal pour votre projet.";

  return (
    <>
      <Seo title={pageTitle} description={description} />
      <section className="container-custom py-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h1 className="h2 mb-3">{slug ? activeCategory?.name || 'Artisans' : 'Trouver un artisan'}</h1>
            {search ? (
              <p className="text-muted mb-0">
                Résultats pour « {search} ». <Link to="/artisans">Effacer la recherche</Link>
              </p>
            ) : (
              <p className="text-muted mb-0">
                {slug
                  ? `Sélection de professionnels qualifiés pour la catégorie ${activeCategory?.name || ''}.`
                  : 'Découvrez les artisans de la région Auvergne-Rhône-Alpes par spécialité.'}
              </p>
            )}
          </div>
          <Link to="/" className="btn btn-outline-primary">
            Retour à l&apos;accueil
          </Link>
        </div>

        {loading ? (
          <LoadingState label="Recherche des artisans…" />
        ) : error ? (
          <ErrorState message="Impossible d\'afficher les artisans pour le moment." />
        ) : artisans.length === 0 ? (
          <ErrorState
            title="Aucun artisan trouvé"
            message="Nous n\'avons pas encore d\'artisan correspondant à votre recherche. Modifiez les filtres ou réessayez plus tard."
          />
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

export default ArtisanDirectoryPage;
