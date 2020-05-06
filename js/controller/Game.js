"use strict";
const winner_e = {
    computer: 0,
    player: 1,
    undecided: 2
};

class Game {
    player;
    gameMode;
    srcString = "img/";
    gameView = new GameView();
    hands = [];
    isCountdownRunning = false;
    workOnARound = false;


    constructor(playerName, gameMode) {
        this.player = null;
        this.player = new Player(playerName, 0, 0);
        this.gameMode = gameMode;
        this.gameView.removeHistory();
        this.createHands();
        if (this.gameMode === gameMode_e.escalation) {
            this.srcString += "escalation/";
        }
        this.gameView.setRuleImgSrc(this.gameMode);
        this.gameView.printPlayButtons(gameMode, this.srcString);
        this.gameView.printNames(this.player.name);
        this.gameView.updateScore(0, 0);
    }

    createHands() {
        switch (this.gameMode) {
            case gameMode_e.standard:
                this.hands = [new Hand(handTypes_e.scissor, [handTypes_e.paper], [handTypes_e.stone]),
                    new Hand(handTypes_e.stone, [handTypes_e.scissor], [handTypes_e.paper]),
                    new Hand(handTypes_e.paper, [handTypes_e.stone], [handTypes_e.scissor])];
                break;
            case gameMode_e.expanded:
            case gameMode_e.server:
                this.hands = [new Hand(handTypes_e.scissor, [handTypes_e.paper, handTypes_e.lizard], [handTypes_e.stone, handTypes_e.spock]),
                    new Hand(handTypes_e.stone, [handTypes_e.scissor, handTypes_e.lizard], [handTypes_e.paper, handTypes_e.spock]),
                    new Hand(handTypes_e.paper, [handTypes_e.stone, handTypes_e.spock], [handTypes_e.scissor, handTypes_e.lizard]),
                    new Hand(handTypes_e.lizard, [handTypes_e.paper, handTypes_e.spock], [handTypes_e.stone, handTypes_e.scissor]),
                    new Hand(handTypes_e.spock, [handTypes_e.scissor, handTypes_e.stone], [handTypes_e.paper, handTypes_e.lizard])];
                break;
            case gameMode_e.escalation:
                this.hands = [new Hand(handTypes_e.stone, [handTypes_e.scissor, handTypes_e.fire, handTypes_e.snake, handTypes_e.human, handTypes_e.tree, handTypes_e.wolf, handTypes_e.sponge], [handTypes_e.paper, handTypes_e.air, handTypes_e.water, handTypes_e.dragon, handTypes_e.devil, handTypes_e.lightning, handTypes_e.gun]),
                    new Hand(handTypes_e.gun, [handTypes_e.stone, handTypes_e.fire, handTypes_e.scissor, handTypes_e.snake, handTypes_e.human, handTypes_e.tree, handTypes_e.wolf], [handTypes_e.sponge, handTypes_e.paper, handTypes_e.air, handTypes_e.water, handTypes_e.dragon, handTypes_e.devil, handTypes_e.lightning]),
                    new Hand(handTypes_e.lightning, [handTypes_e.gun, handTypes_e.stone, handTypes_e.fire, handTypes_e.scissor, handTypes_e.snake, handTypes_e.human, handTypes_e.tree], [handTypes_e.wolf, handTypes_e.sponge, handTypes_e.paper, handTypes_e.air, handTypes_e.water, handTypes_e.dragon, handTypes_e.devil]),
                    new Hand(handTypes_e.devil, [handTypes_e.lightning, handTypes_e.gun, handTypes_e.stone, handTypes_e.fire, handTypes_e.scissor, handTypes_e.snake, handTypes_e.human], [handTypes_e.tree, handTypes_e.wolf, handTypes_e.sponge, handTypes_e.paper, handTypes_e.air, handTypes_e.water, handTypes_e.dragon]),
                    new Hand(handTypes_e.dragon, [handTypes_e.devil, handTypes_e.lightning, handTypes_e.gun, handTypes_e.stone, handTypes_e.fire, handTypes_e.scissor, handTypes_e.snake], [handTypes_e.human, handTypes_e.tree, handTypes_e.wolf, handTypes_e.sponge, handTypes_e.paper, handTypes_e.air, handTypes_e.water]),
                    new Hand(handTypes_e.water, [handTypes_e.dragon, handTypes_e.devil, handTypes_e.lightning, handTypes_e.gun, handTypes_e.stone, handTypes_e.fire, handTypes_e.scissor], [handTypes_e.snake, handTypes_e.human, handTypes_e.tree, handTypes_e.wolf, handTypes_e.sponge, handTypes_e.paper, handTypes_e.air]),
                    new Hand(handTypes_e.air, [handTypes_e.water, handTypes_e.dragon, handTypes_e.devil, handTypes_e.lightning, handTypes_e.gun, handTypes_e.stone, handTypes_e.fire], [handTypes_e.scissor, handTypes_e.snake, handTypes_e.human, handTypes_e.tree, handTypes_e.wolf, handTypes_e.sponge, handTypes_e.paper]),
                    new Hand(handTypes_e.paper, [handTypes_e.stone, handTypes_e.air, handTypes_e.water, handTypes_e.dragon, handTypes_e.devil, handTypes_e.lightning, handTypes_e.gun], [handTypes_e.scissor, handTypes_e.lizard, handTypes_e.fire, handTypes_e.snake, handTypes_e.human, handTypes_e.tree, handTypes_e.wolf, handTypes_e.sponge]),
                    new Hand(handTypes_e.sponge, [handTypes_e.paper, handTypes_e.air, handTypes_e.water, handTypes_e.dragon, handTypes_e.devil, handTypes_e.lightning, handTypes_e.gun], [handTypes_e.stone, handTypes_e.fire, handTypes_e.scissor, handTypes_e.snake, handTypes_e.human, handTypes_e.tree, handTypes_e.wolf]),
                    new Hand(handTypes_e.wolf, [handTypes_e.sponge, handTypes_e.paper, handTypes_e.air, handTypes_e.water, handTypes_e.dragon, handTypes_e.devil, handTypes_e.lightning], [handTypes_e.gun, handTypes_e.stone, handTypes_e.fire, handTypes_e.scissor, handTypes_e.snake, handTypes_e.human, handTypes_e.tree]),
                    new Hand(handTypes_e.tree, [handTypes_e.wolf, handTypes_e.sponge, handTypes_e.paper, handTypes_e.air, handTypes_e.water, handTypes_e.dragon, handTypes_e.devil], [handTypes_e.lightning, handTypes_e.gun, handTypes_e.stone, handTypes_e.fire, handTypes_e.scissor, handTypes_e.snake, handTypes_e.human]),
                    new Hand(handTypes_e.human, [handTypes_e.tree, handTypes_e.wolf, handTypes_e.sponge, handTypes_e.paper, handTypes_e.air, handTypes_e.water, handTypes_e.dragon], [handTypes_e.devil, handTypes_e.lightning, handTypes_e.gun, handTypes_e.stone, handTypes_e.fire, handTypes_e.scissor, handTypes_e.snake]),
                    new Hand(handTypes_e.snake, [handTypes_e.human, handTypes_e.tree, handTypes_e.wolf, handTypes_e.sponge, handTypes_e.paper, handTypes_e.air, handTypes_e.water], [handTypes_e.dragon, handTypes_e.devil, handTypes_e.lightning, handTypes_e.gun, handTypes_e.stone, handTypes_e.fire, handTypes_e.scissor]),
                    new Hand(handTypes_e.scissor, [handTypes_e.paper, handTypes_e.snake, handTypes_e.human, handTypes_e.tree, handTypes_e.wolf, handTypes_e.sponge, handTypes_e.air], [handTypes_e.stone, handTypes_e.water, handTypes_e.dragon, handTypes_e.devil, handTypes_e.lightning, handTypes_e.gun, handTypes_e.fire]),
                    new Hand(handTypes_e.fire, [handTypes_e.scissor, handTypes_e.snake, handTypes_e.human, handTypes_e.tree, handTypes_e.wolf, handTypes_e.sponge, handTypes_e.paper], [handTypes_e.air, handTypes_e.water, handTypes_e.dragon, handTypes_e.devil, handTypes_e.lightning, handTypes_e.gun, handTypes_e.stone])];
                break;
            default:
        }
        console.log("playable Hands: " + JSON.stringify(this.hands));
    }

    playARound(symbol) {
        if (!this.workOnARound) {
            this.workOnARound = true;
            isLocal ? this.calcWinner(symbol) : this.calcWinner(symbol, true);
        }
    }

    async calcWinner(playerSelection, isServer = false) {
        console.log("Playerchoice: " + playerSelection);
        let winner;
        let computerSelection;
        if (!isServer) {
            computerSelection = this.generateComputerSelection();
            console.log("ComputerChoice: " + computerSelection);
            winner = this.compareHands(this.hands[playerSelection], this.hands[computerSelection]);
        } else {
            let data = await play_fetch(this.player.name, playerSelection);
            let result = this.interpretServerData(data);
            computerSelection = result[0];
            winner = result[1];
        }
        console.log(winner);
        let winnerString;
        switch (winner) {
            case winner_e.computer:         // computer win
                this.player.computerScore++;
                winnerString = "Computer";
                break;
            case winner_e.player:         // player win
                this.player.score++;
                winnerString = this.player.name;
                break;
            case winner_e.undecided:         // undecided
                winnerString = "undecided";
                break;
            default:
                winnerString = "calcError";
                console.log("calc error");

        }
        this.playWinLoseEffect(winner);
        this.gameView.updateScore(this.player.score, this.player.computerScore);
        this.gameView.updateLastRound(this.gameMode, this.srcString, playerSelection, computerSelection);
        this.gameView.addNewHistoryEntry(this.gameMode, this.srcString, this.player.name, playerSelection, computerSelection, winnerString);
        console.log("Winner: " + winnerString);
        await this.countdown();
        this.workOnARound = false;
    }

    compareHands(playerHand, computerHand) {
        let winLoseVar = winner_e.undecided;
        if (playerHand === computerHand) {
            return winLoseVar;
        }
        console.log(JSON.stringify(playerHand));
        playerHand.winAgainstArr.forEach(e => {
            if (e === computerHand.type) winLoseVar = winner_e.player;
        });
        playerHand.loseAgainstArr.forEach(e => {
            if (e === computerHand.type) winLoseVar = winner_e.computer;
        });
        return winLoseVar;
    }

    generateComputerSelection(changeAlgorithm = false) {
        let states = 3;
        switch (this.gameMode) {
            case gameMode_e.standard:
                break;
            case gameMode_e.expanded:
                states = 5;
                break;
            case gameMode_e.escalation:
                states = 15;
                break;
            default:
                alert("game mode error");
        }
        return changeAlgorithm ? (Math.round(Math.random() * (states - 1))) : (Math.round(window.crypto.getRandomValues(new Uint32Array(1)) % states));
    }

    interpretServerData(data) {
        let serverSelection = 0;
        let winner = 0;
        switch (data.choice) {
            case "Schere":
                serverSelection = 0;
                break;
            case "Stein":
                serverSelection = 1;
                break;
            case "Papier":
                serverSelection = 2;
                break;
            case "Streichholz":
                serverSelection = 3;
                break;
            case "Brunnen":
                serverSelection = 4;
                break;
            default:
                break;
        }
        console.log("ServerChoice: " + serverSelection);
        switch (data.win) {
            case true:
                winner = winner_e.player;
                break;
            case false:
                winner = winner_e.computer;
                break;
            default:
                winner = winner_e.undecided;
                break;
        }
        return [serverSelection, winner];
    }

    playWinLoseEffect(hasWon) {
        if (this.gameView.giveEffectBoxValue() === true) {
            switch (hasWon) {
                case winner_e.player:
                    audioView.playWinEffect();
                    break;
                case winner_e.computer:
                    audioView.playFailureEffect();
                    break;
                default:
            }
        }
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    async countdown() {
        if (this.gameView.giveCountdownBoxValue() === true) {
            this.gameView.disablePlayButtons(true);
            let seconds = secToWaitBetweenRound;
            while (seconds > 0) {
                this.gameView.printCountdown(seconds);
                await this.sleep(1000);
                seconds--;
            }
            this.gameView.printCountdown(0);
            this.gameView.disablePlayButtons(false);
        }
    }
}