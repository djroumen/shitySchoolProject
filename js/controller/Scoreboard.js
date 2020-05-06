"use strict";

class Scoreboard {
    first = null;
    whereHTML = "";
    scoreboardView = new ScoreboardView();

    constructor(whereHTML) {
        this.whereHTML = whereHTML;

    }

    addPlayer(player) {
        let newNode = new ScoreboardNode(player);
        let ratioNewNode = player.giveRatio(newNode.player.score, newNode.player.computerScore);
        let ratioOther = 0.0;
        if (this.first === null) {
            this.first = newNode;
        } else {
            ratioOther = player.giveRatio(this.first.player.score, this.first.player.computerScore);
            if (ratioOther < ratioNewNode) {
                newNode.below = this.first;
                this.first = newNode;
            } else {
                let current = this.first;

                ratioOther = (current.below != null) ? player.giveRatio(current.below.player.score, current.below.player.computerScore) : 0;
                while ((current.below != null) && (ratioOther > ratioNewNode)) {
                    current = current.below;
                    (current.below != null) ? ratioOther = player.giveRatio(current.below.player.score, current.below.player.computerScore) : 0;
                    console.log(ratioNewNode + " vs " + ratioOther);
                }
                newNode.below = current.below;
                current.below = newNode;
            }
        }
        console.log("added player: " + player.name);
    }

    updateHTML() {
        if (this.first !== null) {
            console.log("update Scoreboard");
            this.scoreboardView.printScoreboard(this.whereHTML, this.first);
            console.log("finished with update");
        }
    }

    saveScoreLocal() {
        localStorage.setItem(this.whereHTML.toString(), JSON.stringify(this.first));
    }

    loadScoreLocal() {
        let loadStorage = localStorage.getItem(this.whereHTML.toString());
        if (loadStorage === null) {
            alert("not found");
        } else {
            this.first = JSON.parse(loadStorage);
            this.updateHTML();
        }
    }

    async loadScoreServer() {
        this.scoreboardView.changeToLoadText(this.whereHTML);
        this.first = null;
        const dataFromServer = await loadScore_fetch();

        console.log(dataFromServer);
        for (const [key, value] of Object.entries(dataFromServer)) {
            console.log("added User: " + value.user + ", Wins: " + value.win + ", Lost: " + value.lost);
            this.addPlayer(new Player(value.user, value.win, value.lost));
        }
        this.updateHTML();
    }

}