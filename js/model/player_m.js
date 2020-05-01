"use strict";

class Player {
    name = "";
    score;
    computerScore;

    constructor(playerName, score, computerScore) {
        this.name = playerName.toString();
        this.score = score;
        this.computerScore = computerScore;
    }
    giveRatio(){
        return (this.computerScore > 0) ? this.score/this.computerScore : this.score;
    }
}