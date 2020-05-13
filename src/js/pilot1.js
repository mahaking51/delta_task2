function Pilot1(){
    this.color=["#f40552","#dd7631","#916dd5","#b2ebf2"]
    this.x1=canvas.width*0.5
    this.y1=canvas.height*0.9
    this.speed=10;
      // this.a=Math.round(Math.random()*4);
    this.a=Math.round(Math.random()*3);
    // this.a=3;
    this.draw=function(){
      ctx2.beginPath();
      ctx2.strokeStyle=this.color[this.a];
      ctx2.arc(this.x1, this.y1, 17.5, 0, 2 * Math.PI);
      ctx2.fillStyle=this.color[this.a];
      ctx2.fill();
      ctx2.stroke();
      ctx2.fillStyle=this.color[this.a];
  
    }
    this.bounceDown=function(){
     
      this.y1-=this.speed;
      if(t%5==0){
        this.speed*=-1;
      }
   
    }
    
    
  }
  