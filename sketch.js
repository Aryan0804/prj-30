const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

//declaring variable
var engine;
var world;
var leftWall;
var rightWall;
var ground;
var bridge;
var jointPoint;
var jointLink;
var stones = [];
var zombie,breakButton;
var zombie1,zombie2;
var zombie3,zombie4;
var backgroundImg;
var stoneImg;
var bridgeImg;


function preload(){
  zombie1 = loadImage("/assets/zombie.png");
  zombie2 = loadImage("/assets/zombie.png");
  zombie3 = loadImage("/assets/zombie.png");
  zombie4 = loadImage("/assets/zombie.png");
  stoneImg = loadImage("/assets/stone.png");
  bridgeImg = loadImage("/assets/wood.png");
  
  backgroundImg = loadImage("/assets/background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  //creating ground , leftWall , rightWall
  ground = new Base(0,height-10,width * 2, 20, "#795548",true);
  leftWall = new Base(150,height/2+25, 50,100,"#8d6e63",true);
  rightWall = new Base(width-100,height/2+20, 50,100,"#8d6e63",true);

  //creating bridge
  bridge = new Bridge(15,{x:width/2-900,y:height/2});
jointPoint = new Base(width-40,height/2+10,40,20,"#8t6e63",true);

//cerating zombie
zombie = createSprite(width / 2,height - 110);
zombie.addAnimation("lefttoright", zombie1,zombie2,zombie1);
zombie.addAnimation("righttoleft",zombie3,zombie4,zombie3);
zombie.scale = 0.1;
zombie.velocityX = 5;


breakButton = createButton("");
breakButton.position(width-200,height/2-50);
breakButton.class("breakButton");
breakButton.mousePressed(handleButtonPress);



Matter.Composite.add(bridge.body,jointPoint);
jointPoint = new Link(bridge,jointPoint);

for (var i =0 ; i <=8; i++){
var x= random(width/2-200,width /2+300);
var y= random(-10,140);
 var stone = new Stone(x, y ,80,80);
 stones.push(stone);
}
}


function draw() {
  background(backgroundImg);
  Engine.update(engine);
  ground.show();
  leftWall.show();
  rightWall.show();
  bridge.show();

  for(var stone of stones){
    stone.show();
  }
  drawSprites();
}

function handleButtonPress(){
  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}

