
for(var i=0;i<document.querySelectorAll(".drum").length;i++){
    document.querySelectorAll(".drum")[i].addEventListener("click",function (){
        var it=this.innerHTML;
        makesound(it);
        buttonAnimation(it);
    });
}

document.addEventListener("keydown",function (event){
    var it=event.key;
    makesound(it);
    buttonAnimation(it);
});
function makesound(it){
    switch (it) {
        case 'w':
            var a=new Audio("sounds/tom-1.mp3");
            a.play();
            break;
        case 'a':
            var a=new Audio("sounds/tom-2.mp3");
            a.play();
            break;
        case 's':
            var a=new Audio("sounds/tom-3.mp3");
            a.play();
            break;
        case 'd':
            var a=new Audio("sounds/tom-4.mp3");
            a.play();
            break;
        case 'j':
            var a=new Audio("sounds/snare.mp3");
            a.play();
            break;
        case 'k':
            var a=new Audio("sounds/crash.mp3");
            a.play();
            break;
        case 'l':
            var a=new Audio("sounds/kick-bass.mp3");
            a.play();
            break;
        default:
            break;
    }
}

function buttonAnimation(i){
    var ab=document.querySelector("."+i);
    ab.classList.add("pressed");
    setTimeout(function (){
        ab.classList.remove("pressed");
    },100)
}