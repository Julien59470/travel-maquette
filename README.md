# Carnets & Horizons — maquette React Travel Planner

Concept créatif de fusion **AmericaTravel + EuropaTravel**, dédié au métier de **Travel Planner (organisateur de voyages)**. La maquette met en scène une nouvelle identité éditoriale provisoire : « Carnets & Horizons ».

## Démo

**https://julien59470.github.io/travel-maquette/**

Source de publication : **GitHub Actions**, workflow [deploy-pages.yml](.github/workflows/deploy-pages.yml), déclenché à chaque push sur `main`. La source doit être **GitHub Actions** dans Settings → Pages.

## Stack

- React + TypeScript
- Vite avec `base: '/travel-maquette/'` et alias `@/ → src/`
- Tailwind CSS 3, configuration dédiée
- lucide-react, Google Fonts : Geist et Special Elite
- GitHub Actions → `npm run build` → `dist/` → Pages
- Aucune API, base de données, IA ni abonnement requis pour la maquette

## Démarrer localement

```bash
npm install
npm run dev
npm run build
npm run preview
```

Le workflow GitHub compile et vérifie la sortie Vite avant publication.

## Expérience

- Landing page plein écran, vidéo de fond selon le brief et **image de secours** si la vidéo distante est indisponible
- Halo blanc en haut et verre liquide sur la carte de demande
- Sélection Amérique du Nord ou Europe mettant à jour le texte d'exemple
- Texte libre éditable pour présenter son projet
- Sélection locale d'une image ou d'un PDF (**non envoyé / non stocké**)
- Panneaux interactifs « Notre approche », « Prestations » et « Questions fréquentes »
- Bouton « Imaginer mon voyage » ouvrant un récapitulatif et un brouillon d'e-mail envoyé **uniquement si le visiteur choisit de l'envoyer via sa propre messagerie**
- Tarifs et adresses de contact initialement repris des sites existants ; **à revalider avant production**
- Accessibilité : labels, focus clavier, fermeture Échap, préférences de réduction des animations, boutons réellement interactifs
- Responsivité mobile, tablette et ordinateur

## Précautions

- Maquette **non indexable** (`noindex,nofollow`) : ne pas la confondre avec un site publié officiellement.
- La vidéo référencée vient du domaine externe fourni dans le brief. Son accessibilité et ses droits d'utilisation ne sont pas garantis ; **une image de remplacement est prévue**. Vérifier les licences et remplacer les médias par des fichiers autorisés pour le site final.
- Identité « Carnets & Horizons » **provisoire**, à vérifier (marque, domaine, accord du client).
- Aucune réservation, paiement ou génération automatique d'itinéraire.
- Ce dépôt illustre **une page d'accueil interactive**, pas encore les six pages contractuelles, ni la migration SEO définitive.
- Pour le futur site : choix du domaine, redirections 301 URL par URL, pages légales, consentements, formulaire fiable, Search Console, analyse des contenus et hébergement des visuels sous contrôle.

## Arborescence

```text
index.html
vite.config.ts
tailwind.config.js
postcss.config.js
tsconfig.json
package.json
src/
  main.tsx
  App.tsx
  index.css
  components/Hero.tsx
public/
  favicon.svg
.github/workflows/
  deploy-pages.yml
```
