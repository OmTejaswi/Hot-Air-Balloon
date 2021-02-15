var dataBase;
var balloon1, balloonAnimation;
var backGround;
var updateX, updateY;

function preload() {
  balloonAnimation = loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png",
  "images/Hot Air Ballon-04.png");

  backGround = loadImage("images/Hot Air Ballon-01.png")
}

function setup() {
  createCanvas(1500,600);

  dataBase = firebase.database();

  balloon1 = createSprite(width/8,height/1.5,50,100);
  balloon1.scale = 0.6;
  balloon1.addAnimation("ballonanimation",balloonAnimation);


  var balloonPosition = dataBase.ref("balloon/position");

  balloonPosition.update({
    x: 187,
    y: 400
  })
 
  balloonPosition.on("value", function(data){
    var pos = data.val();
    balloon1.x = pos.x;
    balloon1.y = pos.y;
  });
 
}

function draw() {
  background(backGround);  

  if(keyDown(UP_ARROW)) {

    if(balloon1.scale >= 0.35) {
      balloon1.scale-=0.01;
    } else {
      balloon1.scale-=0;
    }

    dataBase.ref("balloon/position").update({
      //x: balloon1.x + x,
      y: balloon1.y - 10
    })

  }

  if(keyDown(DOWN_ARROW)) {

    if(balloon1.scale <= 0.6) {
      balloon1.scale+=0.01;
    } else {
      balloon1.scale+=0;
    }

    dataBase.ref("balloon/position").update({
      //x: balloon1.x + x,
      y: balloon1.y + 10
    })
  }
  if(keyDown(RIGHT_ARROW)) {

    dataBase.ref("balloon/position").update({
      //x: balloon1.x + x,
      x: balloon1.x + 10
    })
  }
  if(keyDown(LEFT_ARROW)) {

    dataBase.ref("balloon/position").update({
      //x: balloon1.x + x,
      x: balloon1.x - 10
    })
  }

  drawSprites();
  console.log(balloon1.scale);

  textSize(20);
  text("Use arrow keys to move Hot Air Balloon",width/20,height/15);
}