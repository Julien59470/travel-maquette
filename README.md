# Carnets & Horizons — maquette multipage

Maquette de fusion des sites [AmericaTravel](https://americatravel.fr/) et [EuropaTravel](https://europatravel.fr/). Concept de marque provisoire présentant l'activité de **Travel Planner indépendant**.

## Accéder au site

https://julien59470.github.io/travel-maquette/

## Pages réelles (aucune modale)

| Page | Fonction |
| --- | --- |
| [Accueil](index.html) | Expérience plein écran, portail Canvas entre Amérique et Europe |
| [Amérique](amerique.html) | Univers AmericaTravel et parcours commercial |
| [Europe](europe.html) | Univers EuropaTravel et parcours commercial |
| [Le concept](concept.html) | Métier, conseil et absence de vente de prestations touristiques |
| [La méthode](methode.html) | De la prise de contact au carnet et aux réservations |
| [Prestations](prestations.html) | Tarifs indicatifs des sites d'origine et sélecteur accessible |
| [Questions](faq.html) | Réponses accessibles sur une vraie page HTML |
| [Contact](contact.html) | Formulaire préparant un e-mail depuis la messagerie du visiteur |

La navigation, y compris celle de l'accueil sur mobile, utilise des liens réels vers des fichiers HTML. Les anciens panneaux modaux ont été supprimés.

## Architecture

- Fichier autonome `index.html` : interface cinématique, préchargement, animation Canvas et menu mobile natif.
- `amerique.html`, `europe.html`, `concept.html`, `methode.html`, `prestations.html`, `faq.html`, `contact.html` : pages éditoriales statiques.
- `pages.css` : identité graphique partagée, responsive, navigation, sections et formulaires.
- `pages.js` : menu mobile, animations à réduction de mouvement, sélecteur de prestations et préparation de l'e-mail.
- `.github/workflows/deploy-pages.yml` : vérification automatique des fichiers, des URL internes, des ancres et des scripts JS, puis publication GitHub Pages via Actions.

Aucun framework ni outil de compilation. Le workflow copie les huit fichiers HTML et leurs deux ressources communes dans l'artefact Pages. Publication à chaque push sur `main`.

## Important : limitations de la démonstration

- Nom **Carnets & Horizons** provisoire, ni validé par le client ni vérifié en disponibilité.
- Toutes les pages contiennent `noindex,nofollow` : ne pas publier comme site de production sans cadrage SEO préalable.
- Les photos et la vidéo de l'introduction sont hébergées sur des sites externes ; autorisations d'utilisation et performances à revoir.
- Le formulaire est une démonstration : il ne transmet ni ne stocke directement de données. Il ouvre seulement un brouillon dans la messagerie du visiteur, qui reste libre d'envoyer ou non.
- Les tarifs ont été repris à titre indicatif sur les sites existants en octobre 2026 ; conditions, prestations et textes commerciaux à confirmer.
- Pages légales définitives, hébergement réel, domaines et redirections 301 : à traiter séparément une fois le devis validé.

## Déploiement

Dans **Settings → Pages**, sélectionner **GitHub Actions**. Voir ensuite l'onglet **Actions** et le workflow « Deploy Travel Maquette to GitHub Pages ».
