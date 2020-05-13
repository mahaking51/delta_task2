const canvas = document.querySelector(".canvas1");
const ctx = canvas.getContext("2d");
const KEY_UP=38;
const KEY_SPACE=32;

var pressedGas=false;
var pilot = new Pilot();
var rotcircle = new Circle();
var t=0;
var store=false;
var pause=false;
var power1=false;
var tpower1=0;
var power2=false;
var intTime=0;
var hit=false;
store=window.localStorage.getItem('condition');

(function setup(){

  var time=setInterval(()=>{
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    rotcircle.draw();
    instDisplay();
    if(!rotcircle.stop){
      pilot.draw();
    }
    if(!pause){
    rotcircle.rotate();
    // rotcircle.scoresPrint();
    // rotcircle.highScoreUpdate();
if(!power1){
    rotcircle.checkCollision();
}
    
    document.addEventListener('keydown',keypressed);
    // document.addEventListener('keyup',keyreleased);
    if(pressedGas===true){
      rotcircle.moveUp()
  }
    if(!pressedGas){
      // rotcircle.moveDown()
      // pilot.bounceDown();
    }
    
    // console.log('hello');
    t=t+1;
  }
  if(pause){
    pauseDisplay();
  }
  if(power1){
    powerTimer1();
  }
  if(hit){
    console.log('game');
    
  }
    if(rotcircle.stop){
      if(store){
        console.log(store);
        rotcircle.scores.push(rotcircle.score);
        window.localStorage.setItem('condition',store);
        window.localStorage.setItem('userScore',rotcircle.scores);

        clearInterval(time);
        gameOverDisplay();

        rotcircle.scores=window.localStorage.getItem('userScore')
        console.log(rotcircle.scores);
      }
      else{
        // console.log(store);
        
        store=true;
        rotcircle.scores.push(rotcircle.score);
        window.localStorage.setItem('condition',store);
        window.localStorage.setItem('userScore',rotcircle.scores);

        clearInterval(time);
        gameOverDisplay();

        rotcircle.scores=window.localStorage.getItem('userScore')
        console.log(rotcircle.scores);

      }
      
    }
  },100)

}());
(function afterGame(){
  var interval=0;
  setInterval(()=>{
  if(rotcircle.stop){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    gameOverDisplay();
    rotcircle.scoresPrint();
    if(interval<6){
    clicked(pilot.x1,pilot.y1);
    }
    judge();
    interval++
  }
},100)
}());
function instDisplay(){
  if(intTime<=100){
  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle='#ffeb99';
  ctx.textAlign = "center";
  ctx.fillText("Press Arrow up rapidly to make the ball bounce", canvas.width/2, canvas.height*0.7);
  ctx.font = "20px Comic Sans MS";
  ctx.fillStyle='#ffeb99';
  ctx.textAlign = "center";
  ctx.fillText("U can use a spl power once by pressing left Arrow key", canvas.width/2, canvas.height*0.7+50);
  }
  intTime++;
  
}
function powerTimer1(){
  tpower1++
  if(tpower1>=100){
    power1=false;
  }
  ctx.font = " 50px Comic Sans MS";
  ctx.fillStyle='white';
  ctx.textAlign = "center";
  ctx.fillText(10-Math.round(tpower1/10), canvas.width/2, 50);console.log(tpower1);
  ctx.font = "80px Comic Sans MS";
  ctx.fillStyle='#ffeb99';
  ctx.textAlign = "center";
  ctx.fillText("POWER UP", canvas.width/2, canvas.height/2);
}
document.addEventListener('keydown',function(evt){
  if(evt.keyCode==37){
    power1=true; 
  }
  if(evt.keyCode==39){
    power2=true;
  }
  
  
  
  
  })
function gameOverDisplay(){
  ctx.font = "800 80px Comic Sans MS";
  ctx.fillStyle='#ffeb99';
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
}
function pauseDisplay(){
  ctx.font = "800 60px Comic Sans MS ";
  ctx.fillStyle='#ffeb99';
  ctx.textAlign = "center";
  ctx.fillText("PAUSE", 300, 90);
}
function keypressed(evt){
	if(evt.keyCode===KEY_UP){
	pressedGas=true;
  }
  if(evt.keyCode===KEY_SPACE){
    if(pause){
      pause=false
    }
    else{
      pause=true;

    }
  }
	
	// console.log(evt);
}

function keyreleased(evt){
	if(evt.keyCode===KEY_UP){
	pressedGas=false;
  }
  
	// console.log(evt);
}

