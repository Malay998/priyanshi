const basket = document.getElementById("basket");
const startBtn = document.getElementById("startBtn");
const scoreNumber = document.getElementById("scoreNumber");

const imageScene = document.getElementById("imageScene");
const loveImage = document.getElementById("loveImage");
const forwardBtn = document.getElementById("forwardBtn");

const storyScene = document.getElementById("storyScene");
const storyText = document.getElementById("storyText");

let score = 0;
let target = 15;
let loop;

/* CENTER BASKET */
basket.style.left = (window.innerWidth/2 - 40) + "px";

/* TOUCH MOVE */
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

if(collide(basket,heart)){
score++;
scoreNumber.innerText = score;
heart.remove();
clearInterval(fall);

if(navigator.vibrate) navigator.vibrate(30);

if(score >= target){
winGame();
}
}

if(heart.offsetTop > window.innerHeight){
heart.remove();
clearInterval(fall);
}

},16);
}

/* COLLISION */
function collide(a,b){
let ar=a.getBoundingClientRect();
let br=b.getBoundingClientRect();
return !(ar.top>br.bottom || ar.bottom<br.top || ar.right<br.left || ar.left>br.right);
}

/* WIN */
function winGame(){
clearInterval(loop);
document.getElementById("game").style.display="none";
document.getElementById("megaCounter").style.display="none";
startImageScene();
}

/* IMAGE SCENE */
function startImageScene(){
imageScene.style.display="flex";

setTimeout(()=>{
loveImage.style.opacity=1;
loveImage.style.transform="scale(1)";
},500);

setTimeout(()=>{
forwardBtn.style.opacity=1;
},3000);
}

/* FORWARD CLICK */
forwardBtn.onclick = () => {
imageScene.style.display="none";
startStoryScene();
};

/* STORY SCENE */
function startStoryScene(){
storyScene.style.display="flex";

const story = `
From the moment I saw you,
something inside me changed.

You became my calm,
my chaos,
my happiness,
my weakness.

And if I had to live this life again…
I would still choose you.
`;

typeWriter(story);
}

/* TYPEWRITER */
function typeWriter(text){
let i=0;
let speed=40;

function typing(){
if(i < text.length){
storyText.innerHTML += text.charAt(i);
i++;
setTimeout(typing,speed);
}
}

typing();
}
