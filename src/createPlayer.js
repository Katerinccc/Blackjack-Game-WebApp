import { Player } from "./player.js";

const createPlayer = () =>{
    addPlayer();
}

window.createPlayer = createPlayer;

let players = localStorage.getItem('playersGame');
players = JSON.parse(players);

function addPlayer(){
    playerForm.onsubmit = function (event){
        event.preventDefault();

        const formData = new FormData(playerForm);      
        let idPlayer = formData.get('idPlayer');
        let playerName = formData.get('name');

        let newPlayer = new Player({
            id: idPlayer,
            name: playerName,
            prize: 0
        });

        players.push(newPlayer);
        localStorage.setItem('playersGame', JSON.stringify(players));
        document.getElementById("reset").click();
        printMessage(playerName);
    }
}

function printMessage(playerName){    
const message = document.getElementById("message"); 
message.innerHTML = "Player " + playerName + " created successfully.";
message.className = "message"
}