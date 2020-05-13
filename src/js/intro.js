const canv = document.querySelector(".intro");
const ctx1 = canv.getContext("2d");

var deg1=0;
var deg2=0;
var deg3=0;
var deg4=0;
var deg5=0;
var factor=15*Math.PI/180;
var flagplay=false;
var bgsound=document.getElementById('bgm')
var clickSound= new Audio("public/assets/220206__gameaudio__beep-space-button.wav")
var players;
// ctx1.fillStyle='#ffeb99';
// ctx1.textAlign = "center";
// ctx1.fillText("GAME OVER", canvas.width/2, canvas.height/2);
var timer=0;
canv.addEventListener('click', checkStart);
rect = {
    x: 382,
    y: 229,
    w: 45,
    h: 45
};
function checkStart(e) {
    var p = getMousePos(e);
    console.log(p);
    
    if (p.x >= rect.x && p.x <= rect.x + rect.w &&
        p.y >= rect.y && p.y <= rect.y + rect.h) {

        flagplay=true;
        clickSound.play();
        console.log(flagplay,p.x,p.y);
        
    }
}
function getMousePos(e) {
    var r = canv.getBoundingClientRect();
    return {
        x: e.clientX - r.left,
        y: e.clientY - r.top
    };
}
    // window.onload=function(){
    //   bgsound.play();
    //   bgsound.loop=true;
    // }

function texter(str, x, y){
    arr=["#f40552","#dd7631","#916dd5","#b2ebf2"];

    for(var j = 0; j <= str.length; ++j){
        var ch = str.charAt(j);
        ctx1.font = "800 100px Comic Sans MS";
        ctx1.fillStyle = arr[j%4];
        ctx1.fillText(ch, x, y);
        x += ctx1.measureText(ch).width;
    }
}
function drawButton(x,y){
    ctx1.font = "60px Comic Sans MS";
    ctx1.fillStyle='white';
    ctx1.textAlign = "center";
    ctx1.fillText("►", x, y);
}
function drawCircle(x,y,r,deg){

    ctx1.beginPath();
    ctx1.lineWidth = 15.5;
    ctx1.strokeStyle = "#f40552";
    ctx1.arc(x, y, r, deg, deg+0.5*Math.PI);
    ctx1.stroke();
    ctx1.beginPath();
    ctx1.lineWidth = 15.5;
    ctx1.strokeStyle = "#dd7631";
    ctx1.arc(x, y, r, deg+0.5*Math.PI,deg+1*Math.PI);
    ctx1.stroke();
    ctx1.beginPath();
    ctx1.lineWidth = 15.5;
    ctx1.strokeStyle = "#916dd5";
    ctx1.arc(x, y, r, deg+1*Math.PI,deg+1.5*Math.PI);
    ctx1.stroke();
    ctx1.beginPath();
    ctx1.lineWidth = 15.5;
    ctx1.strokeStyle = "#b2ebf2";
    ctx1.arc(x, y, r, deg+1.5*Math.PI, deg+2*Math.PI);
    ctx1.stroke();
    
}
function drawCircles(){
    drawCircle(400,250,65,deg1+factor)
    drawCircle(400,250,80,deg2+2*factor)
    drawCircle(400,250,95,deg3+3*factor)
    drawCircle(400,250,110,deg4+3*factor)
    drawCircle(400,250,125,deg5+3*factor)

    deg1+=10*Math.PI/180
    deg2-=8*Math.PI/180
    deg3+=6*Math.PI/180
    deg4-=4*Math.PI/180
    deg5+=3*Math.PI/180
}
(function setup(){
    texter('COLOR SWITCH',50,90);
    bgsound.play();
var introTime=setInterval(()=>{
    ctx.clearRect(0,0,canv.width,canv.height);
    drawCircles();
    timer++;
    drawButton(405,272);
    if(flagplay){
        if(document.getElementById('single').checked){
            players=1
        }
        else{
            players=2;
        }
        document.getElementById('intro').style.display='none';
        document.getElementById('players').style.display='none';
        if(players==1){
            document.getElementById('canvas').style.display='inline';
            document.getElementById('canvas').style.marginLeft='27.5%';

        }
        else{
            document.getElementById('canvas').style.display='inline';
            document.getElementById('canvas1').style.display='inline';

        }
        bgsound.pause();
        bgsound.currentTime=0;
        clearInterval(introTime);
    }
},100);
}());