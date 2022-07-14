import { CardDeck } from "./deck.js";

const mainGame = () =>{
    startGame();
}

window.mainGame = mainGame;

let cardDeck = new CardDeck();
cardDeck.createCardDeck();
let players = localStorage.getItem('playersGame');
players = JSON.parse(players);


function startGame(){
    gameForm.onsubmit = function (event){
        event.preventDefault();

        let idPlayer = document.getElementById("idPlayer").value; 

        if (validatePlayer(idPlayer)) {
            display("play-game","not-found","hide-element");

            let player = searchPlayer(idPlayer);

            let namePlayer = document.getElementById("namePlayer");
            namePlayer.innerHTML = "Hi " + player.name + "! Let's play..."

            player.prize = 0;
            // createGame(player);
        }else{
            document.getElementById("reset").click();

            display("not-found","play-game","hide-element");
        }

    }
}

function display(elementDisplayId, elementHiddenId, elementHiddenClass) {
    let elementDisplay = document.getElementById(elementDisplayId);
    elementDisplay.classList.remove(elementHiddenClass);
    elementDisplay.classList.add(elementDisplayId);

    let elementHidden = document.getElementById(elementHiddenId);
    elementHidden.classList.remove(elementHiddenId);
    elementHidden.classList.add(elementHiddenClass);
}

// function createGame(player) {
//     gameCards = [];
//     score = 0;

//     let gameResult = playGame();

//     if (gameResult === "win") {
//         player.prize += prizeUsd;
//     } else {
//         console.log("\n---- Sorry, but you lost :(")
//     }
// }

// function playGame() {
//     let gameStatus;
//     do {
//         let cardGame = drawCardGame();
//         console.log("You got the card: " + cardGame.name + " of " + cardGame.suit);
//         if (cardGame.name === "Ace") {
//             let number = validateAceDecision();
//             score += Number(number);
//         }
//         score += cardGame.value;
//         console.log("Your score now is: " + score);
//         gameStatus = validateScore(score);
//         if (gameStatus === "continue") {
//             console.log("\nNext card ________");
//         }
//     } while (gameStatus === "continue");
//     return gameStatus;
// }

function validatePlayer(idPlayer){
    return players.some(player => player.id === idPlayer)
}

function searchPlayer(idPlayer){
    let player = players.filter(player => player.id === idPlayer);
    return player[0];
}

function drawCard(){
    let newCardIndex = Math.floor(Math.random() * cardDeck.cards.length);
    let newCard = cardDeck.cards[newCardIndex];
    return newCard;
}

function drawCardGame(){
    let cardGame = drawCard();

    if (gameCards.some(card => card.name === cardGame.name)) {
        drawCardGame();
    }
    gameCards.push(cardGame);
    return cardGame;
}

function validateAceDecision(){
    let aceDecisionPlayer;
    do {
        aceDecisionPlayer = prompt("Which value you want for your Ace card? Please type 1 or 11:");
        if(aceDecisionPlayer === '1' || aceDecisionPlayer === '11'){
            return aceDecisionPlayer;
        }
    } while (aceDecisionPlayer != "1" && aceDecisionPlayer != "11");

}

function validateScore(score){
    if (score === 21) {
        return "win";
    }else if(score > 21){
        return "lose"
    }
    return "continue";
}
