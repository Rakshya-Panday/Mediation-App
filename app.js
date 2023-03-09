let song = document.querySelector(".song");
let play = document.querySelector(".play");
let outline = document.querySelector(".moving circle");
let video = document.querySelector(".vid-container video");
let time = document.querySelectorAll(".time button");
let player = document.querySelector(".player");
let time_display = document.querySelector(".time-display");
let sound = document.querySelectorAll(".sound button");
//get length of ouline.
const outlineLength = outline.getTotalLength();
let fakeDuration = 600;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

//pick different sounds.
sound.forEach(sound =>{
    sound.addEventListener("click", function(){
        song.src = this.getAttribute('data-sound');
        video.src = this.getAttribute('data-video');
        checkPlaying(song);
    });
});
  

play.addEventListener("click", () => {
    //song.play();
    checkPlaying(song);
});

//select sound
time.forEach(option =>{
    option.addEventListener("click",function(){
        fakeDuration = this.getAttribute("data-time");
    time.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)};`

    });
    
});


// to stop and play the sounds,
let checkPlaying = song => {
    if (song.paused) {
        song.play();
        video.play();
        play.src = "./svg/pause.svg";
    } else {
        song.pause();
        video.pause();
        play.src = "./svg/play.svg";
    }


};
    // animated the circle
    song.ontimeupdate = () =>{
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //animated the bar
        let progress = outlineLength-(currentTime/fakeDuration)*outlineLength;
        outline.style.strokeDashoffset = progress;
        //animate the text
        time_display.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration){
            song.pause;
            song.currentTime =0;
            play.src ="./svg/play.svg";
            video.pause();
        }
    }



