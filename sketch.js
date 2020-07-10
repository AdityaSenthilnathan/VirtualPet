var dogIMG, dogIMG2, dog, foodS, foodStock, dataBase,  foodObj;
var feedTime = 0; 
var feedT = 0;

var hour;
var hourmin;
var garden, WashRoom, bedroom;
var readState;
//var bark;

  
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const db = firebase.database();
foodS = 0;
function preload() {
  soundFormats('mp3', 'ogg');
  dogIMG = loadImage("images/Dog.png");
  dogIMG2 = loadImage("images/happy dog.png");
//garden = loadImage("images/Garden.png");
//WashRoom = loadImage("images/Wash Room.png");
//  bedroom = loadImage("images/Bed Room.png");
//bark = loadSound("images/chasecog.mp3")


  //dataBase = firebase.database();
  //db = firebase.database().ref();
}

function setup() {
  createCanvas(1000, 500);
  foodObj = new Food(10,200);
  dog = createSprite(650, 250, 10, 10);
  dog.addImage(dogIMG);
  dog.scale = .1;
  textSize(30);
  fill("green");
  stroke(10);
  feed = createButton("Feed The Dog");
  feed.position(800, 75);

  restock = createButton("Restock your food");
  restock.position(920, 75);
  feedTime = firebase.database().ref("FeedTime");
feedTime.on("value", readTime);

  readState = firebase.database().ref("gameState");
  readState.on("value",function(data){
    gameState = data.val();
  });

  database = firebase.database();

}


function draw() {

  //foodObj.bedroom();
  background(46, 139, 87);
  drawSprites();
  gettime();

//feedT = feedTime.val();

  feed.mousePressed(feedDog); 
  restock.mousePressed(restockFood);
  
  foodObj.display();

  foodObj.getFoodStock();
  foodStock.on("value", readStock);
  var f =  feedT - 12;
  text("Food Avalible: " + foodS, 20, 55);


 if (feedT>=12){
  text("Last Fed : " + f + " PM", 20,85); 

 }else if(feedT == 0){
  text("Last Fed : 12 AM" , 20,85); 

 } else {
  text("Last Fed : " + feedT + " AM", 20,85); 

}
}

function readStock(data) {
  foodS = data.val();
}
function readTime(data) {
  feedT = data.val();
}
function restockFood() {
  dog.addImage(dogIMG);
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
 // bark.play();
  feedT = hourmin;
  firebase.database().ref('/').update({
    FeedTime: feedT
  });

  foodObj.deductFood(foodS);
  dog.addImage(dogIMG2);
}

async function gettime (){
  var response = await fetch("https://worldtimeapi.org/api/timezone/America/Los_Angeles")
  var time = await response.json();
   var dateTime = time.datetime;
  hour = dateTime.slice(11,13);
  hourmin = dateTime.slice(11,13);
}


