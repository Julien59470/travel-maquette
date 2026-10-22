# EurAmerica Travel — maquette multi-pages

Maquette de proposition pour la réunion de **AmericaTravel** (Amérique du Nord) et **EuropaTravel** (Europe), au sein d'une nouvelle marque commune **EurAmerica Travel**.

## Démonstration

https://julien59470.github.io/travel-maquette/

Le design applique les indications reçues : **site nettement plus clair**, fond ivoire, logo bleu profond et ocre, visuels lumineux, rouge/bleu/blanc et terres chaudes en Amérique, maisons colorées du Nord de l'Europe, tons pierre et ardoise au centre, blanc et terracotta en Méditerranée.

Le symbole vectoriel `assets/euramerica-route.svg` constitue une interprétation provisoire de la trajectoire dessinée dans la référence graphique du client ; il ne s'agit pas d'un logo final validé.

## Organisation

Huit pages HTML autonomes, reliées par de vraies URL (aucune modale) :

| Fichier | Rôle |
| --- | --- |
| `index.html` | Accueil lumineux, doubles univers visuels, inspirations régionales et demande de voyage |
| `amerique.html` | AmericaTravel, road trips, grandes étendues et ambiance pastel Miami |
| `europe.html` | EuropaTravel, Nord coloré, Centre pierre/ardoise et Sud méditerranéen |
| `concept.html` | Métier de Travel Planner et transparence sur les prestations |
| `methode.html` | Échange, préparation et carnet d'itinéraire |
| `prestations.html` | Prestations indicatives et sélecteur par destination |
| `faq.html` | Questions/réponses accessibles sans fenêtres superposées |
| `contact.html` | Préparation d'une demande par e-mail avec saisie locale |

Ressources partagées : `pages.css`, `pages.js`, `home.css`, `home.js`, **`modern.css`, `modern-home.css`, `modern.js`**, `assets/euramerica-route.svg`, `photos.json` et `scripts/prepare_photos.py`.

La page d'accueil ne comporte plus de préchargement vidéo imposé. Les nouvelles typographies sont **Space Grotesk** (titres) et **Plus Jakarta Sans** (corps et interface), chargées via Google Fonts en `display=swap`. Les effets d'entrée, mouvements au survol, indicateur de progression et compositions photographiques ne masquent aucun contenu avec JavaScript désactivé et respectent `prefers-reduced-motion`.

Les améliorations de conversion incluent un premier CTA visible dès l'accueil, des arguments de réassurance réels (conseil humain, itinéraire personnel, réservation indépendante), un bouton contextuel sur mobile et la présélection Amérique/Europe sur la page contact via `?destination=amerique` ou `?destination=europe`. Le contact prépare un e-mail, sans collecte serveur.

## GitHub Pages

Déploiement automatique via **GitHub Actions**, sur chaque commit `main`, avec validation préalable des huit pages, des liens internes, des images et de la syntaxe JavaScript. Le site publié n'utilise aucune dépendance npm ; le workflow prépare les photos et valide les fichiers. Pour les tests en CI uniquement, il installe temporairement `playwright-core`, utilise Chrome et vérifie les 8 pages aux formats 375, 768 et 1440 px : titres, CTA, absence de débordement horizontal et erreurs JavaScript. Les captures d'écran sont disponibles en artefact GitHub Actions pendant 7 jours.

Configuration du dépôt : **Settings → Pages → Build and deployment → GitHub Actions**.

## Périmètre et précautions

- La marque **EurAmerica Travel** est une proposition du client. Sa disponibilité juridique n'est pas établie.
- Le domaine illustré dans l'image du client est `euramericatravel.fr` (un seul « l » final), tandis que son message mentionnait `euramericatravell.fr` (deux « l »). **L'orthographe et la disponibilité sont à valider avant achat.** Le dépôt GitHub Pages ne configure pas de domaine personnalisé.
- Toutes les pages contiennent `noindex,nofollow` pour éviter une indexation accidentelle de la maquette. Le SEO est pris en compte au niveau des titres, descriptions, H1, HTML sémantique, liens internes et mobile-first, mais cette démo n'est **pas destinée à être référencée**. Ne pas retirer cette protection avant validation de la migration et de la production.
- Les **21 photographies** sélectionnées sur Unsplash sont documentées dans `photos.json` (auteur, lieu, page source). Leur licence est indiquée sur la page originale. Vérifier la compatibilité juridique et les éventuelles restrictions applicables avant le lancement commercial.
- Les pages HTML chargent exclusivement des **images WebP optimisées et servies localement par GitHub Pages** (`assets/photos/`) ; il n'y a pas de chargement d'image directement depuis Unsplash côté visiteur. Les fichiers WebP sont téléchargés lors du build dans `scripts/prepare_photos.py`, puis intégrés à l'artefact GitHub Pages. Cela évite d'alourdir le dépôt Git avec les fichiers binaires.
- Pour changer une photographie, remplacer son identifiant, sa source et son crédit dans `photos.json`, puis référencer sa clé `assets/photos/<nom>.webp` dans le HTML. Le workflow valide toutes les clés et tous les liens et arrête le déploiement si une image manque.
- Le formulaire ne stocke ni n'envoie de données : il ouvre un brouillon dans la messagerie de l'utilisateur et laisse celui-ci décider de l'envoi.
- Aucune modification de `americatravel.fr` ou `europatravel.fr`, aucune redirection 301 et aucun changement de DNS à ce stade.
- Avant une mise en ligne définitive : audit des deux anciens sites, plan de migration URL par URL, choix et achat du domaine, contenus et prix validés, mentions légales, formulaire de contact connecté, Search Console, mesure réelle des Core Web Vitals (LCP, CLS, INP), et validation de la conversion sur appareils réels.

Ce dépôt est une **maquette de présentation**, pas une migration SEO réalisée ni le site contractuel définitif.
