import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ArtisanDirectoryPage from './pages/ArtisanDirectoryPage.jsx';
import ArtisanDetailPage from './pages/ArtisanDetailPage.jsx';
import LegalPage from './pages/LegalPage.jsx';
import HowToPage from './pages/HowToPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { CategoriesProvider } from './context/CategoriesContext.jsx';

function App() {
  return (
    <CategoriesProvider>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/artisans" element={<ArtisanDirectoryPage />} />
            <Route path="/categorie/:slug" element={<ArtisanDirectoryPage />} />
            <Route path="/artisans/:slug" element={<ArtisanDetailPage />} />
            <Route path="/comment-trouver-mon-artisan" element={<HowToPage />} />
            <Route path="/mentions-legales" element={<LegalPage title="Mentions légales" />} />
            <Route path="/donnees-personnelles" element={<LegalPage title="Données personnelles" />} />
            <Route path="/accessibilite" element={<LegalPage title="Accessibilité" />} />
            <Route path="/cookies" element={<LegalPage title="Cookies" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CategoriesProvider>
  );
}

export default App;
