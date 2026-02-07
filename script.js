/* =========================
   ELEMENTS
========================= */

const basket = document.getElementById("basket");
const startBtn = document.getElementById("startBtn");
const scoreNumber = document.getElementById("scoreNumber");

/* FINAL SCREEN ELEMENTS */
let final = document.getElementById("final");

/* =========================
   GAME SETTINGS
========================= */

let score = 0;
let target = 15;
let loop;

/* =========================
   INITIAL POSITION
========================= */

basket.style.left = (window.innerWidth/2 - 40) + "px";

/* =========================
   POINTER MOVE CONTROL
========================= */

window.addEventListener("pointermove",(e)=>{
basket.style.left = (e.clientX - 40) + "px";
});

/* =========================
   START GAME
========================= */

startBtn.onclick = () => {

document.getElementById("start").style.display="none";

startBackgroundParticles();

loop = setInterval(spawnHeart,650);
};

/* =========================
   SPAWN HEARTS
========================= */

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
screenShake();

heart.remove();
clearInterval(fall);

if(score>=target) winGame();
}

/* REMOVE IF MISSED */
if(heart.offsetTop>window.innerHeight){
heart.remove();
clearInterval(fall);
}

},16);
}

/* =========================
   COUNTER UPDATE
========================= */

function updateCounter(){

scoreNumber.innerText = score;

scoreNumber.classList.remove("counterHit");
void scoreNumber.offsetWidth;
scoreNumber.classList.add("counterHit");

flashScreen();
}

/* =========================
   COLLISION DETECTION
========================= */

function collide(a,b){
let ar=a.getBoundingClientRect();
let br=b.getBoundingClientRect();

return !(ar.top>br.bottom || ar.bottom<br.top || ar.right<br.left || ar.left>br.right);
}

/* =========================
   PARTICLE BURST
========================= */

function burstParticles(x,y){

for(let i=0;i<12;i++){

let p=document.createElement("div");

p.innerHTML="✨";
p.style.position="fixed";
p.style.left=x+"px";
p.style.top=y+"px";
p.style.pointerEvents="none";
p.style.fontSize="20px";

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

/* =========================
   SCREEN FLASH
========================= */

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

/* =========================
   SCREEN SHAKE
========================= */

function screenShake(){

document.body.animate([
{ transform:"translate(0,0)" },
{ transform:"translate(-10px,5px)" },
{ transform:"translate(10px,-5px)" },
{ transform:"translate(0,0)" }
],{ duration:300 });

}

/* =========================
   BACKGROUND LOVE PARTICLES
========================= */

function startBackgroundParticles(){

setInterval(()=>{

let p = document.createElement("div");
p.innerHTML="💗";

p.style.position="fixed";
p.style.left=Math.random()*window.innerWidth+"px";
p.style.top=window.innerHeight+"px";
p.style.opacity=.3;
p.style.fontSize=(20+Math.random()*40)+"px";
p.style.pointerEvents="none";

document.body.appendChild(p);

p.animate([
{ transform:"translateY(0)", opacity:.3 },
{ transform:"translateY(-120vh)", opacity:0 }
],{ duration:8000 });

setTimeout(()=>p.remove(),8000);

},300);

}

/* =========================
   WIN GAME
========================= */

function winGame(){

clearInterval(loop);

final.style.display="flex";

startRomanticEnding();
}

/* =========================
   ROMANTIC ENDING
========================= */

function startRomanticEnding(){

let text = `
From the moment I met you,
something inside me changed.

You are not just special to me...
You are my safe place.
My peace.
My happiness.

If I could choose again,
I would still choose you,
In every lifetime.

I love you. ❤️
`;

typeWriter(text, document.getElementById("romanticText"), 40);

setTimeout(showLovePhoto, 7000);

setInterval(spawnRoses, 400);
}

/* =========================
   TYPEWRITER TEXT
========================= */

function typeWriter(text, element, speed){

element.innerHTML="";
let i = 0;

function typing(){

if(i < text.length){
element.innerHTML += text.charAt(i);
i++;
setTimeout(typing, speed);
}

}

typing();
}

/* =========================
   SHOW PHOTO
========================= */

function showLovePhoto(){

let photo = document.getElementById("lovePhoto");

if(photo){
photo.style.opacity = 1;
photo.style.transform = "scale(1)";
}

}

/* =========================
   FLOATING ROSES
========================= */

function spawnRoses(){

let rose = document.createElement("div");

rose.innerHTML = "🌹";
rose.style.position="fixed";
rose.style.left = Math.random()*window.innerWidth + "px";
rose.style.bottom = "-50px";
rose.style.fontSize = "40px";
rose.style.pointerEvents="none";

document.body.appendChild(rose);

rose.animate([
{ transform:"translateY(0)", opacity:1 },
{ transform:"translateY(-120vh)", opacity:0 }
],{ duration:6000 });

setTimeout(()=>rose.remove(),6000);
}
