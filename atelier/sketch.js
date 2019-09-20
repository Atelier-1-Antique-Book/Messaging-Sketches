/*
load site in multiple browsers and enjoy creating a random story
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


let blank = ["placeholder", "name", "adjective", "noun", "body part (singular)","exclamation/bad word", "plural noun", "body parts (plural)","adverb","adjective","noun","adjective"]; //array of input prompts, they get replaced with user input overtime



function setup()
{
  getAudioContext().resume();

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

    //input box and send button
    sendText = createInput();
    // sendText.position(windowWidth/2-100,height+200);

    sendButton = createButton("add word");
    // sendButton.position(sendText.x + sendText.width,height+200);
    sendButton.mousePressed(sendTheMessage);

    var r = getRandomInt(0, 255);
    var g = getRandomInt(0, 255);
    var b = getRandomInt(0, 255);
document.getElementById('text').style.color = "rgb(" + r + "," + g + "," + b + ")";
}

function draw()
{
  sendText.position(windowWidth/2-100,height+260);
  sendButton.position(sendText.x + sendText.width,height+260);
    blank[num] = word;
  if(num+1>total){


    sendText.position(windowWidth/2-100,height+500);
    sendButton.position(sendText.x + sendText.width,height+500);
    sendButton.mousePressed();

    document.getElementById('instructions').style.display = 'none';
    document.getElementById('text').style.fontSize = '150%';
    document.getElementById('text').style.color = 'black';


    document.getElementById("text").innerHTML =("Today " + blank[1] + " is going shopping for antiques. " + blank[1] + " walked in to the shop and immediately noticed a " + blank[2] + " " + blank[3] + ". A solid handmade " + blank[3] + " is much more valuable than one made by machines. " + blank[1] + " was thrilled, however shouted " + blank[5] +" after discovering it had a hole in it. By the window there were gently used " + blank[6] +" and dolls with real human "+ blank[7] +". "+ blank[1] +"'s "+ blank[4] +" began tingling " + blank[8] + " from excitement after finding a "+ blank[9] + " "  + blank[10] + ". What a " + blank[11] +" day!");
    var text = new p5.Speech();
    text.speak("Today " + blank[1] + " is going shopping for antiques. " + blank[1] + " walked in to the shop and immediately noticed a " + blank[2] + " " + blank[3] + ". A solid handmade " + blank[3] + " is much more valuable than one made by machines. " + blank[1] + " was thrilled, however shouted " + blank[5] +" after discovering it had a hole in it. By the window there were gently used " + blank[6] +" and dolls with real human "+ blank[7] +". "+ blank[1] +"'s "+ blank[4] +" began tingling " + blank[8] + " from excitement after finding a "+ blank[9] + " "  + blank[10] + ". What a " + blank[11] +" day!");

  }
  else{

    document.getElementById('text').style.fontSize = '300%';
    document.getElementById("text").innerHTML =(blank[num+1]);
  }
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
