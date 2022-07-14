import { CardDeck } from "./deck.js";

const mainGame = () =>{
    let playButton = document.getElementById("play");
    playButton.addEventListener("click", startGame);

    let newGameButton = document.getElementById("newGame");
    newGameButton.addEventListener("click", startGame);
}

window.mainGame = mainGame;

let cardDeck = new CardDeck();
cardDeck.createCardDeck();
let players = localStorage.getItem('playersGame');
players = JSON.parse(players);
let prizeGame = 1000;
let gameCards = [];
let score;
let displayMessage = document.getElementById("messageResult");


function startGame(){

    localStorage.removeItem('activePlayer');
    displayMessage.innerHTML = "";

    let idPlayer = document.getElementById("idPlayer").value; 

    if (validatePlayer(idPlayer)) {
        display("play-game","not-found","hide-element");

        let player = searchPlayer(idPlayer);

        let namePlayer = document.getElementById("namePlayer");
        namePlayer.innerHTML = "Hi " + player.name + "! Let's play..."

        player.prize = 0;
        
        localStorage.setItem('activePlayer', JSON.stringify(player));
        createGame();
    }else{
        document.getElementById("reset").click();
        display("not-found","play-game","hide-element");
    }
}

window.startGame = startGame;

function display(elementDisplayId, elementHiddenId, elementHiddenClass) {
    let elementDisplay = document.getElementById(elementDisplayId);
    elementDisplay.classList.remove(elementHiddenClass);
    elementDisplay.classList.add(elementDisplayId);

    let elementHidden = document.getElementById(elementHiddenId);
    elementHidden.classList.remove(elementHiddenId);
    elementHidden.classList.add(elementHiddenClass);
}

function createGame() {
    gameCards = [];
    score = 0;
    playGame();
}

function playGame() {
    let player = localStorage.getItem('activePlayer');
    player = JSON.parse(player);

    let cardGame = drawCardGame();

    let displayCard = document.getElementById("cardGame");
    displayCard.innerHTML = "You got the card: " + cardGame.name + " " + cardGame.suit;

    if (cardGame.name === "Ace") {
        let number = validateAceDecision();
        score += Number(number);
    }

    score += cardGame.value;
    player.prize += cardGame.prizeCard;
    let displayScore = document.getElementById("scoreGame");
    displayScore.innerHTML = "Your score now is: " + score;

    let gameStatus = validateScore(score);
    validateGameStatus(gameStatus, player);
    localStorage.setItem('activePlayer', JSON.stringify(player));
}

window.playGame = playGame;

function validateGameStatus(gameStatus, player){

    let buttonDraw = document.getElementById("draw");

    switch (gameStatus) {
        case "win":
            player.prize += prizeGame;
            buttonDraw.setAttribute('disabled', '');
            displayMessage.innerHTML = "&#x1f3c6 You win congratulations!!!" + "  &#x1f4b0 Your Prize is: " + player.prize;
            break;
        case "continue":
            buttonDraw.removeAttribute('disabled');
            break
        case "lose":
            buttonDraw.setAttribute('disabled', '');
            displayMessage.innerHTML = "We are sorry, but you lost. &#128532";
            break
        default:
            break;
    }
}


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
        aceDecisionPlayer = window.prompt("Yeah you got an ACE! Enter the value selected for the card? 1 or 11", "");
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
