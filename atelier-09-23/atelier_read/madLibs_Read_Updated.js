
/*
reveals stories based on words added by users
SAVE THIS AS script.js OR THE HTML FILE WONT RECOGNIZE IT
*/


let dataServer;
let pubKey = 'pub-c-5726c70d-264f-448a-9922-3f2a53f9daad';
let subKey = 'sub-c-40c63f1c-d5af-11e9-8d6d-8621f881bfdb';

//name used to sort your messages. used like a radio station. can be called anything
let channelName = "powerpoint";
let incomingText = "";

let total = 11;
let num = 0;
let w = "";
let word = "";


let blank = ["placeholder", "name", "adjective", "noun", "body part (singular)","exclamation/bad word", "plural noun", "body parts (plural)","adverb","adjective","noun","adjective", "person"]; //array of input prompts, they get replaced with user input overtime



function setup()
{


// initialize pubnub
dataServer = new PubNub(
{
 publish_key   : pubKey,  //get these from the pubnub account online
 subscribe_key : subKey,
 ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
});

//attach callbacks to the pubnub object to handle messages and connections
dataServer.addListener({ message: readIncoming });
dataServer.subscribe({channels: [channelName]});

  //sendText and buttons
  sendText = createInput();
  firstButton = createButton("Reveal Story A");
  secondButton = createButton("Reveal Story B");
  thirdButton = createButton("Reveal Story C")

  var r = getRandomInt(0, 255);
  var g = getRandomInt(0, 255);
  var b = getRandomInt(0, 255);
document.getElementById('text').style.color = "rgb(" + r + "," + g + "," + b + ")";
}

function draw()
{
sendText.size(0);
firstButton.size(0);
secondButton.size(0);
thirdButton.size(0);
  blank[num] = word;
if(num+1>total){


  firstButton.size(100);
  firstButton.position((windowWidth/2)-250,height+260);
  firstButton.mousePressed(revealStoryA);
  secondButton.size(100);
  secondButton.position((windowWidth/2)-100,height+260);
  secondButton.mousePressed(revealStoryB);
  thirdButton.size(100);
  thirdButton.position((windowWidth/2)+50,height+260);
  thirdButton.mousePressed(revealStoryC);


}
}
function revealStoryA(){
num++;
dataServer.publish(
  {
    channel: channelName,
    message:
    {
      type: num,
      word: w
    }
  });

document.getElementById('instructions').style.display = 'none';
document.getElementById('text').style.fontSize = '150%';
document.getElementById('text').style.color = 'black';


document.getElementById("text").innerHTML =("Today " + blank[1] + " is going shopping for antiques. " + blank[1] + " walked in to the shop and immediately noticed a " + blank[2] + " " + blank[3] + ". A solid handmade " + blank[3] + " is much more valuable than one made by machines. " + blank[1] + " was thrilled, however shouted " + blank[5] +" after discovering it had a hole in it. By the window there were gently used " + blank[6] +" and dolls with real human "+ blank[7] +". "+ blank[1] +"'s "+ blank[4] +" began tingling " + blank[8] + " from excitement after finding a "+ blank[9] + " "  + blank[10] + ". What a " + blank[11] +" day!");


var text = new p5.Speech();
text.speak("Today " + blank[1] + " is going shopping for antiques. " + blank[1] + " walked in to the shop and immediately noticed a " + blank[2] + " " + blank[3] + ". A solid handmade " + blank[3] + " is much more valuable than one made by machines. " + blank[1] + " was thrilled, however shouted " + blank[5] +" after discovering it had a hole in it. By the window there were gently used " + blank[6] +" and dolls with real human "+ blank[7] +". "+ blank[1] +"'s "+ blank[4] +" began tingling " + blank[8] + " from excitement after finding a "+ blank[9] + " "  + blank[10] + ". What a " + blank[11] +" day!");
}

function revealStoryB(){
num++;
dataServer.publish(
  {
    channel: channelName,
    message:
    {
      type: num,
      word: w
    }
  });

document.getElementById('instructions').style.display = 'none';
document.getElementById('text').style.fontSize = '150%';
document.getElementById('text').style.color = 'black';


document.getElementById("text").innerHTML =("Story B would go here, but we don't have it yet.");


var text = new p5.Speech();
text.speak("Story B would be read here, but we don't have it yet.");
}

function revealStoryC(){
num++;
dataServer.publish(
  {
    channel: channelName,
    message:
    {
      type: num,
      word: w
    }
  });

document.getElementById('instructions').style.display = 'none';
document.getElementById('text').style.fontSize = '150%';
document.getElementById('text').style.color = 'black';


document.getElementById("text").innerHTML =("Today " + blank(1) + " went to the antique store. While " + blank(1) + " was there, " + blank(1) + " found a " blank(2) + " " + blank(3) + ". " + blank(1) + " took it to the shopkeeper, who told " + blank(1) + " that the " + blank(2) + " " + blank(3) + " used to belong to a " + blank(10) + blank(13) +". " + blank(1) + " was blank(12) + ". A " blank(2) + " " + blank(3) + "with such a rich history was an incredible find!");


var text = new p5.Speech();
text.speak("Today " + blank(1) + " went to the antique store. While " + blank(1) + " was there, " + blank(1) + " found a " blank(2) + " " + blank(3) + ". " + blank(1) + " took it to the shopkeeper, who told " + blank(1) + " that the " + blank(2) + " " + blank(3) + " used to belong to a " + blank(10) + blank(13) +". " + blank(1) + " was blank(12) + ". A " blank(2) + " " + blank(3) + "with such a rich history was an incredible find!");
}

function getRandomInt(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;

}


function sendTheMessage()
{
if(sendText.value()!=""){
var r = getRandomInt(0, 255);
var g = getRandomInt(0, 255);
var b = getRandomInt(0, 255);
document.getElementById('text').style.color = "rgb(" + r + "," + g + "," + b + ")";
w=sendText.value();
num = ((num)<(total)) ? num+=1 : 0; //shorthand for conditional assignment

//publish the word and word type to everyone.
dataServer.publish(
  {
    channel: channelName,
    message:
    {
      type: num,
      word: w
    }
  });
  sendText.value("");
}

}

function readIncoming(inMessage) //when new data comes in it triggers this function,
{
  word = inMessage.message.word;
  num = inMessage.message.type;
  // blank[num]=w;
  console.log("w="+word);
  console.log(num);

sendText.value("");
}
