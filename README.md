# Whitelister
Discord.js 14 bot made to handle whitelisting to a server with a form.

I was using a website like Gather.sh to handle whitelisting of players on my discord server. It was really useful, because we are a strict roleplay server on Fivem and we like to validate players coming in the community with a small resumé of their experience on other servers. Then Gather.sh stopped being supported, was getting ultra laggy and sometimes just broken.. I figured that using a website, for something that could be done directly in discord would be so much better and would reduce the usage of 3rd party software that is often not free. 

This bot, can be started from your own pc, or from a windows/linux VPS or Dedi. (Usually people with FiveM servers will have a server hosted somewhere, i suggest a OVH Game-1 or 2 Dedi as it comes with a Mitigation that is pretty amazing (anti-ddos))

Here is a guide to install this bot. 

Make sure you have this installed on your pc or server first. 

## Prerequisites

1. **Node.js** installed (v18+ recommended): [https://nodejs.org/](https://nodejs.org/)
2. **Git** (optional if cloning from GitHub): [https://git-scm.com/](https://git-scm.com/)
3. **VSCode** (to edit and run the bot): [https://code.visualstudio.com/](https://code.visualstudio.com/)
4. A Discord account with admin access to your server.
5. If i may suggest, setup a second windows account and run your bot there. This way your VSCode will not become annoying to use. 
> This will make it that you need to start your bot everytime the windows instance reboots.

## Installation
1. Download the bot from here.
2. Make sure you use discord.js 14
```
    npm install discord.js@14
```
3. Go on [https://discord.com/developers/applications](https://discord.com/developers/applications) and setup your bot there.
4. In your application, go to **Installation**, uncheck `User Install`. In **Default Install Settings**, scopes are `application.commands` and `bot` (Grab the Install Link and paste it in your discord) <img width="1398" height="810" alt="image" src="https://github.com/user-attachments/assets/2c09b989-db41-487d-a7cc-86df649eae0f" />
5. In **OAuth2** add this redirect: `http://localhost:8080/callback` and save <img width="1424" height="233" alt="image" src="https://github.com/user-attachments/assets/f4290ef8-f3ed-475b-9382-eb8b6cbf9964" />
6. In **Bot** make is like this <img width="1407" height="709" alt="image" src="https://github.com/user-attachments/assets/a0ef9767-6368-4be6-b6e7-65d512f76091" />
7. Then edit the .env.example file with all the keys and ids required, then rename it to: .env
8. Edit the config.json file. 

Screenshots: 
(Sorry, our community is french, so everything is french)

This screenshot is what the player see before clicking to open the form. <img width="824" height="774" alt="image" src="https://github.com/user-attachments/assets/8795f3fd-8c2c-4047-a6e6-71c49955956f" />

When the form opens (Discord modal) <img width="888" height="994" alt="image" src="https://github.com/user-attachments/assets/4c37fd50-2827-43fa-a97c-64146dece6c5" />

When a user sends a form, he will receive this confirmation. (Completely editable by you) <img width="569" height="203" alt="image" src="https://github.com/user-attachments/assets/915e6551-88a6-4568-af02-2f6f9e7f36f5" />

This is the form with the buttons you will receive in your staff only channel: <img width="662" height="538" alt="image" src="https://github.com/user-attachments/assets/bc683eb5-ade5-4031-b45b-59a44830cc93" />

When its rejected or approved, you see the form edited with this information at the bottom: <img width="622" height="600" alt="image" src="https://github.com/user-attachments/assets/ef9deb43-6447-43bc-acdc-678e5496d911" />

This is the modal you see when you reject a application: <img width="928" height="682" alt="image" src="https://github.com/user-attachments/assets/b91876a2-6f03-47e6-8b0b-821bcc4fe5a4" />

This is what the user receives when his form has been rejected (With the reason): <img width="526" height="258" alt="image" src="https://github.com/user-attachments/assets/b871bead-1886-4e85-a63e-4be795f8797f" />

This is what the user receives when his form is rejected (Editable): <img width="492" height="182" alt="image" src="https://github.com/user-attachments/assets/072ebb60-83ca-42e9-8c0f-12b87ec8e96f" />

This is what the user receives when they are requested for a vocal meeting: <img width="976" height="137" alt="image" src="https://github.com/user-attachments/assets/18732dbb-e1ef-4c6f-9c1f-251ca8b2ca0c" />

## If you require help with the setup of this bot, feel free to poke me. My information is on my Github Profile page. 
