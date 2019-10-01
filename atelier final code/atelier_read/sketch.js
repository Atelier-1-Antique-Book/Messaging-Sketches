/*
load site in multiple browsers and enjoy creating a random story
 */


let dataServer;
let pubKey = 'pub-c-5726c70d-264f-448a-9922-3f2a53f9daad';
let subKey = 'sub-c-40c63f1c-d5af-11e9-8d6d-8621f881bfdb';

//name used to sort your messages. used like a radio station. can be called anything
let channelName = "powerpoint";
let incomingText = "";

let total = 20;
let num = 0;
let w = "";
let word = "";
let blank = ["placeholder", "name", "adjective", "noun", "body part (singular)","exclamation/bad word", "plural noun", "body parts (plural)","adverb","adjective","noun","adjective","number","bad word","who/what do you worship?","adverb","number","celebrity","adverb","what is your catchphrase?","adjective"]; //array of input prompts, they get replaced with user input overtime


let song;
let drumroll;
let moon;

function preload() {

  drumroll = loadSound('drumroll.wav');
  song = loadSound('music.mp3');
  moon = loadSound('moon.mp3');
}
function setup()
{
  drumroll.setVolume(.2);
  moon.setVolume(.3);
  song.setVolume(.2);
  song.play();

  firstButton = createButton("Reveal Story A");
  secondButton = createButton("Reveal Story B");
  thirdButton = createButton("Reveal Story C");


  getAudioContext();

 dataServer = new PubNub(
 {
   publish_key   : pubKey,  //get these from the pubnub account online
   subscribe_key : subKey,
   ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
 });

  dataServer.addListener({ message: readIncoming });
  dataServer.subscribe({channels: [channelName]});

    //input box and send button
    sendText = createInput();
    //sendButton = createButton("reveal story");

    var r = getRandomInt(0, 255);
    var g = getRandomInt(0, 255);
    var b = getRandomInt(0, 255);
document.getElementById("display").style.color = "rgb(" + r + "," + g + "," + b + ")";
}



function draw()
{
  sendText.size(0);
  //sendButton.size(0);
  firstButton.size(0);
  secondButton.size(0);
  thirdButton.size(0);
  blank[num] = word;

  if(num+1>total){

    song.stop();

    //sendButton.size(100);
    //sendButton.position(sendText.x + sendText.width,height+260);
    //sendButton.mousePressed(revealStory);
    firstButton.size(100);
    firstButton.position((windowWidth/2)-250,height+460);
    firstButton.mousePressed(revealStoryA);
    secondButton.size(100);
    secondButton.position((windowWidth/2)-100,height+460);
    secondButton.mousePressed(revealStoryB);
    thirdButton.size(100);
    thirdButton.position((windowWidth/2)+50,height+460);
    thirdButton.mousePressed(revealStoryC);
  }
  else{
    document.getElementById("display").style.color = 'black';
    document.getElementById("display").innerHTML =("Story "+(num/total)*100+"% complete");
  }

}

function revealStoryA()
{
  drumroll.setVolume(0.0);
  moon.setVolume(0.0);
  drumroll.stop();
  num++;
  dataServer.publish(
    {
      channel: channelName,
      message:
      {
        type: num,
        //word: w
      }
    });
  document.getElementById('instructions').style.display = 'none';
  document.getElementById("display").style.fontSize = '150%';
  document.getElementById("display").style.color = 'black';


  document.getElementById("display").innerHTML =(blank[1] + " woke up feeling " + blank[2] + " and thought that today would be a " + blank[9] + " day to go antique shopping. " + blank[1] + " went to the drawer to get some money from their wallet... " + blank[5] + "!!! only " + blank[12] + " dollars? what the " + blank[13] + " am I gonna do with " + blank[12] + " dollars? Fortunately, " + blank[1] + " remembered that they own a copy of Collecting Antiques on a Small Income by Geoffrey W. Beard, 1957. Thank " + blank[14] + ". This book will guide me. " + blank[1] + " " + blank[8] + " arrived at the Antique store in a world breaking time of " + blank[16] + " hours. This is a " + blank[11] + " store! " + blank[1] + " exclaimed! I need something for my new house... Ah! This antique Bouquet holder would be perfect! " + blank[1] + " " + blank[8] + " grabbed the Bouquet holder with their " + blank[20] + " " + blank[7] + " but it seems that someone has also grabbed the Bouquet holder. " + blank[13] + " " + blank[1] + "! shouted. It's " + blank[17] + "! this is mine, said " + blank[17] + ". 'oh okay'" + blank[1] + " shyly replied. " + blank[1] + " then " + blank[18] + " proceeded to go home empty handed. "+ blank[19]);

  getAudioContext().resume();



  let story = new p5.Speech(voiceReady);
  story.setVoice(Math.floor(random(story.voices.length)));
  story.speak(blank[1] + " woke up feeling " + blank[2] + " and thought that today would be a " + blank[9] + " day to go antique shopping. " + blank[1] + " went to the drawer to get some money from their wallet... " + blank[5] + "!!! only " + blank[12] + " dollars? what the " + blank[13] + " am I gonna do with " + blank[12] + " dollars? Fortunately, " + blank[1] + " remembered that they own a copy of Collecting Antiques on a Small Income by Geoffrey W. Beard, 1957. Thank " + blank[14] + ". This book will guide me. " + blank[1] + " " + blank[8] + " arrived at the Antique store in a world breaking time of " + blank[16] + " hours. This is a " + blank[11] + " store! " + blank[1] + " exclaimed! I need something for my new house... Ah! This antique Bouquet holder would be perfect! " + blank[1] + " " + blank[8] + " grabbed the Bouquet holder with their " + blank[20] + " " + blank[7] + " but it seems that someone has also grabbed the Bouquet holder. " + blank[13] + " " + blank[1] + "! shouted. It's " + blank[17] + "! this is mine, said " + blank[17] + ". 'oh okay'" + blank[1] + " shyly replied. " + blank[1] + " then " + blank[18] + " proceeded to go home empty handed. "+ blank[19]);
}
function revealStoryC()
{
  drumroll.setVolume(0.0);
  moon.setVolume(0.0);
  drumroll.stop();
  num++;
  dataServer.publish(
    {
      channel: channelName,
      message:
      {
        type: num,
        //word: w
      }
    });
  document.getElementById('instructions').style.display = 'none';
  document.getElementById("display").style.fontSize = '150%';
  document.getElementById("display").style.color = 'black';


  document.getElementById("display").innerHTML =("Today " + blank[1] + " went to the antique store. While " + blank[1] + " was there, " + blank[1] + " found a "+ blank[2] + " " + blank[3] + ". " + blank[1] + " took it to the shopkeeper, who told " + blank[1] + " that the " + blank[2] + " " + blank[3] + " used to belong to a " + blank[9] +" "+ blank[10] +". " + blank[1] + " was thrilled. A "+ blank[2] + " " + blank[3] + " with such a rich history was an incredible find!");

  getAudioContext().resume();



  let story = new p5.Speech(voiceReady);
  story.setVoice(Math.floor(random(story.voices.length)));
  story.speak("Today " + blank[1] + " went to the antique store. While " + blank[1] + " was there, " + blank[1] + " found a "+ blank[2] + " " + blank[3] + ". " + blank[1] + " took it to the shopkeeper, who told " + blank[1] + " that the " + blank[2] + " " + blank[3] + " used to belong to a " + blank[9] +" "+ blank[10] +". " + blank[1] + " was thrilled. A "+ blank[2] + " " + blank[3] + " with such a rich history was an incredible find!");
}

function revealStoryB()
{
  drumroll.setVolume(0.0);
  moon.setVolume(0.0);
  drumroll.stop();
  num++;
  dataServer.publish(
    {
      channel: channelName,
      message:
      {
        type: num,
        //word: w
      }
    });
  document.getElementById('instructions').style.display = 'none';
  document.getElementById("display").style.fontSize = '150%';
  document.getElementById("display").style.color = 'black';


  document.getElementById("display").innerHTML =("Today " + blank[1] + " is going shopping for antiques. " + blank[1] + " walked in to the shop and immediately noticed a " + blank[2] + " " + blank[3] + ". A solid handmade " + blank[3] + " is much more valuable than one made by machines. " + blank[1] + " was thrilled, however shouted " + blank[5] +" after discovering it had a hole in it. By the window there were gently used " + blank[6] +" and dolls with real human "+ blank[7] +". "+ blank[1] +"'s "+ blank[4] +" began tingling " + blank[8] + " from excitement after finding a "+ blank[9] + " "  + blank[10] + ". What a " + blank[11] +" day!");

  getAudioContext().resume();



  let story = new p5.Speech(voiceReady);
  story.setVoice(Math.floor(random(story.voices.length)));
  story.speak("Today " + blank[1] + " is going shopping for antiques. " + blank[1] + " walked in to the shop and immediately noticed a " + blank[2] + " " + blank[3] + ". A solid handmade " + blank[3] + " is much more valuable than one made by machines. " + blank[1] + " was thrilled, however shouted " + blank[5] +" after discovering it had a hole in it. By the window there were gently used " + blank[6] +" and dolls with real human "+ blank[7] +". "+ blank[1] +"'s "+ blank[4] +" began tingling " + blank[8] + " from excitement after finding a "+ blank[9] + " "  + blank[10] + ". What a " + blank[11] +" day!");
}

function voiceReady(){
  console.log(text.voices);
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
  document.getElementById("display").style.color = "rgb(" + r + "," + g + "," + b + ")";
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
    if(num+1>total){

      drumroll.play();
    }


      moon.play();
      document.getElementById("instructions").innerHTML =("");

}
