function changeColorCircle1(x,y){
    r=20;
    color=["#f40552","#dd7631","#916dd5","#b2ebf2"]
    for (var i=0;i<4;i++){
      ctx2.beginPath();
      ctx2.strokeStyle="#ffffff";;
      ctx2.arc(x,y, r, 0, 2 * Math.PI);
      ctx2.fillStyle="#ffffff";
      ctx2.fill();
      ctx2.stroke();
      r-=5;
    }
    
  }
  function highScoreDisplay1(){
    ctx2.font = "60px Comic Sans MS";
    ctx2.fillStyle='#fec771';
    ctx2.textAlign = "center";
    ctx2.fillText("New Highscore!!!", canvas.width/2, 120);
  }

  function lines1(x,y,degrees){
    ctx2.save();
    ctx2.translate(x,y);
    ctx2.rotate(degrees);
    ctx2.translate(-x,-y)
    ctx2.lineWidth = 27.5;
    ctx2.beginPath();
    ctx2.strokeStyle = "#dd7631";
    ctx2.moveTo(x-80,y+80);
    ctx2.lineTo(x+80,y+80)
    ctx2.stroke();
  
    ctx2.beginPath();
    ctx2.strokeStyle = "#f40552";
    ctx2.moveTo(x+80,y+80);
    ctx2.lineTo(x+80,y-80)
    ctx2.stroke();
  
    ctx2.beginPath();
    ctx2.strokeStyle = "#916dd5";
    ctx2.moveTo(x+80,y-80);
    ctx2.lineTo(x-80,y-80)
    ctx2.stroke();
  
    ctx2.beginPath();
    ctx2.strokeStyle = "#b2ebf2";
    ctx2.moveTo(x-80,y-80)
    ctx2.lineTo(x-80,y+80)
    ctx2.stroke();
  
  
    ctx2.restore();
  }
  

  function drawcircle1(x,y,deg){
  
    ctx2.beginPath();
    ctx2.lineWidth = 27.5;
    ctx2.strokeStyle = "#f40552";
    ctx2.arc(x, y, 90, deg, deg+0.5*Math.PI);
    ctx2.stroke();
    ctx2.beginPath();
    ctx2.lineWidth = 27.5;
    ctx2.strokeStyle = "#dd7631";
    ctx2.arc(x, y, 90, deg+0.5*Math.PI,deg+1*Math.PI);
    ctx2.stroke();
    ctx2.beginPath();
    ctx2.lineWidth = 27.5;
    ctx2.strokeStyle = "#916dd5";
    ctx2.arc(x, y, 90, deg+1*Math.PI,deg+1.5*Math.PI);
    ctx2.stroke();
    ctx2.beginPath();
    ctx2.lineWidth = 27.5;
    ctx2.strokeStyle = "#b2ebf2";
    ctx2.arc(x, y, 90, deg+1.5*Math.PI, deg+2*Math.PI);
    ctx2.stroke();
  
  }
  
  function drawStar1(x,y){
    ctx2.font = "40px Comic Sans MS";
    ctx2.fillStyle='white';
    ctx2.textAlign = "center";
    ctx2.fillText("★", x, y+15);
  }
  
  function Circle1(){
  
    this.x=canvas.width/2;
    this.y=canvas.height/2;
    this.x1=canvas.width/2;
    this.y1=0;
    this.deg=0;
    this.obstacles=[];
    var d = pilot1.y1-canvas.height/2;
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
    var highscoreMusic=new Audio("public/assets/220206__gameaudio__beep-space-button.wav");
    var gameoverMusic=new Audio("public/assets/beep-03.mp3");
    store=window.localStorage.getItem('condition')
    if(store){
      this.scores=window.localStorage.getItem('userScore').split(',')
      console.log(this.scores,store);
  
    }
    this.draw=function(){
      this.scoresPrint();

      for(var i=0;i<this.obstacles.length;i++){
        if(this.obstacles[i].type==='circle'){
        drawcircle1(this.obstacles[i].x,this.obstacles[i].y,this.obstacles[i].deg);
        }
        else{
          lines1(this.obstacles[i].x,this.obstacles[i].y,this.obstacles[i].deg);
        }
        if(this.obstacles[i].star){
          drawStar1(this.obstacles[i].x,this.obstacles[i].y);
        }
        if(this.obstacles[i].ccolor){
        change=this.obstacles[i].y-d/2;
        changeColorCircle1(this.obstacles[i].x,change)
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
        highScoreDisplay1();
        rotcircle.
        newHighScoreDisplayTime+=1
        if(newHighScoreDisplayTime===15){
          newHighScore=false;
  
        }
        }
      }
    }
  
    this.scoresPrint=function(){
      ctx2.font = "25px Comic Sans MS";
      ctx2.fillStyle='white';
      ctx2.textAlign = "center";
      ctx2.fillText("score:"+this.score, canvas.width-70, 50);
    
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
      if((this.obstacles[ind].y-pilot1.y1)<=10 && (this.obstacles[ind].y-pilot1.y1)>=0){
        this.obstacles[ind].star=false;
      }
      if(ind >=1 && this.obstacles[ind-1].y-d/2-pilot1.y1>=0 && this.obstacles[ind-1].y-d/2-pilot1.y1<=10 && !tc){
        tc=true;
        pilot1.a=Math.round(Math.random()*3);
      }
      else{
        tc=false;
      }
      
      if((this.obstacles[ind].y-pilot1.y1)>-80 && (this.obstacles[ind].y-pilot1.y1)<120){
        inside=true;
      }
      else{
        inside=false;
      }
     
      if((this.obstacles[ind].y-pilot1.y1)<=80 && (this.obstacles[ind].y-pilot1.y1)>=50){
        ind++;
      }
      if(!(ind >=1 && this.obstacles[ind-1].y-d/2-pilot1.y1>=-50 && this.obstacles[ind-1].y-d/2-pilot1.y1<=20 && !tc)){
      var c=ctx2.getImageData(pilot1.x1,pilot1.y1-35,1,1).data;
      var p=ctx2.getImageData(pilot1.x1,pilot1.y1,1,1).data;
      var sidesR=ctx2.getImageData(pilot1.x1+35,pilot1.y1,1,1).data;
      var sidesL=ctx2.getImageData(pilot1.x1-35,pilot1.y1,1,1).data;
  
      var k=[0,0,0,0]
      var st1=[255,255,255,199]
      var st=[255,255,255,255];
      var colorChanger=[244,252,193,255];

      if(!arrCheck(c,k) && !arrCheck(p,st) &&!arrCheck(c,st1) &&!arrCheck(p,k) && !arrCheck(c,st) &&!arrCheck(c,colorChanger)  ){
          if(arrCheck(c,p) ){
          }
          else{
            console.log(c,p);
  
              this.stop=true ;   
              gameoverMusic.play();        
          }
      

      }
      if( !arrCheck(p,st) &&!arrCheck(c,st1) &&!arrCheck(p,k) && !arrCheck(c,st) &&!arrCheck(c,colorChanger) && !arrCheck(sidesR,k) && !arrCheck(sidesL,k) ){
        
        if( !arrCheck(sidesR,p) || !arrCheck(sidesL,p) ){
  
            this.stop=true ;      
            gameoverMusic.play();        

        }
        
    
    }
    }
    }

    this.moveUp=function(){
      
    highscoreMusic.play();

    this.highScoreUpdate();
    this.scoresPrint();
    if(pressedGas1 && !this.stop){

      this.score=this.score+1;
      if(this.obstacles[this.obstacles.length-1].y > d){
        if(this.obstacles.length%2==0){
        this.obstacles.push({x:this.x1,y:this.y1,deg:this.deg,star:true,ccolor:true,type:'square'})

        }
        else{
          this.obstacles.push({x:this.x1,y:this.y1,deg:this.deg,star:true,ccolor:true,type:'circle'})
        }
      }
      for(var i=0;i<this.obstacles.length;i++){
        if(!power11){
        this.checkCollision();
        }
        pilot1.y1-=initVelocity;
        initVelocity+=gAcc;
        this.obstacles[i].y+=10;

        if(initVelocity<-30){
          pressedGas1=false;
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
  