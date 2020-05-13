function changeColorCircle(x,y){
  r=20;
  // color=["#f40552","#dd7631","#916dd5","#b2ebf2"]
  // for (var i=0;i<4;i++){
    ctx.beginPath();
    ctx.strokeStyle="#ffffff";
    ctx.arc(x,y, r, 0, 2 * Math.PI);
    ctx.fillStyle="#ffffff";
    ctx.fill();
    ctx.stroke();
    r-=5;
  // }
  
}
function highScoreDisplay(){
  ctx.font = "60px Comic Sans MS";
  ctx.fillStyle='#fec771';
  ctx.textAlign = "center";
  ctx.fillText("New Highscore!!!", canvas.width/2, 120);
}
function arrCheck(a,b){
  f=0
  if(a.length!=b.length){
      f=0
  }
  else{
      for (var i=0;i<a.length;i++){
          if(a[i]!=b[i]){
              f=0
              break
          }
          else{
              f=1
          }
      }
  }
  if(f==1){
      return 1
  }
  else{
      return 0
  }

}

function lines(x,y,degrees){
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(degrees);
  ctx.translate(-x,-y)
  ctx.lineWidth = 27.5;
  ctx.beginPath();
  ctx.strokeStyle = "#dd7631";
  ctx.moveTo(x-80,y+80);
  ctx.lineTo(x+80,y+80)
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "#f40552";
  ctx.moveTo(x+80,y+80);
  ctx.lineTo(x+80,y-80)
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "#916dd5";
  ctx.moveTo(x+80,y-80);
  ctx.lineTo(x-80,y-80)
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "#b2ebf2";
  ctx.moveTo(x-80,y-80)
  ctx.lineTo(x-80,y+80)
  ctx.stroke();


  ctx.restore();
}

function drawcircle(x,y,deg){

  ctx.beginPath();
  ctx.lineWidth = 27.5;
  ctx.strokeStyle = "#f40552";
  ctx.arc(x, y, 90, deg, deg+0.5*Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.lineWidth = 27.5;
  ctx.strokeStyle = "#dd7631";
  ctx.arc(x, y, 90, deg+0.5*Math.PI,deg+1*Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.lineWidth = 27.5;
  ctx.strokeStyle = "#916dd5";
  ctx.arc(x, y, 90, deg+1*Math.PI,deg+1.5*Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.lineWidth = 27.5;
  ctx.strokeStyle = "#b2ebf2";
  ctx.arc(x, y, 90, deg+1.5*Math.PI, deg+2*Math.PI);
  ctx.stroke();

}
function drawStar(x,y){
  ctx.font = "40px Comic Sans MS";
  ctx.fillStyle='white';
  ctx.textAlign = "center";
  ctx.fillText("★", x, y+15);
}


function Circle(){

  this.x=canvas.width/2;
  this.y=canvas.height/2;
  this.x1=canvas.width/2;
  this.y1=0;
  this.deg=0;
  this.obstacles=[];
  var d = pilot.y1-canvas.height/2;
  this.stop =false;
  var inside=false;
  var ind=0;
  this.score=0;
  this.scores=[0];
  this.obstacles[0]={x:this.x,y:this.y,deg:this.deg,star:true,ccolor:true,type:'circle'};
  var change;
  var tc=false;
  var newHighScore=true;
  var newHighScoreDisplayTime=0;
  this.highScore=0;
  var initVelocity=30;
  var gAcc=-10;
  var ccc=true;
  var highscoreMusic=new Audio("public/assets/220206__gameaudio__beep-space-button.wav");
  var gameoverMusic=new Audio("public/assets/beep-03.mp3");

  store=window.localStorage.getItem('condition')
  if(store){
    this.scores=window.localStorage.getItem('userScore').split(',')

    

  }
  this.draw=function(){

    for(var i=0;i<this.obstacles.length;i++){
      if(this.obstacles[i].type==='circle'){
      drawcircle(this.obstacles[i].x,this.obstacles[i].y,this.obstacles[i].deg);
      }
      else{
      lines(this.obstacles[i].x,this.obstacles[i].y,this.obstacles[i].deg)
      }
      if(this.obstacles[i].star){
        drawStar(this.obstacles[i].x,this.obstacles[i].y);
      }
      if(this.obstacles[i].ccolor){
      change=this.obstacles[i].y-d/2;
      changeColorCircle(this.obstacles[i].x,change)
      }
      this.highScoreUpdate();
      this.scoresPrint();

    
  }
    
  }
  this.highScoreUpdate=function(){
    for (var i=0;i<this.scores.length;i++){
      this.scores[i]=parseInt(this.scores[i])
    }
    this.scores=this.scores.sort(function(a, b){return a - b});
    this.highScore=this.scores[this.scores.length-1];
    if(this.score>this.highScore){
      this.highScore=this.score;
      if(newHighScore){
      highScoreDisplay();
      newHighScoreDisplayTime+=1
      if(newHighScoreDisplayTime===15){
        newHighScore=false;

      }
      }
    }
  }
  

  this.scoresPrint=function(){
    ctx.font = "25px Comic Sans MS";
    ctx.fillStyle='white';
    ctx.textAlign = "center";
    ctx.fillText("score:"+this.score, 100, 50);
    ctx.font = "25px Comic Sans MS";
    ctx.fillStyle='white';
    ctx.textAlign = "center";
    ctx.fillText("High Score:"+this.highScore,canvas.width-100, 50);
  }
  this.rotate=function(){
    for(var i =0;i<this.obstacles.length;i++){

      this.obstacles[i].deg +=2*(i+1)*Math.PI/180
      if(this.obstacles[i].deg>2*Math.PI){
        this.obstacles[i].deg=0;
      }
    }
  }

  this.checkCollision=function(){
    
    if((this.obstacles[ind].y-pilot.y1)<=10 && (this.obstacles[ind].y-pilot.y1)>=0){
      this.obstacles[ind].star=false;
    }
    if(ind >=1 && this.obstacles[ind-1].y-d/2-pilot.y1>=0 && this.obstacles[ind-1].y-d/2-pilot.y1<=10 && !tc){
      tc=true;
      pilot.a=Math.round(Math.random()*3);
      ccc=false;
    }
    else{
      tc=false;
      ccc=true;
    }
    if((this.obstacles[ind].y-pilot.y1)>-80 && (this.obstacles[ind].y-pilot.y1)<120){
      inside=true;
    }
    else{
      inside=false;
    }
  
    if((this.obstacles[ind].y-pilot.y1)<=80 && (this.obstacles[ind].y-pilot.y1)>=50){
      ind++;
    }
    if(!(ind >=1 && this.obstacles[ind-1].y-d/2-pilot.y1>=-50 && this.obstacles[ind-1].y-d/2-pilot.y1<=20 && !tc)){
    var c=ctx.getImageData(pilot.x1,pilot.y1-35,1,1).data;
    var sidesR=ctx.getImageData(pilot.x1+34,pilot.y1,1,1).data;
    var sidesL=ctx.getImageData(pilot.x1-34,pilot.y1,1,1).data;

    var p=ctx.getImageData(pilot.x1,pilot.y1,1,1).data;
    var k=[0,0,0,0]
    var st1=[255,255,255,199]
    var st=[255,255,255,255];
    var colorChanger=[244,252,193,255];
    // console.log(c,sidesL,sidesR,p);

        if(!arrCheck(c,k) && !arrCheck(p,st) &&!arrCheck(c,st1) &&!arrCheck(p,k) && !arrCheck(c,st) &&!arrCheck(c,colorChanger)  ){
        if(arrCheck(c,p) && arrCheck(sidesR,p) ){
          // console.log(c,p);

            // console.log('collision');
      
        }
        
        if(!arrCheck(c,p)  ){
          console.log(c,p);
            hit=true
            this.stop=true ; 
            gameoverMusic.play();  
            gameOverDisplay();
      
          
        }
        // if(arrCheck(c,colorChanger)){
        //   console.log('color changer');
          
        //   pilot.a=Math.round(Math.random()*3);
        // }
    
    }
    if( !arrCheck(p,st) &&!arrCheck(c,st1) &&!arrCheck(p,k) && !arrCheck(c,st) &&!arrCheck(c,colorChanger) && !arrCheck(sidesR,k) && !arrCheck(sidesL,k) ){
      if(arrCheck(c,p) && arrCheck(sidesR,p) ){
        // console.log(c,p);

          // console.log('collision');
    
      }
      
      if( !arrCheck(sidesR,p) || !arrCheck(sidesL,p) ){
        // console.log(c,p);
        hit=true
          this.stop=true ;    
          gameoverMusic.play();    
          gameOverDisplay();
     
       
      }
      // if(arrCheck(c,colorChanger)){
      //   console.log('color changer');
        
      //   pilot.a=Math.round(Math.random()*3);
      // }
  
  }
  }
  }

  this.moveUp=function(){
    console.log(power1);
    
    this.scoresPrint();
      highscoreMusic.play();

    if(pressedGas && !this.stop){
      this.scoresPrint();

      this.score=this.score+1;
      if(this.obstacles[this.obstacles.length-1].y > d){
        if(this.obstacles.length%2==0  ){
        this.obstacles.push({x:this.x1,y:this.y1,deg:this.deg,star:true,ccolor:true,type:'square'})

        }
        else{
          this.obstacles.push({x:this.x1,y:this.y1,deg:this.deg,star:true,ccolor:true,type:'circle'})
        }
      }
      for(var i=0;i<this.obstacles.length;i++){
        if(!power1){
        this.checkCollision();
        }
        pilot.y1-=initVelocity;
        initVelocity+=gAcc;
        this.obstacles[i].y+=10;

        if(initVelocity<-30){
          pressedGas=false;
          initVelocity=30
      }

      }
    }

  }
  this.moveDown=function(){
    if(!pressedGas && !this.stop){
      for(var j=0;j<this.obstacles.length;j++){
        this.obstacles[j].y-=10;
      }
    }
  }
  
  
 
}
