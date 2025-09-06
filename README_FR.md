# Whitelister
Bot Discord.js 14 conçu pour gérer la whitelist d’un serveur à l’aide d’un formulaire.

J’utilisais auparavant un site comme Gather.sh pour gérer la whitelist des joueurs sur mon serveur Discord. C’était très pratique, car nous sommes un serveur de roleplay strict sur Fivem et nous aimons valider les nouveaux joueurs dans la communauté avec un petit résumé de leur expérience sur d’autres serveurs.  

J’ai réalisé qu’utiliser un site web pour quelque chose qui peut être fait directement dans Discord serait beaucoup mieux et réduirait l’utilisation de logiciels tiers qui sont souvent payants.  

Ce bot peut être lancé depuis votre propre PC, ou depuis un VPS/Dédié Windows/Linux. (En général, les personnes qui ont des serveurs FiveM ont déjà une machine hébergée quelque part. Je recommande un dédié OVH Game-1 ou 2, puisqu’il inclut une excellente mitigation (anti-ddos)).  

Voici un guide pour installer ce bot :  

1. Téléchargez le bot depuis ce dépôt.  
2. Allez sur [https://discord.com/developers/applications](https://discord.com/developers/applications) et configurez votre bot.  
3. Dans votre application, allez dans **Installation**, décochez `User Install`. Dans **Default Install Settings**, les scopes sont `application.commands` et `bot` (Récupérez le lien d’installation et collez-le dans votre Discord). <img width="1398" height="810" alt="image" src="https://github.com/user-attachments/assets/2c09b989-db41-487d-a7cc-86df649eae0f" />  
4. Dans **OAuth2**, ajoutez ce redirect : `http://localhost:8080/callback` et sauvegardez. <img width="1424" height="233" alt="image" src="https://github.com/user-attachments/assets/f4290ef8-f3ed-475b-9382-eb8b6cbf9964" />  
5. Dans **Bot**, configurez comme ceci : <img width="1407" height="709" alt="image" src="https://github.com/user-attachments/assets/a0ef9767-6368-4be6-b6e7-65d512f76091" />  
6. Ensuite, éditez le fichier `.env` avec toutes les clés et ID nécessaires.  
7. Modifiez le fichier `config.json`.  
⚠️ **NE COPIEZ-COLLEZ PAS CE QUI SUIT, ÉDITEZ DIRECTEMENT LE FICHIER** ⚠️  

```
{
"appID": "", -- Ceci provient de la page développeur Discord
"clientId": "", -- Ceci provient de la page développeur Discord
"channelGreet": "", -- Le salon où vous souhaitez accueillir les nouveaux membres. Désactivez le système par défaut de Discord dans les paramètres de votre guilde.
"colorEmbed": "#228B22",
"whitelisted": "", -- L’ID du rôle whitelist quand ils passent.
"newuser": "", -- L’ID du rôle par défaut attribué aux nouveaux arrivants.
}
```

8. Ouvrez `/Events/interactions/interactionCreate.js` et personnalisez ce que vous voulez.  
9. Ouvrez `/SlashCommands/Douanes/setupFormulaire.js`. C’est ici que votre bouton de formulaire et les instructions seront envoyés. Utilisez la commande `/setupformulaire` dans le salon voulu.  
10. Puis, ouvrez chaque fichier de haut en bas et ajustez selon vos besoins. Tout est déjà commenté. Il y a quelques lignes où vous devez indiquer les rôles et ID de salons.  

Je travaille sur une nouvelle version de ce bot pour le rendre moins personnalisé. Je n’avais jamais prévu de partager ce bot avec qui que ce soit, c’est pourquoi plusieurs fichiers nécessitent d’être édités. La prochaine version inclura tout dans le fichier de configuration.  

### Captures d’écran
(Désolé, notre communauté est francophone, donc tout est en français)

Avant de cliquer pour ouvrir le formulaire : <img width="824" height="774" alt="image" src="https://github.com/user-attachments/assets/8795f3fd-8c2c-4047-a6e6-71c49955956f" />  

Quand le formulaire s’ouvre (modal Discord) : <img width="888" height="994" alt="image" src="https://github.com/user-attachments/assets/4c37fd50-2827-43fa-a97c-64146dece6c5" />  

Quand un utilisateur envoie un formulaire, il reçoit cette confirmation (entièrement modifiable) : <img width="569" height="203" alt="image" src="https://github.com/user-attachments/assets/915e6551-88a6-4568-af02-2f6f9e7f36f5" />  

Le formulaire reçu dans le salon staff-only : <img width="662" height="538" alt="image" src="https://github.com/user-attachments/assets/bc683eb5-ade5-4031-b45b-59a44830cc93" />  

Quand il est rejeté ou approuvé, le formulaire est édité avec ces informations en bas : <img width="622" height="600" alt="image" src="https://github.com/user-attachments/assets/ef9deb43-6447-43bc-acdc-678e5496d911" />  

Le modal que vous voyez quand vous rejetez une candidature : <img width="928" height="682" alt="image" src="https://github.com/user-attachments/assets/b91876a2-6f03-47e6-8b0b-821bcc4fe5a4" />  

Ce que l’utilisateur reçoit quand son formulaire est rejeté (avec la raison) : <img width="526" height="258" alt="image" src="https://github.com/user-attachments/assets/b871bead-1886-4e85-a63e-4be795f8797f" />  

Ce que l’utilisateur reçoit quand son formulaire est rejeté (modifiable) : <img width="492" height="182" alt="image" src="https://github.com/user-attachments/assets/072ebb60-83ca-42e9-8c0f-12b87ec8e96f" />  

Ce que l’utilisateur reçoit quand il est convoqué en vocal : <img width="976" height="137" alt="image" src="https://github.com/user-attachments/assets/18732dbb-e1ef-4c6f-9c1f-251ca8b2ca0c" />  

---

## Si vous avez besoin d’aide pour l’installation de ce bot, n’hésitez pas à me contacter. Mes infos sont sur ma page de profil Github.
