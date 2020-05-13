var jud=false;

function judge(){

    if(rotcircle.stop && rotcircle1.stop){
    if(rotcircle.score>rotcircle1.score){
        jud=true
        winMusic.play()

        canvas2Winner();
        canvas1Loss();
    }
    if(rotcircle.score<rotcircle1.score){
      jud=true
      winMusic.play()


        canvas1Winner();
        canvas2Loss();
    }
    if(rotcircle.score===rotcircle1.score){
      jud=true
      canvas1Tie();
      canvas2Tie();

    }
    console.log(rotcircle.score,rotcircle1.score);
    if(jud){
      clearInterval(j);
    }

}
}
var winMusic=new Audio("Winning-sound-effect.mp3");
var j;
function canvas1Winner(){
    ctx2.font = "800 80px Comic Sans MS";
  ctx2.fillStyle='#ffeb99';
  ctx2.textAlign = "center";
  ctx2.fillText("YOU WON", canvas.width/2, canvas.height/4);
}
function canvas1Tie(){
  ctx2.font = "800 80px Comic Sans MS";
  ctx2.fillStyle='#ffeb99';
  ctx2.textAlign = "center";
  ctx2.fillText("TIE", canvas.width/2, canvas.height/4);
}
function canvas2Tie(){
  ctx.font = "800 80px Comic Sans MS";
  ctx.fillStyle='#ffeb99';
  ctx.textAlign = "center";
  ctx.fillText("TIE", canvas.width/2, canvas.height/4);
}
function canvas2Winner(){

  ctx.font = "800 80px Comic Sans MS";
  ctx.fillStyle='#ffeb99';
  ctx.textAlign = "center";
  ctx.fillText("YOU WON", canvas.width/2, canvas.height/4);
}
function canvas1Loss(){
    ctx2.font = "800 80px Comic Sans MS";
    ctx2.fillStyle='#ffeb99';
    ctx2.textAlign = "center";
    ctx2.fillText("YOU LOST", canvas.width/2, canvas.height/4);
}
function canvas2Loss(){
ctx.font = "800 80px Comic Sans MS";
  ctx.fillStyle='#ffeb99';
  ctx.textAlign = "center";
  ctx.fillText("YOU LOST", canvas.width/2, canvas.height/4);
}
function tie(){
    ctx.font = "800 80px Comic Sans MS";
  ctx.fillStyle='#ffeb99';
  ctx.textAlign = "center";
  ctx.fillText("TIE", canvas.width/2, canvas.height/4);
}
// (function judgement(){
// j=setInterval(judge,100);

// }());