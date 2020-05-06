"use strict";

class AudioView{
    winEffect = document.querySelector("#winEffect");
    failureEffect = document.querySelector("#failureEffect");
    gameAudio = document.querySelector("#epicSound");
    constructor() {
        this.winEffect.loop = false;
        this.winEffect.volume = 0.8;
        this.failureEffect.loop = false;
        this.failureEffect.volume = 0.8;
        this.gameAudio.loop = true;
        this.gameAudio.volume = 0.2;
    }
    turnMusicOnOff(){
        if(document.querySelector("#musicONOFF").checked){
            this.gameAudio.play();
        }else{
            this.gameAudio.pause();
        }
    }
    stopGameAudio(){
        audioView.gameAudio.load();
    }
    startGameAudio(){
        audioView.gameAudio.play();
    }
    playWinEffect(){
        audioView.winEffect.play();
    }
    playFailureEffect(){
        audioView.failureEffect.play();
    }

}