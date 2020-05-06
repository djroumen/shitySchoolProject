"use strict";


class InterfaceHTMLToJS {

    constructor(startGameFn) {
        document.querySelector("#musicONOFF").addEventListener("change", () => audioView.turnMusicOnOff())

        document.querySelector("#startGame").addEventListener("submit", () => {
            startGameFn(document.querySelector("input[name='gameMode']:checked").value, document.querySelector("#userName").value);
        }, false);

        document.querySelector("#saveButton").addEventListener("click", () => {
            scoreboard.forEach(e => e.saveScoreLocal())
        });
        document.querySelector("#loadButton").addEventListener("click", () => {
            isLocal ? scoreboard.forEach(e => e.loadScoreLocal()) : scoreboard[gameMode_e.server].loadScoreServer();
        });

        document.querySelector("#changingMode").addEventListener("click", this.changeMode);

        document.querySelector("#backToScoreButton").addEventListener("click", () => this.goBackToScore());

        document.querySelector("#goTop").addEventListener("click", this.scrollToTop);

        document.querySelector("#rulesButton").addEventListener("mouseover", () => {
            document.querySelector("#ruleTooltip").style.display = "block";
        });
        document.querySelector("#rulesButton").addEventListener("mouseout", () => {
            document.querySelector("#ruleTooltip").style.display = "none";
        });
        this.changeMode();
    }

    changeSite(toScoreSite = false) {
        if (toScoreSite) {
            document.querySelector("#scoreboardSite").style.display = "initial";
            document.querySelector("#gameSite").style.display = "none";
            audioView.stopGameAudio();

        } else {
            document.querySelector("#scoreboardSite").style.display = "none";
            document.querySelector("#gameSite").style.display = "initial";
            if(document.querySelector("#musicONOFF").checked){
                audioView.startGameAudio();
            }
        }
    }

    changeMode() {
        isLocal = !isLocal;
        let localContainer = document.querySelectorAll(".localMode");
        let serverContainer = document.querySelectorAll(".serverMode");
        if (isLocal) {
            document.querySelector("#changingMode").innerHTML = "current mode: local - click to change mode";
            localContainer.forEach(e => e.removeAttribute("style"));
            serverContainer.forEach(e => e.style.display = "none");
        } else {
            document.querySelector("#changingMode").innerHTML = "current mode: server - click to change mode";
            localContainer.forEach(e => e.style.display = "none");
            serverContainer.forEach(e => e.removeAttribute("style"));
            scoreboard[gameMode_e.server].loadScoreServer();
        }


    }

    goBackToScore() {
        this.changeSite(true);
        scoreboard[game.gameMode].addPlayer(game.player);   //ToDo eigendlich nicht in VIEW
        scoreboard[game.gameMode].updateHTML();
    }

    scrollToTop() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }


}