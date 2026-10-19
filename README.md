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

## Publication GitHub Pages (sans build, sans abonnement)

1. Ouvrir **Settings → Pages** dans le dépôt GitHub.
2. Dans **Build and deployment**, choisir **Deploy from a branch**.
3. Sélectionner la branche **main**, dossier **/(root)**, puis **Save**.
4. Attendre la fin de la publication affichée dans l'onglet **Actions** puis ouvrir l'URL ci-dessus.

Tous les fichiers nécessaires sont à la racine ; .nojekyll évite les traitements Jekyll inutiles. Aucun déploiement externe, API payante ou base de données.

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
