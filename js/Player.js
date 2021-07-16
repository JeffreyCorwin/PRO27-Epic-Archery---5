class Player {
  constructor(x, y, width, height) {
    var options = {
      isStatic: true
    };

    this.body = Bodies.rectangle(x, y, width, height, options);
    this.width = width;
    this.height = height;

    this.life1 = "green";
    this.life2 = "green";
    this.life3 = "green";

    this.lif1 = "green";
    this.lif2 = "green";
    this.lif3 = "white";

    this.li1 = "green";
    this.li2 = "white";
    this.li3 = "white";

    this.l1 = "white";
    this.l2 = "white";
    this.l3 = "white";

    this.image = loadImage("./assets/player.png");


    World.add(world, this.body);
  }

  life(){
    push();
      textSize(20);
      fill("white");
      text("Player", 280, 40);

      fill(this.life1);
      rect(180, 50, 70, 30);
      fill(this.life2);
      rect(250, 50, 70, 30);
      fill(this.life3);
      rect(320, 50, 70, 30);
      pop();
  }

  lif(){
    push();
      textSize(20);
      fill("white");
      text("Player", 280, 40);

      fill(this.lif1);
      rect(180, 50, 70, 30);
      fill(this.lif2);
      rect(250, 50, 70, 30);
      fill(this.lif3);
      rect(320, 50, 70, 30);
      pop();
  }

  li(){
    push();
      textSize(20);
      fill("white");
      text("Player", 280, 40);

      fill(this.li1);
      rect(180, 50, 70, 30);
      fill(this.li2);
      rect(250, 50, 70, 30);
      fill(this.li3);
      rect(320, 50, 70, 30);
      pop();
  }
 
  l(){
    push();
      textSize(20);
      fill("white");
      text("Player", 280, 40);

      fill(this.l1);
      rect(180, 50, 70, 30);
      fill(this.l2);
      rect(250, 50, 70, 30);
      fill(this.l3);
      rect(320, 50, 70, 30);
      pop();
  }

  display() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }
}
