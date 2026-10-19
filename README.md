# Carnets & Horizons — proposition de maquette

Maquette de présentation de la fusion éditoriale **AmericaTravel** et **EuropaTravel**, réalisée pour illustrer une direction artistique et le parcours utilisateur d'un futur site de **Travel Planner**.

## Voir la maquette

Une fois GitHub Pages configuré, l'URL prévue est :

https://julien59470.github.io/travel-maquette/

> Cette URL ne devient publique qu'après activation effective de GitHub Pages dans Settings → Pages.

## Contenu de la démonstration

- Accueil immersif, design responsive sur ordinateur, tablette et mobile ;
- Deux univers explicites : **Amérique du Nord** et **Europe** ;
- Présentation du Travel Planner, différente d'une agence de voyages ;
- Méthode de travail, prestations reprises et simplifiées d'après les sites existants ;
- Tarifs indicatifs à confirmer par le propriétaire ;
- Sélection interactive des prestations selon la destination ;
- Formulaire de contact *strictement fictif*, ne transmet ni ne stocke aucune donnée ;
- Navigation mobile, animations respectant la réduction de mouvement, liens accessibles ;
- Balise noindex,nofollow pour ne pas concurrencer les sites existants pendant la démonstration.

## Publication GitHub Pages via GitHub Actions

Le déploiement est défini dans `.github/workflows/deploy-pages.yml`, sans outil de build ni dépendance.

1. Dans **Settings → Pages → Build and deployment → Source**, sélectionner **GitHub Actions** (et non `Deploy from a branch`). La sélection de cette source dans les paramètres est indispensable et ne peut pas être modifiée par le workflow avec son jeton GitHub standard.
2. Dès que la source est configurée, le workflow **Deploy Travel Maquette to GitHub Pages** s'exécute automatiquement après chaque push sur `main`, ou manuellement via **Actions → Deploy Travel Maquette to GitHub Pages → Run workflow**.
3. Vérifier le statut du déploiement dans **Actions**.
4. Ouvrir https://julien59470.github.io/travel-maquette/ lorsque le workflow est vert.

Le workflow valide les fichiers essentiels, prépare un dossier `_site` limité aux fichiers publics et déploie ce dossier avec `actions/configure-pages`, `actions/upload-pages-artifact` et `actions/deploy-pages`. Le `GITHUB_TOKEN` reçoit les permissions minimales de déploiement `pages: write` et `id-token: write` ainsi que `contents: read`.

**Dépannage :** si le job `Configure GitHub Pages` échoue avec une erreur indiquant que Pages n'est pas activé, vérifier que la source est bien **GitHub Actions** dans **Settings → Pages**. Si le job de déploiement est bloqué, consulter les règles de protection de l'environnement `github-pages`. Il n'est pas nécessaire de créer une branche `gh-pages`.

## Limites de la proposition

- **Carnets & Horizons** est un nom de travail non validé juridiquement, commercialement ou en disponibilité.
- Les photographies de démonstration sont fournies par le service distant Unsplash : une version client finalisée devra définir les droits, les crédits et, idéalement, héberger les visuels approuvés.
- Formulaire de démonstration uniquement : pas de collecte de prospects tant qu'une solution sécurisée et conforme n'a pas été configurée.
- Les tarifs repris des sites existants ne constituent pas une offre commerciale nouvelle.
- Ce dépôt présente une page d'accueil interactive : il **ne constitue pas** la refonte contractuelle des six pages ni une migration SEO effective.
- Les sites et domaines existants n'ont pas été modifiés.
- Avant mise en production : confirmer toutes les offres, ajouter les pages légales fournies et validées, choisir domaine principal, préparer redirections page par page, raccorder formulaire et Search Console, retirer noindex uniquement après contrôles.

## Structure

- index.html : page de présentation ;
- styles.css : design et adaptations d'écran ;
- script.js : menu, filtres de prestations, animations et formulaire de démonstration ;
- assets/favicon.svg : favicon vectoriel ;
- .nojekyll : publication statique sans Jekyll.

Aucune dépendance JavaScript et aucune étape de compilation.
