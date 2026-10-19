# Carnets & Horizons — maquette cinématique

Maquette conceptuelle réunissant **AmericaTravel** (Amérique du Nord) et **EuropaTravel** (Europe), avec une identité ombrelle provisoire et une expérience de navigation inspirée d'un portail cinématique.

**Démo** : https://julien59470.github.io/travel-maquette/

## Stack, diffusion et coût

- **Un seul fichier `index.html` autonome**, contenant le HTML, les styles CSS et le JavaScript natif.
- Aucun framework, compilation, serveur, API ou abonnement requis.
- Déploiement automatique via **GitHub Actions → GitHub Pages** à chaque push sur `main`.
- Le workflow valide le HTML, extrait le JavaScript intégré et exécute `node --check` avant publication.
- Les images et la vidéo de démonstration sont chargées depuis des services externes ; leur chargement dépend du réseau.

## Expérience interactive

- Introduction visuelle d'environ trois secondes, vidéo, compteur 0-100 % et logo qui rejoint l'en-tête ; bouton pour passer l'introduction.
- Navigation principale et panneau informatif au clavier (Escape / Tab).
- Deux univers : **Amérique du Nord** et **Europe**, destinations sélectionnables depuis la barre latérale.
- Portail central animé en Canvas : masque arrondi, profondeur simulée et inclinaison douce à la souris.
- Clic sur le portail : agrandissement plein écran et transition vers l'autre destination.
- Typographie monumentale, fiche descriptive et appels à l'action contextualisés.
- Panneaux d'explication : concept Travel Planner, prestations, questions, demande de projet.
- Préparation d'un e-mail depuis le formulaire ; **aucune donnée envoyée automatiquement ni conservée côté serveur**.
- Respect des préférences `prefers-reduced-motion`, prise en charge des mobiles et boutons accessibles.

## Références métier

- AmericaTravel : https://americatravel.fr/
- EuropaTravel : https://europatravel.fr/
- Maurice conçoit des itinéraires et des carnets de voyage ; le voyageur réserve auprès des prestataires.
- Les e-mails de contact de démonstration sont ceux publiés sur les sites actuels et restent à valider avant publication définitive.

## Préproduction

- « Carnets & Horizons » n'est qu'une **proposition de nom** ; vérifier marque et domaine avant adoption.
- La maquette est **volontairement non indexable** (`noindex,nofollow`) pour éviter la concurrence avec les sites actuels.
- Les vidéos et photos de démonstration viennent d'URL externes. Sécuriser les licences, autorisations, l'hébergement et les performances avant mise en production.
- La vidéo de chargement dispose d'un visuel et d'une minuterie de repli si elle ne se charge pas.
- Ceci représente une **maquette d'accueil** ; ce n'est pas encore la réalisation du site complet, des pages légales ou d'une migration SEO.
- Les devis, formulaires connectés, redirections 301, Search Console et pages définitives relèvent d'une phase de réalisation.

## Publier

Dans le dépôt GitHub : **Settings → Pages → Source : GitHub Actions**. Ensuite, chaque push sur `main` déploie le fichier `index.html` et `.nojekyll` par le workflow `.github/workflows/deploy-pages.yml`.
