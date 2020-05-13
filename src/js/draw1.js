const canvas2 = document.querySelector(".canvas2");
const ctx2 = canvas2.getContext("2d");
const KEY_W=87;

var pressedGas1=false;
var pilot1 = new Pilot1();
var rotcircle1 = new Circle1();
var t=0;
var l=rotcircle1.score.length;
var store=false;
var pause1=false;
var power11=false;
var tpower11=0;
var power21=false;
var intTime1=0;
store=window.localStorage.getItem('condition');


(function setup(){
  var time1=setInterval(()=>{
    ctx2.clearRect(0,0,canvas.width,canvas.height);
    rotcircle1.draw();
    pilot1.draw();
    instDisplay1();
    if(!pause1){
    rotcircle1.rotate();
      if(!power11){
    rotcircle1.checkCollision();
    }
    
    document.addEventListener('keydown',keypressed1);
    if(pressedGas1===true){
      rotcircle1.moveUp()
  } 
    t=t+1;
  }
  if(pause1){
    pauseDisplay1();
  }
  if(power11){
    powerTimer11();
  }
    if(rotcircle1.stop){
      if(store){
        console.log(store);
        rotcircle1.scores.push(rotcircle1.score);
        window.localStorage.setItem('condition',store);
        window.localStorage.setItem('userScore',rotcircle1.scores);

        clearInterval(time1);
        gameOverDisplay1();
        rotcircle1.scores=window.localStorage.getItem('userScore')
        console.log(rotcircle1.scores);

      }
      else{
        
        store=true;
        rotcircle1.scores.push(rotcircle1.score);
        window.localStorage.setItem('condition',store);
        window.localStorage.setItem('userScore',rotcircle1.scores);

        clearInterval(time1);
        gameOverDisplay1();
        rotcircle1.scores=window.localStorage.getItem('userScore')
        console.log(rotcircle1.scores);


      }
      
    }
  },100)

}());
(function afterGame1(){
  var interval=0;
  setInterval(()=>{
  if(rotcircle1.stop){
    ctx2.clearRect(0,0,canvas2.width,canvas2.height);
    gameOverDisplay1();
    rotcircle1.scoresPrint();
    if(interval<6){
    clicked1(pilot1.x1,pilot1.y1);
    }
    judge();

    interval++
  }
},100)
}());
function instDisplay1(){
  if(intTime1<=100){
  ctx2.font = "20px Comic Sans MS";
  ctx2.fillStyle='#ffeb99';
  ctx2.textAlign = "center";
  ctx2.fillText("Press W rapidly to make the ball bounce", canvas2.width/2, canvas2.height*0.7);
  ctx2.font = "20px Comic Sans MS";
  ctx2.fillStyle='#ffeb99';
  ctx2.textAlign = "center";
  ctx2.fillText("U can use a spl power once by pressing A", canvas2.width/2, canvas2.height*0.7+50);
  }
  intTime1++;
  
}
function powerTimer11(){
  tpower11++
  if(tpower11>=100){
    power11=false;
  }
  ctx2.font = " 50px Comic Sans MS";
  ctx2.fillStyle='white';
  ctx2.textAlign = "center";
  ctx2.fillText(10-Math.round(tpower11/10), canvas2.width/2, 50);
  ctx2.font = "80px Comic Sans MS";
  ctx2.fillStyle='#ffeb99';
  ctx2.textAlign = "center";
  ctx2.fillText("POWER UP", canvas.width/2, canvas.height/2);
}

document.addEventListener('keydown',function(evt){
  if(evt.keyCode==65){
    power11=true; 
  }
  if(evt.keyCode==68){
    power21=true;
  }
});
function gameOverDisplay1(){
  ctx2.font = "800 80px Comic Sans MS";
  ctx2.fillStyle='#ffeb99';
  ctx2.textAlign = "center";
  ctx2.fillText("GAME OVER", canvas.width/2, canvas.height/2);
}
function pauseDisplay1(){
  ctx2.font = "800 60px Comic Sans MS ";
  ctx2.fillStyle='#ffeb99';
  ctx2.textAlign = "center";
  ctx2.fillText("PAUSE", 300, 90);
}
function keypressed1(evt){
	if(evt.keyCode===KEY_W){
	pressedGas1=true;
  }
  if(evt.keyCode===KEY_SPACE){
    if(pause1){
      pause1=false
    }
    else{
      pause1=true;

    }
  }
	
}

function keyreleased1(evt){
	if(evt.keyCode===KEY_W){
	pressedGas1=false;
  }
  
}

