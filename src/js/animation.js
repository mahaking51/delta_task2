const requestAnimationFrame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;


const particlesPerExplosion = 15;
const particlesMinSpeed     = 1;
const particlesMaxSpeed     = 4;
const particlesMinSize      = 1;
const particlesMaxSize      = 5;
const explosions            = [];
const explosions1           =[];
let fps        = 70;
const interval = 1000 / fps;

let now, delta;
let then = Date.now();



function draw() {
  requestAnimationFrame(draw);

  now   = Date.now();
  delta = now - then;

  if (delta > interval) {

    then = now - (delta % interval);

    drawExplosion();

  }

}
function draw1() {
    requestAnimationFrame(draw1);
  
    now   = Date.now();
    delta = now - then;
  
    if (delta > interval) {
  
      then = now - (delta % interval);
  
      drawExplosion1();
  
    }
  
  }
  
function drawExplosion() {

  if (explosions.length === 0) {
    return;
  }

  for (let i = 0; i < explosions.length; i++) {

    const explosion = explosions[i];
    const particles = explosion.particles;

    if (particles.length === 0) {
      explosions.splice(i, 1);
      return;
    }

    const particlesAfterRemoval = particles.slice();
    for (let ii = 0; ii < particles.length; ii++) {

      const particle = particles[ii];

      if (particle.size <= 0) {
        particlesAfterRemoval.splice(ii, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, Math.PI * 2, 0, false);
      ctx.closePath();
      ctx.fillStyle = particle.color;
      ctx.fill();

      particle.x += particle.xv;
      particle.y += particle.yv;
      particle.size -= .1;
    }

    explosion.particles = particlesAfterRemoval;

  }

}

  function drawExplosion1() {

    if (explosions1.length === 0) {
      return;
    }
  
    for (let i = 0; i < explosions1.length; i++) {
  
      const explosion1 = explosions1[i];
      const particles1 = explosion1.particles1;
  
      if (particles1.length === 0) {
        explosions1.splice(i, 1);
        return;
      }
  
      const particlesAfterRemoval = particles1.slice();
      for (let ii = 0; ii < particles1.length; ii++) {
  
        const particle1 = particles1[ii];
  
        if (particle1.size <= 0) {
          particlesAfterRemoval.splice(ii, 1);
          continue;
        }
  
        ctx2.beginPath();
        ctx2.arc(particle1.x, particle1.y, particle1.size, Math.PI * 2, 0, false);
        ctx2.closePath();
        ctx2.fillStyle = particle1.color;
        ctx2.fill();
  
        particle1.x += particle1.xv;
        particle1.y += particle1.yv;
        particle1.size -= .1;
      }
  
      explosion1.particles1 = particlesAfterRemoval;
  
    }
  
  }
function drawBackground() {
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function clicked(xPos,yPos) {


  explosions.push(
    new explosion(xPos, yPos)
  );

}
function clicked1(xPos,yPos) {

    
      explosions1.push(
        new explosion1(xPos, yPos)
      );
    
    }

function explosion(x, y) {

  this.particles = [];

  for (let i = 0; i < particlesPerExplosion; i++) {
    this.particles.push(
      new particle(x, y)
    );
  }

}
function explosion1(x, y) {

    this.particles1 = [];
  
    for (let i = 0; i < particlesPerExplosion; i++) {
      this.particles1.push(
        new particle1(x, y)
      );
    }
  
  }
  function particle1(x, y) {
    arr=["#f40552","#dd7631","#916dd5","#b2ebf2"]
    this.x    = x;
    this.y    = y;
    this.xv   = randInt(particlesMinSpeed, particlesMaxSpeed, false);
    this.yv   = randInt(particlesMinSpeed, particlesMaxSpeed, false);
    this.size = randInt(particlesMinSize, particlesMaxSize, true);
    this.color=arr[Math.round(Math.random()*3)];
  
  }
function particle(x, y) {
  arr=["#f40552","#dd7631","#916dd5","#b2ebf2"]
  this.x    = x;
  this.y    = y;
  this.xv   = randInt(particlesMinSpeed, particlesMaxSpeed, false);
  this.yv   = randInt(particlesMinSpeed, particlesMaxSpeed, false);
  this.size = randInt(particlesMinSize, particlesMaxSize, true);
  this.color=arr[Math.round(Math.random()*3)];

}

function randInt(min, max, positive) {

  let num;
  if (positive === false) {
    num = Math.floor(Math.random() * max) - min;
    num *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
  } else {
    num = Math.floor(Math.random() * max) + min;
  }

  return num;

}


draw();
draw1();