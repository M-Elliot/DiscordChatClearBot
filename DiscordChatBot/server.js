'use strict';

//Limit our dependency usage and set our process timzezone before anything.
// As stated by sam-github, you SHOULD set TZ before executing the process
// to prevent issues with initialization. 
///env TZ='Europe/London' node server.js
process.env.TZ = 'Europe/London';

const Discord = require('discord.js');
const Client = new Discord.Client();

const LoadTime = Date.now();

var TempTime = new Date();

//set your admin roles names here
const AuthorisedRoles = ['AdminRole', 'ModeratorRole'];



Client.on('ready', () =>
{
    console.log('Discord ChatBot loaded at, ' + LoadTime.toString());
});


var LoopInterval;
Client.on('message', async message =>
{

    if (!message.member.roles.some(r =>  AuthorisedRoles.includes(r.name)))
    {
        return;
    }

    switch (message.content)
    {
        case '!StartWipe':
            console.log('Starting wipe : ' + Date.now());

            if (TempTime.getMinutes() === 0)
            {
                BeginLoop(message);
            } else {
                DeleteMessages(message);
                TempTime.setHours(TempTime.getHours() + 1);
                TempTime.setMinutes(0);
                TempTime.setSeconds(0);

                var delay = TempTime - new Date();
                var minutes = Math.floor(delay / 1000 /60);
            }

            message.channel.send(minutes + " Minutes until beginning hourly purge...");
            Client.setTimeout(InitLoop, delay, message);
            break;

        case '!StopWipe':
            message.channel.send("Wipe cancelled.");
            Client.clearInterval(LoopInterval);
            break;

        case '!UpTime':
            message.channel.send("Client has been online for: " + MsToTime(Client.uptime));
            break;

        //Bad as it logs all convos
        default:
            //console.log('Unknown command, ' + message.content + '.');
    }
});


function MsToTime(time)
{
    time = (time / 60000);

    var Minutes = Math.floor(time % 60);
    var Hours = Math.floor((time / 60) % 24);
    var Days = Math.floor((time / 1440));
    return Days + ' days, ' + Hours + ' hours and ' + Minutes + ' minutes.';
}

function InitLoop(message)
{
    DeleteMessages(message);
    LoopInterval = Client.setInterval(DeleteMessages, 3600000, message);
}

async function DeleteMessages(message)
{
    if (!message) {
        return;
    }

    const fetched = await message.channel.fetchMessages({ limit: 100 });

    message.channel.bulkDelete(fetched, true);

    message.channel.send(fetched.size + " Messages purged...");
    message.channel.send("Purged @ " + Date(Date.now()).toLocaleString());
}

Client.on("error", (e) => console.error(e));
Client.on("warn", (e) => console.warn(e));
Client.on("debug", (e) => console.info(e));
Client.on('messageDeleteBulk', m => console.log(`Deleted ${m.size} messages.`));

// your bot token here
Client.login('token');