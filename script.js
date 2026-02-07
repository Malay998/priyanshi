const basket = document.getElementById("basket");
const startBtn = document.getElementById("startBtn");
const scoreNumber = document.getElementById("scoreNumber");

let score = 0;
let target = 15;
let loop;

/* CENTER BASKET */
basket.style.left = (window.innerWidth/2 - 40) + "px";

/* POINTER MOVE */
window.addEventListener("pointermove",(e)=>{
basket.style.left = (e.clientX - 40) + "px";
});

/* START */
startBtn.onclick = () => {
document.getElementById("start").style.display="none";
loop = setInterval(spawnHeart,650);
};

/* SPAWN HEART */
function spawnHeart(){

let heart = document.createElement("div");
heart.className="heart";
heart.innerHTML="💖";

heart.style.left = Math.random()*window.innerWidth + "px";
heart.style.top = "-40px";

document.getElementById("game").appendChild(heart);

let fall = setInterval(()=>{

heart.style.top = (heart.offsetTop+5)+"px";

/* COLLISION */
if(collide(basket,heart)){
score++;
updateCounter();
burstParticles(heart.offsetLeft,heart.offsetTop);

heart.remove();
clearInterval(fall);

if(score>=target) winGame();
}

if(heart.offsetTop>window.innerHeight){
heart.remove();
clearInterval(fall);
}

},16);
}

/* COUNTER UPDATE */
function updateCounter(){
scoreNumber.innerText = score;

scoreNumber.classList.remove("counterHit");
void scoreNumber.offsetWidth;
scoreNumber.classList.add("counterHit");

flashScreen();
}

/* COLLISION */
function collide(a,b){
let ar=a.getBoundingClientRect();
let br=b.getBoundingClientRect();
return !(ar.top>br.bottom || ar.bottom<br.top || ar.right<br.left || ar.left>br.right);
}

/* PARTICLE BURST */
function burstParticles(x,y){

for(let i=0;i<12;i++){
let p=document.createElement("div");

p.innerHTML="✨";
p.style.position="fixed";
p.style.left=x+"px";
p.style.top=y+"px";
p.style.pointerEvents="none";

document.body.appendChild(p);

let dx=(Math.random()-0.5)*200;
let dy=(Math.random()-0.5)*200;

p.animate([
{ transform:"translate(0,0)", opacity:1 },
{ transform:`translate(${dx}px,${dy}px)`, opacity:0 }
],{ duration:700 });

setTimeout(()=>p.remove(),700);
}
}

/* SCREEN FLASH */
function flashScreen(){
let f=document.createElement("div");
f.id="flash";
document.body.appendChild(f);

f.animate([
{opacity:.6},
{opacity:0}
],{duration:250});

setTimeout(()=>f.remove(),250);
}

/* WIN */
function winGame(){
clearInterval(loop);
document.getElementById("final").style.display="flex";
}
