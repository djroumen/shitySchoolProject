"use strict";
const gameMode_e = {
    standard: 0,
    expanded: 1,
    escalation: 2,
    server: 3,
    simulation: 999
};
let scoreboard;
let interfaceHTMLToJS;
let game;


class Manager {

    constructor() {
        scoreboard = [new Scoreboard("#scoreboardStandard"), new Scoreboard("#scoreboardExpanded"), new Scoreboard("#scoreboardEscalation"), new Scoreboard("#scoreboardStandardServer")];
        interfaceHTMLToJS = new InterfaceHTMLToJS(this.startGame, this.startStopSimulation);
    }
    startGame(gameMode, pName) {
        interfaceHTMLToJS.changeSite();
        game = new Game(pName, parseInt(gameMode));
        console.log("start the game as " + pName);
        console.log(parseInt(gameMode));
    }
    startStopSimulation() {
        isSimulationRunning ? window.clearInterval(game.simulationIntervalId) : (game.simulationIntervalId = window.setInterval(function () {game.calcWinner(game.generateSelection())}, 100));
        isSimulationRunning = !isSimulationRunning;
    }
    endSimulation() {
        window.clearInterval(game.simulationIntervalId);  //ToDo Weg von hier
        interfaceHTMLToJS.endSimulation();
    }



}