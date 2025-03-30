let gameSeq=[];
let userSeq=[];
let started=false;
let level=0;
let btns=["red","green","yellow","pink"];
let h3=document.querySelector("h3");
let bestScore=0;
let score=0;
document.addEventListener("keypress",function(){
        if(started==false){
            console.log("game started");
            started=true;
            levelUp();
        }
  });

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },400);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}
function levelUp() {
    userSeq=[];
    level++;
    h3.innerText=`Level ${level}`
    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameFlash(randBtn);
    //console.log(randIdx);
    //console.log(randColor);
    //console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);

}
function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp(),1000);
        }
    }
    else {
        score=level*2;
        bestScore=Math.max(bestScore,score);
        h3.innerHTML=`Game Over! <b>Your Score was ${level*2}</b><br>Your Best Score ${bestScore}.<br> Press any key to start the game.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset(); 
    }
}
function btnPress(){
    //console.log(this);
    let btn=this;
    userFlash(btn);
    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    //console.log(userSeq);
    checkAns(userSeq.length-1);
}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    userSeq=[];
    gameSeq=[];
    level=0;
    started=false;
    score=0;
}