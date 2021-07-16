const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var computer, computerBase, computerArcher;
var playerArrows = [];
var computerArrows = [];
var Ground;
var cros = [];
var crosdata, crosSheet;
var crosAnimation = [];

//
//Declare the varibales to add 3 life for player and computerplayer
var playerLife = 3;
var computerLife = 3;


function preload() {
  //Load Image of background
backgroundImg = loadImage("./assets/background.gif");

crosdata = loadJSON("./assets/crocodile/alli.json");
crosSheet = loadImage("./assets/crocodile/alli.png");

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, random(450, height - 300), 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 50, 180);
  //cro1 = new aligator(width - 100, height - 150, 100, 100);
  Ground = new ground(0, height - 1, width*2, 1)
  playerArcher = new PlayerArcher(
    340,
    playerBase.body.position.y - 180,
    120,
    120
  );

  computerBase = new ComputerBase(
    width - 300,
    random(450, height - 300),
    180,
    150
  );
  computer = new Computer(
    width - 280,
    computerBase.body.position.y - 153,
    50,
    180
  );

  computerArcher = new ComputerArcher(
    width - 350,
    computerBase.body.position.y - 180,
    120,
    120
  );
  handleComputerArcher();

  var crosframes = crosdata.frames;

  for(var i = 0; i< crosframes.length; i++){
    var pos = crosframes[i].position;
    var img = crosSheet.get(pos.x, pos.y, pos.width, pos.height);
    crosAnimation.push(img);
  }
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);
  


  for (var i = 0; i < computerArrows.length; i++) {
    showArrows(i, computerArrows);
    
  }


  for (var i = 0; i < playerArrows.length; i++) {
    showArrows(i, playerArrows);
  
  }



  playerBase.display();
  player.display();
  
  playerArcher.display();
  handlePlayerArrowCollision();
 /* for (var i = 0; i < cros.length; i++) {
    showCrocodile(i, cros);
  }*/

  //call Player.life and computerplayer.life
  player.life();
  computer.life();

  computerBase.display();
  computer.display();

  Ground.display();
  //cro1.display();
  
  computerArcher.display();
  handleComputerArrowCollision();
  livesOfPlayer();

  

  croc();

  for(var i = 0; i < playerArrows.length; i++){
    showArrowss(playerArrows[i],i);
  }


 
  for(var i = 0; i < computerArrows.length; i++){
    showArrowsss(computerArrows[i],i);
    }
}

function keyPressed() {
  if (keyCode === 32) {
    var posX = playerArcher.body.position.x;
    var posY = playerArcher.body.position.y;
    var angle = playerArcher.body.angle;

    var arrow = new PlayerArrow(posX, posY, 100, 10, angle);

    arrow.trajectory = [];
    Matter.Body.setAngle(arrow.body, angle);
    playerArrows.push(arrow);
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}

function showArrows(index, arrows) {
  arrows[index].display();
 
}

function showArrowss(arrow, index) {
  arrow.display();
  if(arrow.body.position.x <= 50 || arrow.body.position.y >= height - 150 || arrow.body.position.x >= width - 300){
    Matter.World.remove(world,arrow.body);
    playerArrows.splice(index,1);
  }
}

function showArrowsss(arrow, index) {
  arrow.display();
  if(arrow.body.position.x <= 50 || arrow.body.position.y >= height - 150 || arrow.body.position.x >= width - 300){
    Matter.World.remove(world,arrow.body);
    computerArrows.splice(index,1);
  }
}

/*function showCrocodile(cro, index) {
  //cro.display();
  if(cro.body.position.x < 100){
    Matter.World.remove(world,cros.body);
    cros.splice(index,1);
   
  }
}*/

function handleComputerArcher() {
  if (!computerArcher.collapse && !playerArcher.collapse) {
    setTimeout(() => {
      var pos = computerArcher.body.position;
      var angle = computerArcher.body.angle;
      var moves = ["UP", "DOWN"];
      var move = random(moves);
      var angleValue;

      if (move === "UP") {
        angleValue = 0.1;
      } else {
        angleValue = -0.1;
      }
      angle += angleValue;

      var arrow = new ComputerArrow(pos.x, pos.y, 100, 10, angle);

      Matter.Body.setAngle(computerArcher.body, angle);
      Matter.Body.setAngle(computerArcher.body, angle);

      computerArrows.push(arrow);
      setTimeout(() => {
        computerArrows[computerArrows.length - 1].shoot(angle);
      }, 100);

      handleComputerArcher();
    }, 2000);
  }
}

function handlePlayerArrowCollision() {
  for (var i = 0; i < playerArrows.length; i++) {
    var baseCollision = Matter.SAT.collides(
      playerArrows[i].body,
      computerBase.body
    );

    var archerCollision = Matter.SAT.collides(
      playerArrows[i].body,
      computerArcher.body
    );

    var computerCollision = Matter.SAT.collides(
      playerArrows[i].body,
      computer.body
    );

    

    if (
      baseCollision.collided ||
      archerCollision.collided ||
      computerCollision.collided 
    ) {
      
     
      console.log("Player Arrow Collided")
    }
  }
}

function handleComputerArrowCollision() {
  for (var i = 0; i < computerArrows.length; i++) {
    var baseCollision = Matter.SAT.collides(
      computerArrows[i].body,
      playerBase.body
    );

    var archerCollision = Matter.SAT.collides(
      computerArrows[i].body,
      playerArcher.body
    );

    var playerCollision = Matter.SAT.collides(
      computerArrows[i].body,
      player.body
    );

   

    if (
      baseCollision.collided ||
      archerCollision.collided ||
      playerCollision.collided 
    );
    {
     
      console.log("Computer Arrow Collided");
    }
  }
}

function livesOfPlayer(){
  for (var i = 0; i < computerArrows.length; i++) {
  var ha2 = Matter.SAT.collides(
    computerArrows[i].body,
    player.body
  )

  /*var ha1 = Matter.SAT.collides(
    computerArrows[i].body,
    player.body
  )

  var ha = Matter.SAT.collides(
    computerArrows[i].body,
    player.body
  )*/

    if(ha2.collided){
      player.lif();
      console.log("hi")
    }

    /*if(ha1.collided){
      player.li();
    }

    if(ha.collided){
      player.l();
    }*/

  }
    
  
}

function croc(){
  if(cros.length > 0){
    if(cros.length < 6 && cros[cros.length - 1].body.position.x < width-300){
      var positions = [-130, -100, -120, -80 ,-90 ,-60];
      var position = random(positions);
      var cro = new aligator(width, height-100, 150, 100, position, crosAnimation);
      cros.push(cro);
}
for(var i = 0; i < cros.length; i++){
  Matter.Body.setVelocity (cros[i].body, {x:-2,y:0}); 


  cros[i].display();
  cros[i].animate();

}
}else{
var cro = new aligator(width,  height-100, 150, 100, -100, crosAnimation);
cros.push(cro);
  }
}