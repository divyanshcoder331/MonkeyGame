
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(550,500);
  
  var survivalTime=0;

  monkey=createSprite(80,350,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.12;
  
  ground=createSprite(400,395,1500,20);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
  background("white");
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  monkey.collide(ground)
  if(keyDown("space")&& monkey.y>340){
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+0.5
  
  if(monkey.isTouching(obstacleGroup)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    
  }
  stroke("White");
  textSize=40;
  fill("white");
  
  stroke("black");
  textSize=40;
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("survival Time :"+survivalTime,220,50);
  obstacles();
  foods();
  
  drawSprites();
}


function obstacles(){
  if(frameCount%300 === 0){
    obstacle=createSprite(500,360);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    obstacle.velocityX=-7
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
    
  }
}


function foods(){
  if (frameCount % 120 === 0) {
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(200,275));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    monkey.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}
