"use strict";
const ArrForSSPLS = [["scissor", "stone", "paper"],
    ["scissor", "stone", "paper", "lizard", "spock"],
    ["stone", "gun", "lightning", "devil", "dragon", "water", "air", "paper", "sponge", "wolf", "tree", "human", "snake", "scissor", "fire"]];


class GameView {


    setRuleImgSrc(gameMode) {
        let rulesString = "";
        switch (gameMode) {
            case gameMode_e.standard:
                rulesString += "3-state";
                break;
            case gameMode_e.expanded:
                rulesString += "5-state";
                break;
            case gameMode_e.escalation:
                rulesString += "15-state";
                break;
            default:
        }
        document.querySelector("#ruleTooltip").setAttribute("src", "img/rules/" + rulesString + ".png");
        document.querySelector("#ruleTooltip").setAttribute("alt", rulesString);
    }

    removeHistory() {
        document.querySelectorAll("#history li").forEach(e => e.remove());
    }

    updateLastRound(gameMode, imgSrc, playerSelection, computerSelection) {
        document.querySelector("#lastRound").innerHTML = this.givePicFromSelection(gameMode, playerSelection, imgSrc) + "<span> vs </span>" + this.givePicFromSelection(gameMode, computerSelection, imgSrc);
    }

    addNewHistoryEntry(gameMode, imgSrc, playerName, playerSelection, computerSelection, winner) {
        const newli = document.createElement('li');
        newli.innerHTML = playerName + ": " + this.givePicFromSelection(gameMode, playerSelection, imgSrc) + " vs Computer: " + this.givePicFromSelection(gameMode, computerSelection, imgSrc) + " -> winner: " + winner.toString();
        document.querySelector("#history ul").insertAdjacentElement('afterbegin', newli);
    }

    givePicFromSelection(gameMode, selection, imgSrc) {
        return "<img src='" + imgSrc + ArrForSSPLS[gameMode][selection] + ".png' alt='" + ArrForSSPLS[gameMode][selection] + "' />";
    }

    printPlayButtons(gameMode, imgSrc) {
        document.querySelectorAll("#gamePlay img").forEach(e => e.remove());
        for (let i = 0; i < ArrForSSPLS[gameMode].length; i++) {
            document.querySelector("#gamePlay").append(this.createImgContainer(i, gameMode, imgSrc));
        }
    }


    createImgContainer(symbol, gameMode, imgSrc) {
        let container = document.createElement("img");
        container.setAttribute("id", ArrForSSPLS[gameMode][symbol]);
        container.setAttribute("src", imgSrc + ArrForSSPLS[gameMode][symbol] + ".png");
        let classString = gameMode === gameMode_e.escalation ? "col-xl-2 escalation" : "col-xl-2";
        container.setAttribute("class", classString);
        container.setAttribute("alt", ArrForSSPLS[gameMode][symbol]);
        container.addEventListener("click", () => {
            game.playARound(symbol);
        });
        return container;
    }


    printNames(name) {
        document.querySelector("#gameScoreNames").innerText = "Computer : " + name;
        document.querySelector("#lastRoundNames").innerText = "Computer vs " + name;
    }

    updateScore(playerScore, computerScore) {
        document.querySelector("#gameScoreValue").innerText = computerScore.toString() + " : " + playerScore.toString();
    }
    giveCountdownBoxValue(){
        return document.querySelector("#countdownONOFF").checked;
    }
    giveEffectBoxValue(){
        return document.querySelector("#effectONOFF").checked;
    }
    disablePlayButtons(buttonsDisable) {
        if (buttonsDisable) {
            document.querySelector("#gamePlay").style.filter = "grayscale(100%) blur(8px)";
        } else {
            document.querySelector("#gamePlay").style.filter = "none";
        }
    }
    printCountdown(seconds){
        if(seconds>0){
            document.querySelector("#countdownText").innerHTML = seconds + " seconds until next round...";
        }else{
            document.querySelector("#countdownText").innerHTML = "";
        }

    }


}