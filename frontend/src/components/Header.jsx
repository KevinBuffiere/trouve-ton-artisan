import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Search } from 'react-bootstrap-icons';
import { useCategoriesContext } from '../context/CategoriesContext.jsx';
import logo from '../assets/logo-aura.svg';

const legalPaths = ['/mentions-legales', '/donnees-personnelles', '/accessibilite', '/cookies'];

function Header() {
  const { categories } = useCategoriesContext();
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!legalPaths.includes(location.pathname)) {
      setQuery(new URLSearchParams(location.search).get('q') || '');
    }
    setExpanded(false);
  }, [location.pathname, location.search]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) {
      params.set('q', query.trim());
    }
    navigate({ pathname: '/artisans', search: params.toString() });
  };

  return (
    <header className="bg-white sticky-top header-shadow">
      <nav className="navbar navbar-expand-lg navbar-light bg-white" aria-label="Navigation principale">
        <div className="container-custom w-100">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/" aria-label="Accueil">
            <img src={logo} alt="Trouve ton artisan" width="42" height="42" />
            <span className="fw-semibold">Trouve ton artisan</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={expanded}
            onClick={() => setExpanded((prev) => !prev)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={`navbar-collapse ${expanded ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-3 align-items-lg-center">
              {categories.map((category) => (
                <li className="nav-item" key={category.slug}>
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'fw-semibold text-primary' : ''}`} to={`/categorie/${category.slug}`}>
                    {category.name}
                  </NavLink>
                </li>
              ))}
              <li className="nav-item w-100 w-lg-auto">
                <form className="d-flex" role="search" onSubmit={handleSubmit}>
                  <label htmlFor="site-search" className="visually-hidden">
                    Rechercher un artisan par nom
                  </label>
                  <div className="input-group">
                    <span className="input-group-text" id="search-addon">
                      <Search aria-hidden="true" />
                    </span>
                    <input
                      id="site-search"
                      type="search"
                      className="form-control"
                      placeholder="Rechercher un artisan"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      aria-describedby="search-addon"
                    />
                    <button type="submit" className="btn btn-primary">
                      Rechercher
                    </button>
                  </div>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
