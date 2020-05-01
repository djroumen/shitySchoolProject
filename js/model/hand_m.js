"use strict";

const handTypes_e = {"scissor":0, "stone":1, "paper":2, "lizard":3, "spock":4, "gun":5, "lightning":6, "devil":7, "dragon":8, "water":9, "air":10, "sponge":11, "wolf":12, "tree":13, "human":14, "snake":15, "fire":16};

class Hand{
    winAgainstArr = [];
    loseAgainstArr = [];
    type;
    constructor(type, winArr, loseArr) {
        this.type = type;
        this.winAgainstArr = winArr;
        this.loseAgainstArr = loseArr;
    }
}