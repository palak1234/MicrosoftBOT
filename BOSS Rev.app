

var restify = require("restify");
var builder = require("botbuilder");
var url = require("url");


//Create your server object:

var server = restify.createServer();

//intercept the http request to retrieve the host name:
server.use(function (req, res, next) {
serverUrl = "http://"+req.header('Host');
next();
});


//insert a custom route to handle image retrieval:
server.get(/\/images\/?.*/, restify.serveStatic({
directory: __dirname
}));




//invoke the listen method to begin listening to our requests:

server.listen(process.env.port || process.env.PORT || 3978, function () {
console.log('Chatbot listening to %s', server.url);
});



var connector = new builder.ChatConnector({
appId: " 223e5d34-05a9-4524-8863-6a8106b28433",
appPassword: " fzgWrKQQc5rNfUKLf6jS6H6"
});
var bot = new builder.UniversalBot(connector);



//set up a route which forwards API requests to the connector object.
server.post('/api/messages', connector.listen());

//To present a card when someone joins your bot channel i simply use the bot.on('conversationUpdate') event as per the following example:

bot.on('conversationUpdate', function (activity) {
if (activity.membersAdded && activity.membersAdded.length > 0) {
bot.send(new builder.Message()
.address(activity.address)
.textFormat(builder.TextFormat.xml)
.attachments([
new builder.HeroCard()
.title("Welcome to my chat bot!")
.subtitle("I am written in node.js!")
.text("Hello. Please tell me how I can assist.")
.images([
builder.CardImage.create(activity.address, serverUrl+"/images/mylogo.png")
])
])
);
}
});

var intents = new builder.IntentDialog()
bot.dialog('/', intents);
intents.matches(/^hello|hola|kio ara/i, function(session){
session.send(`${session.message.text}! Please let me know how I can help!`);
});










