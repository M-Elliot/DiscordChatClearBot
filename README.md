# DiscordChatClearBot
## A Minimalistic TextChannel Clearer For Discord

A Basic Discord bot designed to delete all messages in a TextChannel ever houry

## Requirements

* [Node.js](https://nodejs.org/en/)

* [npm 6.2.0+](https://www.npmjs.com/)

* [discord.js](https://discord.js.org/#/)

## How To Use
1. Change AuthorisedRoles `= ['AdminRole', 'ModeratorRole'];` to your server roles authorised to use the bot
2. Insert your DiscordBot token `Client.login('token');`
3. Build and place in your desired folder
4. Navigate to the folder in your console or command prompt
5. Install the required packages inside `package.json` with `npm install`
6. Start you app with `node server.js` or `pm2` / `forever` to run 24/7

## Chat Commands
1. `!StartWipe` - Wipes and begins the 'on the hour' chat wipes.
2. `!StopWipe` - Stops chat wipes.
3. `!UpTime` - Shows the total time chat wipes have been running (DDHHmm)
