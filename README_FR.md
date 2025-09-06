# Gatekeeper
Bot Discord.js 14 conçu pour gérer le whitelisting sur un serveur via un formulaire.

J'utilisais un site comme Gather.sh pour gérer le whitelisting des joueurs sur mon serveur Discord. C'était très pratique, car nous sommes un serveur roleplay strict sur FiveM et nous aimons valider les joueurs entrant dans la communauté avec un petit résumé de leur expérience sur d'autres serveurs. Ensuite, Gather.sh a cessé d'être supporté, devenait très lent et parfois simplement inutilisable… J'ai réalisé que l'utilisation d'un site web, pour quelque chose qui pouvait être fait directement sur Discord, serait beaucoup mieux et réduirait l'utilisation de logiciels tiers souvent payants.

Ce bot peut être lancé depuis votre propre PC, ou depuis un VPS Windows/Linux ou un serveur dédié. (Les personnes ayant des serveurs FiveM ont généralement un serveur hébergé quelque part. Je recommande un serveur dédié OVH Game-1 ou 2, car il est livré avec une mitigation anti-DDoS très efficace.)

Voici un guide pour installer ce bot.

Assurez-vous d'abord d'avoir installé ceci sur votre PC ou serveur!

## Prérequis

1. **Node.js** installé (v18+ recommandé) : [https://nodejs.org/](https://nodejs.org/)
2. **Git** (optionnel si vous clonez depuis GitHub) : [https://git-scm.com/](https://git-scm.com/)
3. **VSCode** (pour éditer et exécuter le bot) : [https://code.visualstudio.com/](https://code.visualstudio.com/)
4. Un compte Discord avec accès administrateur à votre serveur.
5. Si je peux suggérer, créez un deuxième compte Windows et exécutez votre bot depuis celui-ci. Ainsi, VSCode restera facile à utiliser.
> Cela implique que vous devrez démarrer votre bot chaque fois que l'instance Windows redémarre.

## Installation
1. Téléchargez le bot depuis ici.
2. Make sure you use discord.js 14
```
    npm install discord.js@14
```
3. Rendez-vous sur [https://discord.com/developers/applications](https://discord.com/developers/applications) et configurez votre bot.
4. Dans votre application, allez dans **Installation**, décochez `User Install`. Dans **Paramètres d'installation par défaut**, les scopes sont `application.commands` et `bot` (Récupérez le lien d'installation et collez-le dans votre Discord) <img width="1398" height="810" alt="image" src="https://github.com/user-attachments/assets/2c09b989-db41-487d-a7cc-86df649eae0f" />
5. Dans **OAuth2**, ajoutez cette redirection : `http://localhost:8080/callback` et sauvegardez <img width="1424" height="233" alt="image" src="https://github.com/user-attachments/assets/f4290ef8-f3ed-475b-9382-eb8b6cbf9964" />
6. Dans **Bot**, configurez-le ainsi <img width="1407" height="709" alt="image" src="https://github.com/user-attachments/assets/a0ef9767-6368-4be6-b6e7-65d512f76091" />
7. Ensuite, éditez le fichier `.env.example` avec toutes les clés et IDs requis, puis renommez-le en : `.env`
8. Éditez le fichier `config.json`.

Captures d’écran :  

Cette capture montre ce que le joueur voit avant de cliquer pour ouvrir le formulaire. <img width="824" height="774" alt="image" src="https://github.com/user-attachments/assets/8795f3fd-8c2c-4047-a6e6-71c49955956f" />

Lorsque le formulaire s'ouvre (modal Discord) <img width="888" height="994" alt="image" src="https://github.com/user-attachments/assets/4c37fd50-2827-43fa-a97c-64146dece6c5" />

Lorsqu’un utilisateur envoie un formulaire, il recevra cette confirmation. (Entièrement personnalisable par vous) <img width="569" height="203" alt="image" src="https://github.com/user-attachments/assets/915e6551-88a6-4568-af02-2f6f9e7f36f5" />

Voici le formulaire avec les boutons que vous recevrez dans votre canal réservé au staff : <img width="662" height="538" alt="image" src="https://github.com/user-attachments/assets/bc683eb5-ade5-4031-b45b-59a44830cc93" />

Lorsqu’il est rejeté ou approuvé, vous voyez le formulaire modifié avec ces informations en bas : <img width="622" height="600" alt="image" src="https://github.com/user-attachments/assets/ef9deb43-6447-43bc-acdc-678e5496d911" />

Voici le modal que vous voyez lorsque vous rejetez une candidature : <img width="928" height="682" alt="image" src="https://github.com/user-attachments/assets/b91876a2-6f03-47e6-8b0b-821bcc4fe5a4" />

Voici ce que l’utilisateur reçoit lorsque son formulaire a été rejeté (avec la raison) : <img width="526" height="258" alt="image" src="https://github.com/user-attachments/assets/b871bead-1886-4e85-a63e-4be795f8797f" />

Voici ce que l’utilisateur reçoit lorsque son formulaire est rejeté (modifiable) : <img width="492" height="182" alt="image" src="https://github.com/user-attachments/assets/072ebb60-83ca-42e9-8c0f-12b87ec8e96f" />

Voici ce que l’utilisateur reçoit lorsqu’on lui demande un rendez-vous vocal : <img width="976" height="137" alt="image" src="https://github.com/user-attachments/assets/18732dbb-e1ef-4c6f-9c1f-251ca8b2ca0c" />

## Si vous avez besoin d’aide pour la configuration de ce bot, n’hésitez pas à me contacter. Mes informations se trouvent sur ma page profil GitHub.
