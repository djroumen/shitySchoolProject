"use strict";
const gameMode_e = {
    standard: 0,
    expanded: 1,
    escalation: 2,
    server: 3
};
let scoreboard;
let interfaceHTMLToJS;
let audioView;
let game;


class MainManager {

    constructor() {
        scoreboard = [new Scoreboard("#scoreboardStandard"), new Scoreboard("#scoreboardExpanded"), new Scoreboard("#scoreboardEscalation"), new Scoreboard("#scoreboardStandardServer")];
        audioView = new AudioView();
        interfaceHTMLToJS = new InterfaceHTMLToJS(this.startGame);
    }
    startGame(gameMode, pName) {
        interfaceHTMLToJS.changeSite();
        game = new Game(pName, parseInt(gameMode));
        console.log("start the game as " + pName);
        console.log(parseInt(gameMode));
    }
}