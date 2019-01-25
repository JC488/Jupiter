# Jupiter
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/83452b5eca7b42b28674fb2766c378c2)](https://www.codacy.com/app/Sworder71/Jupiter?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Sworder71/Jupiter&amp;utm_campaign=Badge_Grade)
[![Discord](https://img.shields.io/discord/485420015118712852.svg?logo=discord)](https://discord.gg/eduBrt5)
[![Jupiter](https://img.shields.io/badge/Jupiter-1.5.0--dev-greenBright.svg)](https://github.com/Sworder71/Jupiter)
[![NodeJS](https://img.shields.io/badge/node.js-8.12.0-greenBright.svg)](https://nodejs.org/)
[![DiscordJS](https://img.shields.io/badge/discord.js-11.3.2-greenBright.svg)](https://discord.js.org/#/)

___________

## Version française:

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
pm2 start shards.js --name "Jupiter" && pm2 logs Jupiter
```
___________

## English version:

> A simple bot music:
>- Simple commands: **leave**, **lyrics**, **moveto**, **nowplaying**, **pause**, **play**, **queue**, **repeat**, **resume**, **shuffle**, **skip**, **stop**, **volume**

### Installation

 - Download the bot:

```
npm i github:Sworder71/Jupiter
```

 - Packages Installation:
 
> **NOTE**: Please, check if your packages have the same versions of the git.

```
npm i --global
```

### Configuration

To config the bot, edit the file `config.js` and fill with this elements:

>- **PREFIX** - The bot prefix.
>- **OWNER_ID** - The owner ID of the bot.
>- **BOT_ID** - The bot ID.
>- **BOT_TOKEN** - The bot token.
>- **DDBL** - Your API token of [Divine Discord Bot List](https://divinediscordbots.com).
>- **BFD** - Your API token of [Bots For Discord](https://botsfordiscord.com).
>- **key** - Your API Key of YouTube, go here to get one: [Google API](https://console.cloud.google.com/apis/dashboard).

### Start
- With node

```
node shards.js
```

- With pm2

```
pm2 start shards.js --name "Jupiter" && pm2 logs Jupiter
```
___________

## Widgets:

[![Bots for Discord](https://botsfordiscord.com/api/bot/531502637888045057/widget)](https://botsfordiscord.com/bots/531502637888045057)

[![Divine Discord Bots](https://divinediscordbots.com/api/widget/531502637888045057.svg)](https://divinediscordbots.com/bots/531502637888045057)

[![Discord Bots](https://discordbots.org/api/widget/531502637888045057.svg)](https://discordbots.org/bot/531502637888045057)
