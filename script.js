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
            const txt = message.text;
            switch (txt) {
                case "postpic1":
                    //put action here for postpic1 if there is any
                case "seecake1":
                    return bot.say('![](http://www.fnstatic.co.uk/images/source/article/omg-chocolate-cake-1_2.jpg)')
                        .then(() => 'morecake1');
            }
        }
    },

    morecake1: {
        prompt: (bot) => bot.say('%[More](postback:more1) %[Something else](postback:somethingelse1)'),
        receive: (bot, message) => {
            const txt = message.text;
            switch (txt) {
                case "more1": //postback reply
                    return bot.say('![](http://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1043451_11.jpg)')
                        .then(() => 'morecake1');
                case "somethingelse1": //postback reply
                    return bot.say('OK. What do you want to do?')
                        .then(() => 'something1');
            }
        }
    },

    morecake2: {
        prompt: (bot) => bot.say('%[More](postback:more2) %[Something else](postback:somethingelse2)'),
        receive: (bot, message) => {
            const txt = message.text;
            switch (txt) {
                case "more2": //postback reply
                    return bot.say('![](http://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1043451_11.jpg)')
                        .then(() => 'morecake2');
                case "somethingelse2": //postback reply
                    return bot.say('OK. What do you want to do?')
                        .then(() => 'something1');
            }
        }
    },

    something1: {
        prompt: (bot) => bot.say('%[Post a comment](postback:postcomment1) %[Send us feedback](postback:sendfeedback1)'),
        receive: (bot, message) => {
            const txt = message.text;
            switch (txt) {
                case "postcomment1":
                    return bot.say('Ok!') 
                        .then(() => 'getComment');
                case "sendfeedback1":
                    return bot.say('Great! We’d love to hear from you!')
                        .then(() => 'askName');
            }
        }
    },

    getComment: {
        prompt: (bot) => bot.say('You can send it here'),
        receive: (bot, message) => {
            const comment = message.text;
            return bot.setProp('comment', comment)
                .then(() => 'thanksComment');
        }
    },

    thanksComment: {
        prompt: (bot) => bot.say('Thanks for the comment! Now what? Do you want more cake?\n %[Yes, cake is awesome!](postback:awesome2) %[No, I\'m good](postback:imgood2)'),
        receive: (bot, message) => {
            const txt = message.text;
            switch (txt) {
                case "awesome2":
                    return bot.say('![](http://www.taste.com.au/images/recipes/sfi/2011/08/27867_l.jpg)')
                        .then(() => 'morecake2');
                case "imgood2":
                    return bot.say('Awe, that’s it for today. See you next time! There’s gonna be more cake!!!')
                        .then(() => 'finish');
            }
        }
    },


    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Hi ${name}!`))
                .then(() => 'askLocation');
        }
    },

    askLocation: {
        prompt: (bot) => bot.say('Where are you located?'),
        receive: (bot, message) => {
            const location = message.text;
            return bot.setProp('location', location)
                .then(() => bot.say(`Great! ${location} is wonderful!`))
                .then(() => 'askFeedback');
        }
    },

    askFeedback: {
        prompt: (bot) => bot.say('What do you want to tell us?'),
        receive: (bot, message) => {
            const feedback = message.text;
            return bot.setProp('feedback', feedback)
                .then(() => bot.say(`Thanks for the feedback! I will share it with the admin`))
                .then(() => 'showMorePhotos');
        }
    },

    showMorePhotos: {
        prompt: (bot) => bot.say('Would you like to see more photos?\n %[Yes, cake is awesome!](postback:awesome) %[No, I\'m good](postback:imgood)'),
        receive: (bot, message) => {
            const txt = message.text;
            switch (txt) {
                case "awesome":
                    return bot.say('![](http://www.bbcgoodfood.com/sites/default/files/chocolate-avocado-cake.jpg)')
                        .then(() => 'morecake2');
                case "imgood":
                    return bot.say('Awe, that’s it for today. See you next time! There’s gonna be more cake!!!')
                        .then(() => 'start');
            }
        }
    }

    /*finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say('Nice chatting with you, this is my limit at this moment! Have a good day!'))
                .then(() => 'finish');
        }
    }*/
});
