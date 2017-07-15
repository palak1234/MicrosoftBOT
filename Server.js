

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
//server.get(/\/images\/?.*/, restify.serveStatic({
//directory: __dirname
//}));

//invoke the listen method to begin listening to our requests:

server.listen(process.env.port || process.env.PORT || 3978, function () {
console.log('Chatbot listening to %s', server.url);
});


var connector = new builder.ChatConnector({
appId: "223e5d34-05a9-4524-8863-6a8106b28433",
appPassword: "fzgWrKQQc5rNfUKLf6jS6H6"
});
var bot = new builder.UniversalBot(connector);

//set up a route which forwards API requests to the connector object.
server.post('/api/messages', connector.listen());

//To present a card when someone joins your bot channel i simply use the bot.on('conversationUpdate') event as per the following example:

bot.on('conversationUpdate', function (activity) {
if (activity.membersAdded || activity.membersAdded.length > 0) {
bot.send(new builder.Message()
.address(activity.address)
.textFormat(builder.TextFormat.xml)
.attachments([
new builder.HeroCard()
.title("Welcome here to SafeCircle chatroom! My name is Chelsea")
.subtitle(" Please tell me how I can assist.")
.text("You can ask me something like \" Dominican resturants\" or \" Immigration lawers\" or \"Dominican cultural places\"")
.images([
builder.CardImage.create(activity.address, "/Users/pgangwal/Downloads/Screen Shot 2017-07-15 at 2.20.01 AM.png")
])
])
);
}
});

//function aContainsB (a, b) {
  //  return a.indexOf(b) >= 0;
//}



var feature = new builder.IntentDialog()
bot.dialog('/', feature);
feature.matches(/^hello|hola|hi|Hey|hey|kio ara/i, function(session){
session.send(`${session.message.text}! Please let me know how I can help!`);
});

//var feature2 = new builder.IntentDialog()
//bot.dialog('/', feature);
feature.matches(/^Dominican resturants|Dominican cafes|Dominican food|Dominican fastfood/i, function(session){
session.send("You asked about %s", session.message.text + "?");
session.send(`Top 3 ${session.message.text} famous in your community are 1. "El Castillo de Jagua": http://elcastillodejaguanyc.com/ `);
session.send(`2."Latin American Restaurant": http://elcastillodejaguanyc.com/ `);
session.send(`3."El Castillo de Jagua": http://elcastillodejaguanyc.com/ `);
session.send(`Make sure you go to gym tommorrow:P`);
});

//international calling places
//cultural centre
//var feature3 = new builder.IntentDialog()
//bot.dialog('/', feature);
feature.matches(/^Dominican cultural|Dominican culture|Dominican group|Dominican cultural places/i, function(session){
	session.send("You asked about %s", session.message.text + "?");
session.send(`Top 3 ${session.message.text} famous in your community are 1. "Barbara Domigo ": http://elcastillodejaguanyc.com/ `);
session.send(`2."DominicanCulture": http://elcastillodejaguanyc.com/ `);
session.send(`3."Santo Domingo": http://elcastillodejaguanyc.com/ `);
session.send(`Have fun with your people:P`);
});


//religious places

feature.matches(/^Dominican religious|Dominican religion|Dominican god|Dominican temple/i, function(session){
session.send("You asked about %s", session.message.text + "?");
session.send(`Top 3 ${session.message.text} famous in your community are 1. "Catedral Primada de America (Santo Domingo)": http://elcastillodejaguanyc.com/ `);
session.send(`2."National Pantheon (Pantheon Nacional) (Santo Domingo)": http://elcastillodejaguanyc.com/ `);
session.send(`3."Basilica Catedral Nuestra Senora de la Altagracia (Higuey)": http://elcastillodejaguanyc.com/ `);
session.send(`pray for your sins :P`);
});

//lawers 
feature.matches(/^Immigration lawers|lawer|Immigration|help|/i, function(session){
session.send("You asked about %s", session.message.text + "?");
session.send(`Top 3 ${session.message.text} famous in your community are 1. "Abreu & Associates Immigration Services": http://www.abreuimmigration.com/ `);
session.send(`2."ImmigrationLawer": http://www.abreuimmigration.com/`);
session.send(`3."Arciniegas & Associates Immigration Lawyers, Dominican Republic": https://www.immigrationservices.co/ `);
session.send(`pray for your sins :P`);

});


//var bot = new builder.UniversalBot(connector, function (session) {
  // session.send("You said: %s", session.message.text);









