/*
Episode 1, draw a canvas and resize it
*/
var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log('Size is ',canvas.width, canvas.height);

var ctx = canvas.getContext('2d');

/* Uncomment
ctx.fillStyle = 'rgba(255,50,100,0.5)'
ctx.fillRect(350, 100, 100, 100);
ctx.fillStyle = 'rgba(50,255,100,0.5)'
ctx.fillRect(400, 100, 50, 300);
ctx.fillStyle = 'rgba(100,50,255,0.5)'
ctx.fillRect(75, 100, 20, 300);
*/

/*
Episode 2, create figures (Rectangles, Lines, Arcs)
*/
/* Uncomment Ep 2
//Line
ctx.beginPath();
ctx.moveTo(50,300);
ctx.lineTo(300,100);
ctx.lineTo(50,100)
ctx.strokeStyle = "#fa54b3";
ctx.stroke();

//Arc or circle
ctx.beginPath();
ctx.strokeStyle = "#fa54b3";
ctx.fillStyle = 'rgba(100,50,255,0.5)';
ctx.arc(200,300,30,0,Math.PI*2,false);
ctx.fill();
ctx.stroke();

//Combined with a for loop
for (var i = 0; i < 5; i++) {
  var x = Math.random() * window.innerWidth;
  var y = Math.random() * window.innerHeight;
  var radius = Math.random() * i * 10;
  var r,g,b,alpha;
  r = 255*Math.random();
  g = 255*Math.random();
  b = 255*Math.random();
  alpha = Math.random();
  ctx.beginPath();
  ctx.strokeStyle = "#d4f5b2";
  ctx.fillStyle = 'rgba('+r+','+g+','+b+','+alpha+')';
  ctx.arc(x,y,radius,0,Math.PI*2,false);
  ctx.fill();
  ctx.stroke();
}
*/

/*
Episode 3, animation
*/

/*Initial Hardcoded circle
ctx.beginPath();
ctx.strokeStyle = "#d4f3b2";
ctx.fillStyle = 'rgba('+r+','+g+','+b+','+alpha+')';
ctx.arc(x,y,radius,0,Math.PI*2,false);
ctx.fill();
ctx.stroke();

if (x + radius > innerWidth || x - radius < 0) {
  dx = -1*dx;
}

if (y + radius > innerHeight || y - radius < 0) {
  dy = -1*dy;
}

x+=dx;
y+=dy;


//Size
var radius = Math.random() * 100;

//Initial Location
var x = (Math.random() * (window.innerWidth - 2*radius)) + radius;
var y = (Math.random() * (window.innerHeight - 2*radius)) + radius;

//Colors
var r,g,b,alpha;
r = 255*Math.random();
g = 255*Math.random();
b = 255*Math.random();
alpha = Math.random();

dx = 5; //Speed
dy = 4;

//Random Speed
var dxy = Math.ceil(Math.random()*10);
*/

//Personal random color
var randColorRGBA =  function(){
    var r,g,b,alpha;
    r = 255*Math.random();
    g = 255*Math.random();
    b = 255*Math.random();
    alpha = Math.random();
    return 'rgba('+r+','+g+','+b+','+alpha+')';
}

//Circle Class for the Canvas
function Circle(x,y,radius){
  this.radius = radius;
  this.x = x;
  this.y = y;

  this.maxRadius = radius;

  this.dx = 1;
  this.dy = 1;

  this.fill = 'white';
  this.stroke = 'black';

  this.strokeTemp = 'black';

  this.touched = false;

  this.setSpeed = function(v){
    this.dx = v;
    this.dy = v;
  }

  this.setColors = function(fill,stroke){
     this.fill = fill;
     this.stroke = stroke;
     this.strokeTemp = stroke;
  }

  this.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    ctx.strokeStyle = this.stroke;
    ctx.fillStyle = this.fill;
    ctx.fill();
    ctx.stroke();
    //console.log('Position is x,y,radius',this.x,this.y,this.radius);
  }

  this.update =function(){
    this.draw()

    if (this.x + this.radius >
      window.innerWidth || this.x - this.radius < 0) {
      this.dx = -1*this.dx;
    }

    if (this.y + this.radius >
      window.innerHeight || this.y - this.radius < 0) {
      this.dy = -1*this.dy;
    }

    this.x+=this.dx;
    this.y+=this.dy;

    //interaction
    if(Math.sqrt(
      Math.pow((mouse.x - this.x),2)+
      Math.pow((mouse.y - this.y),2)) < this.radius){
        this.touched = true;
        this.stroke = 'red';
    }
    else {
      if (this.touched) {
        this.stroke = this.strokeTemp;
      }
    }
  }
}

function House(size){
  this.size = size;

  this.fill = 'brown';
  this.stroke = 'black';

  this.setColors = function(fill,stroke){
     this.fill = fill;
     this.stroke = stroke;
  }

  this.draw = function(){

    ctx.strokeStyle = this.stroke;
    ctx.fillStyle = this.fill;

    // Set line width
    ctx.lineWidth = 5;

    // Wall
    ctx.strokeRect(75 * this.size, 140 * this.size, 150 * this.size, 110 * this.size);

    // Door
    ctx.fillRect(130 * this.size, 190 * this.size, 40 * this.size, 60 * this.size);

    // Roof
    ctx.beginPath();
    ctx.moveTo(50  * this.size, 140  * this.size);
    ctx.lineTo(150 * this.size, 60  * this.size);
    ctx.lineTo(250 * this.size, 140 * this.size);
    ctx.closePath();
    ctx.stroke();
  }
}

var circles = [];

for (var i = 0; i < 10; i++) {
  var radius = Math.random() * 100;

  //Initial Location
  var x = (Math.random() * (window.innerWidth - 2*radius)) + radius;
  var y = (Math.random() * (window.innerHeight - 2*radius)) + radius;

  //Colors
  var r,g,b,alpha;
  r = 255*Math.random();
  g = 255*Math.random();
  b = 255*Math.random();
  alpha = Math.random();

  //Random Speed
  var dxy = Math.ceil(Math.random()*10);

  circles.push(new Circle(x,y,radius));
  circles[i].setSpeed(dxy);
  circles[i].setColors(randColorRGBA(),randColorRGBA());
}

/*
Episode 4, interaction by listeners
*/
var mouse = {
  x: undefined,
  y: undefined
}
//Add the listener (type of listener,
//reaction as function (with an event), )
window.addEventListener('mousemove',
  function(event){
    mouse.x = event.x;
    mouse.y = event.y;
  }
)

var casa = new House(2);

//Moving a circle
function animate(){
  requestAnimationFrame(animate);

  ctx.clearRect(0,0,innerWidth, innerHeight);

  for (var i = 0; i < circles.length; i++) {
    circles[i].update();
  }
  casa.draw();

  console.log('Animation started');
}

animate();
