# Trouve ton artisan

Plateforme numérique de la région Auvergne-Rhône-Alpes permettant aux particuliers d'identifier et de contacter rapidement des artisans locaux.

## Sommaire
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
  - [1. Cloner le dépôt](#1-cloner-le-dépôt)
  - [2. Base de données MySQL](#2-base-de-données-mysql)
  - [3. API Node.js](#3-api-nodejs)
  - [4. Frontend React](#4-frontend-react)
- [Commandes utiles](#commandes-utiles)
- [Sécurité et conformité](#sécurité-et-conformité)
- [Accessibilité & UX](#accessibilité--ux)
- [Déploiement](#déploiement)
- [Documentation complémentaire](#documentation-complémentaire)

## Architecture
```
trouve-ton-artisan/
├── backend/          # API Express + Sequelize
├── frontend/         # Application React + Bootstrap + Sass
├── database/         # Scripts SQL (schema + seed)
└── docs/             # Dossier de présentation projet
```

L'API expose les ressources suivantes :
- `GET /api/categories` : navigation principale (Bâtiment, Services, Fabrication, Alimentation).
- `GET /api/artisans` : annuaire filtrable (recherche plein texte, catégorie, artisans du mois).
- `GET /api/artisans/:slug` : fiche détaillée d'un artisan.
- `POST /api/artisans/:slug/contact` : envoi d'un message à un artisan (validation côté serveur + email SMTP).

## Prérequis
- Node.js 20+
- npm 10+
- MySQL 8 (ou MariaDB 10.6+)
- Accès SMTP pour l'envoi des emails

## Installation

### 1. Cloner le dépôt
```bash
git clone https://github.com/<<organisation>>/trouve-ton-artisan.git
cd trouve-ton-artisan
```

### 2. Base de données MySQL
1. Créez la base et les tables :
   ```bash
   mysql -u root -p < database/schema.sql
   ```
2. Chargez le jeu de données initial :
   ```bash
   mysql -u root -p < database/seed.sql
   ```
3. Créez un utilisateur MySQL dédié (exemple) :
   ```sql
   CREATE USER 'artisan_app'@'%' IDENTIFIED BY 'motdepasse-a-modifier';
   GRANT ALL PRIVILEGES ON trouve_ton_artisan.* TO 'artisan_app'@'%';
   FLUSH PRIVILEGES;
   ```

### 3. API Node.js
```bash
cd backend
cp .env.example .env
npm install
```

Renseignez les variables suivantes dans `.env` :

| Variable | Description |
| --- | --- |
| `PORT` | Port d'écoute de l'API (4000 par défaut) |
| `CLIENT_URL` | Origine autorisée pour CORS (ex. http://localhost:5173) |
| `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` | Accès MySQL |
| `API_KEY` | Clé partagée avec l'application frontend (`X-API-KEY`) |
| `RATE_LIMIT_POINTS`, `RATE_LIMIT_DURATION` | Paramètres anti-DDoS (optionnel) |
| `MAIL_HOST`, `MAIL_PORT`, `MAIL_SECURE`, `MAIL_USER`, `MAIL_PASSWORD`, `MAIL_FROM` | Paramètres SMTP |

Démarrer le serveur :
```bash
npm run dev
```

### 4. Frontend React
```bash
cd ../frontend
cp .env.example .env
npm install
```

Configurez l'URL de l'API et la clé d'API dans `.env` :
```
VITE_API_URL=http://localhost:4000/api
VITE_API_KEY=change-me
```

Puis lancez le serveur de développement :
```bash
npm run dev
```

L'application est accessible sur `http://localhost:5173`.

## Commandes utiles
| Contexte | Commande | Description |
| --- | --- | --- |
| Backend | `npm run dev` | Démarre l'API avec Nodemon |
| Backend | `npm start` | Démarre l'API en production |
| Frontend | `npm run dev` | Dev server Vite |
| Frontend | `npm run build` | Génère les fichiers statiques |
| Frontend | `npm run preview` | Prévisualise le build |

## Sécurité et conformité
- Clé d'API obligatoire (`X-API-KEY`) pour toutes les routes `/api`.
- Rate limiting (100 requêtes / 15 min par IP) configurable via `.env`.
- Headers de sécurité renforcés (`helmet`) et CORS contrôlé (`CLIENT_URL`).
- Validation des entrées utilisateur (formulaire de contact) avec `express-validator`.
- Journalisation des requêtes (`morgan`) pour l'audit.
- Secrets stockés dans des fichiers `.env` ignorés par Git.
- Structure compatible RGPD : les formulaires ne stockent pas les messages, seul l'envoi d'email est réalisé.

## Accessibilité & UX
- Design **mobile-first** avec grille responsive Bootstrap.
- Couleurs contrastées respectant le ratio AA.
- Navigation clavier et lecteur d'écran : balises ARIA, composants réutilisables.
- Pages SEO-friendly : balises titre/description via `react-helmet-async`.
- Illustrations vectorielles légères et textes alternatifs descriptifs.

## Déploiement
1. Déployer la base MySQL (initialisation avec `schema.sql` + `seed.sql`).
2. Déployer l'API Node sur un hébergeur (PM2, Docker ou PaaS) avec variables d'environnement sécurisées.
3. Construire le frontend (`npm run build`) et servir les fichiers statiques (Vercel, Netlify, S3 + CloudFront, etc.).
4. Configurer un reverse proxy (Nginx/Traefik) pour injecter l'en-tête `X-API-KEY` côté serveur et éviter l'exposition publique de la clé.
5. Mettre en place un certificat HTTPS (Let's Encrypt) et la surveillance (logs, alertes SMTP).

## Documentation complémentaire
- [Dossier projet (PDF à générer)](docs/dossier-projet.md)
- Scripts SQL : [`database/schema.sql`](database/schema.sql), [`database/seed.sql`](database/seed.sql)
- Frontend : [`frontend/README.md`](frontend/README.md) *(optionnel – à créer si besoin)*
- Backend : configuration dans [`backend/.env.example`](backend/.env.example)

---
Pour toute question complémentaire, contactez la Direction du numérique de la région Auvergne-Rhône-Alpes.
