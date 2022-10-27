# Progressive-Web-App

Présenter une PWA mettant en avant les concepts abordés lors du module :

- Mise en place d’un manifest et utilisation des service workers
- Implémentation du WebPush et utilisation cohérente dans le cadre de l’application
- Gestion du clic sur la notification pour redirection dans une page spécifique de l’application
- Mise en place d’un espace sécurisé nécessitant une authentification
- Gestion des cas ou l’utilisateur refuse d’accorder une permission (Geolocation,WebPush, Accès caméra)
- Utilisation d’une fonctionnalité offerte par le navigateur (Geolocation, Accès caméra ou autre)
- Mise en place d”un pipe d’auto déploiement de la solution lorsque le repository est modifié
- Fournir un accès au repository contenant le code source

# Utilisation de l'app en développement

Installer http-server via cette commande :
- npm i http-server -D
Si vous avez déjà build l'app passez cette etapes, sinon :
- npm run build
Ensuite pour lancer l'app via cette commande :
"start-sw": "http-server ./build" (Présente dans le script package.json)

- npm run start-sw