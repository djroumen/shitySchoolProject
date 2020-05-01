"use strict";

function play_fetch(playerName, playerSelection, dataCallbackFn) {
    let playedHand = ["Schere", "Stein", "Papier", "Streichholz", "Brunnen"];
    let JSONString = "https://us-central1-schere-stein-papier-ee0c9.cloudfunctions.net/widgets/play?playerName=" + playerName + "&playerHand=" + playedHand[playerSelection];
    return fetch(JSONString)
        .then((response) => {
            return response.json();
        })
        //.then(() => {return dataCallbackFn})
        .catch((error) => console.log(error));
}

function loadScore_fetch(){
    let JSONString = "https://us-central1-schere-stein-papier-ee0c9.cloudfunctions.net/widgets/ranking";
    return fetch(JSONString)
        .then((response) => {
            return response.json();
        })
        .then((data) => {return data;})
        .catch((error) => console.log(error));
}