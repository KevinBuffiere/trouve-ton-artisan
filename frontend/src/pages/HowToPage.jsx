import Seo from '../components/Seo.jsx';

const steps = [
  {
    id: 1,
    title: 'Choisir la catégorie',
    detail:
      "Parcourez les grandes familles d'artisanat (bâtiment, services, fabrication, alimentation) et sélectionnez celle qui correspond à votre projet.",
  },
  {
    id: 2,
    title: 'Comparer les artisans',
    detail:
      "Consultez les profils : spécialités, zone d'intervention, notes et avis pour identifier le professionnel le plus adapté.",
  },
  {
    id: 3,
    title: 'Envoyer votre demande',
    detail: "Utilisez le formulaire sécurisé pour expliquer votre besoin, joindre des précisions et partager vos coordonnées.",
  },
  {
    id: 4,
    title: 'Recevoir une réponse',
    detail: "L'artisan vous contacte sous 48 heures pour discuter des modalités et planifier la prestation.",
  },
];

function HowToPage() {
  return (
    <section className="container-custom py-5">
      <Seo title="Comment trouver mon artisan ?" description="Découvrez comment utiliser la plateforme Trouve ton artisan étape par étape." />
      <h1 className="h2 mb-4">Comment trouver mon artisan ?</h1>
      <p className="lead text-muted mb-5">
        La plateforme a été conçue pour être accessible à tous. Suivez le guide pour contacter un artisan de confiance en
        quelques minutes.
      </p>
      <div className="d-grid gap-4">
        {steps.map((step) => (
          <article key={step.id} className="step-card">
            <div className="d-flex gap-3 align-items-center mb-3">
              <span className="badge rounded-pill bg-primary-subtle text-primary fw-semibold fs-5">{step.id}</span>
              <h2 className="h4 mb-0">{step.title}</h2>
            </div>
            <p className="mb-0 text-muted">{step.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default HowToPage;
