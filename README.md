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

Ressources partagées : `pages.css`, `pages.js`, `home.css`, `home.js`, `assets/euramerica-route.svg`.

La page d'accueil ne comporte plus de préchargement vidéo imposé. Les animations sont légères et respectent `prefers-reduced-motion`.

## GitHub Pages

Déploiement automatique via **GitHub Actions**, sur chaque commit `main`, avec validation préalable des huit pages, des liens internes, des images et de la syntaxe JavaScript. Aucun build ni dépendance npm.

Configuration du dépôt : **Settings → Pages → Build and deployment → GitHub Actions**.

## Périmètre et précautions

- La marque **EurAmerica Travel** est une proposition du client. Sa disponibilité juridique n'est pas établie.
- Le domaine illustré dans l'image du client est `euramericatravel.fr` (un seul « l » final), tandis que son message mentionnait `euramericatravell.fr` (deux « l »). **L'orthographe et la disponibilité sont à valider avant achat.** Le dépôt GitHub Pages ne configure pas de domaine personnalisé.
- Toutes les pages contiennent `noindex,nofollow` pour éviter une indexation accidentelle de la maquette. Ne pas supprimer sans validation du projet et du plan SEO.
- Les photos proviennent d'URL externes Unsplash et servent uniquement à illustrer une direction artistique. Vérifier les droits des médias et héberger les éléments approuvés pour une version commerciale.
- Le formulaire ne stocke ni n'envoie de données : il ouvre un brouillon dans la messagerie de l'utilisateur et laisse celui-ci décider de l'envoi.
- Aucune modification de `americatravel.fr` ou `europatravel.fr`, aucune redirection 301 et aucun changement de DNS à ce stade.
- Avant une mise en ligne définitive : audit des deux anciens sites, plan de migration URL par URL, choix et achat du domaine, contenus et prix validés, mentions légales, formulaires connectés, Search Console et tests de performances.

Ce dépôt est une **maquette de présentation**, pas une migration SEO réalisée ni le site contractuel définitif.
