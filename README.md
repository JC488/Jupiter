# Jupiter
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/83452b5eca7b42b28674fb2766c378c2)](https://www.codacy.com/app/Sworder71/Jupiter?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Sworder71/Jupiter&amp;utm_campaign=Badge_Grade)
[![Jupiter](https://img.shields.io/badge/Jupiter-1.5.0--dev-greenBright.svg)](https://github.com/Sworder71/Jupiter)
[![NodeJS](https://img.shields.io/badge/nodejs-8.12.0-greenBright.svg)](https://nodejs.org/)
[![DiscordJS](https://img.shields.io/badge/discord.js-11.3.2-greenBright.svg)](https://discord.js.org/#/)


> Un simple bot musique:
>- Des commandes basiques: **leave**, **lyrics**, **moveto**, **nowplaying**, **pause**, **play**, **queue**, **repeat**, **resume**, **shuffle**, **skip**, **stop**, **volume**

### Installation
 - Télécharger le bot:

```
npm i github:Sworder71/Jupiter
```

 - Installer tout les packages:
 
 > **NOTE**: Vous devez bien vérifier après l'installation que vous avez exactement les mêmes version de package que sur le git.
```
npm i --global
```

- Configurer le bot:

Il faut se rendre sur le fichier `config.js` et remplir les différents éléments qui s'y trouve:
>- **PREFIX** - Le prefix de votre bot.
>- **OWNER_ID** - L'ID du propriétaire du bot (Donc le votre).
>- **BOT_ID** - L'ID de votre bot.
>- **BOT_TOKEN** - Le Token de votre bot.
>- **DDBL** - Votre token de l'API de [Divine Discord Bot List](https://divinediscordbots.com).
>- **BFD** - Votre token de l'API de [Bots For Discord](https://botsfordiscord.com).
>- **key** - Votre clé API YouTube. Vous pouvez avoir une clé API ici: [Google API](https://console.cloud.google.com/apis/dashboard).

### Démarrage
- Avec node

```
node shards.js
```

- Avec pm2

```
pm2 start shards.js --name="Jupiter" && pm2 logs Jupiter
```

### Images
<center>
  <a href="https://github.com/Sworder71/Jupiter">
    <img src="https://cdn.discordapp.com/attachments/532919394435727362/532919542490333195/unknown.png" alt="image1">
  </a>
  <br>
  <a href="https://github.com/Sworder71/Jupiter">
    <img src="https://cdn.discordapp.com/attachments/532919394435727362/532919746090237952/unknown.png" alt="image2">
  </a>
</center>
