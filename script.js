'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        //prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hello, welcome to CatBots.lol')
                .then(() => 'askToDo');
        }
    },

    askToDo: {
        prompt: (bot) => bot.say('What would you like to do today? %[Post a picture](postback:postpic1) %[See some cakes](postback:seecake1)'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Great! I'll call you ${name}
Is that OK? %[Yes](postback:yes) %[No](postback:no)`))
                .then(() => 'finish');
        }
    },

    seecake1: {
        receive: (bot) => {
            return bot.say('![](https://raw.githubusercontent.com/esthercrawford/smooch-bot-example/master/img/esther.jpg)')
                .then(() => 'morecake1');
        }
    },

    morecake1: {
        receive: (bot) => {
            return bot.say('%[More](postback:more1) %[Something else](postback:somethingelse1)');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, my creator didn't ` +
                        'teach me how to do anything else!'))
                .then(() => 'finish');
        }
    }
});
