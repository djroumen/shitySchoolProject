"use strict";



class ScoreboardView{
    printScoreboard(whereIsScoreboard, firstEntry){
        document.querySelectorAll(whereIsScoreboard + " ol").forEach(e => e.remove());
        let current = firstEntry;
        let newol = document.createElement("ol");
        let counter = 0;
        do {
            let newli = document.createElement("li");
            newli.innerText = "rank: " + current.player.name + " with a score of " + current.player.score + " : " + current.player.computerScore + " (player : computer).";
            newol.append(newli);
            current = current.below;
            counter++;
        } while ((current != null)&&(counter<10));
        document.querySelector(whereIsScoreboard).append(newol);
    }
    changeToLoadText(whereIsScoreboard){
        document.querySelectorAll(whereIsScoreboard + " ol" ).forEach(e => e.innerHTML = "loading...");
    }
}
