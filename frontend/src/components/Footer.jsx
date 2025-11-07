import { Link } from 'react-router-dom';

const legalLinks = [
  { path: '/mentions-legales', label: 'Mentions légales' },
  { path: '/donnees-personnelles', label: 'Données personnelles' },
  { path: '/accessibilite', label: 'Accessibilité' },
  { path: '/cookies', label: 'Cookies' },
];

function Footer() {
  return (
    <footer className="footer mt-auto">
      <div className="container-custom">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <h2 className="h5 mb-3">Région Auvergne-Rhône-Alpes</h2>
            <address className="mb-3">
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France
            </address>
            <p className="mb-0">
              <a className="fw-semibold" href="tel:+33426734000">
                +33 (0)4 26 73 40 00
              </a>
            </p>
          </div>
          <div className="col-12 col-md-3">
            <h2 className="h6 mb-3">Navigation</h2>
            <ul className="list-unstyled d-grid gap-2">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-12 col-md-3">
            <h2 className="h6 mb-3">Suivre la région</h2>
            <p>Retrouvez toutes les actualités sur le site officiel de la région Auvergne-Rhône-Alpes.</p>
            <a className="btn btn-outline-light" href="https://www.auvergnerhonealpes.fr" target="_blank" rel="noreferrer">
              Site institutionnel
            </a>
          </div>
        </div>
        <div className="border-top border-secondary-subtle mt-4 pt-3 d-flex flex-column flex-md-row justify-content-between gap-2">
          <small>© {new Date().getFullYear()} Région Auvergne-Rhône-Alpes. Tous droits réservés.</small>
          <small>
            Design inspiré de l&apos;identité numérique régionale. Respect des normes WCAG 2.1 AA.
          </small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
