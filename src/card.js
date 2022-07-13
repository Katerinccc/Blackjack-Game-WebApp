class Card{
    constructor({
        name,
        suit,
        value,
        prizeCard
    }){
        this.name = name;
        this.suit = suit;
        this.value = value;
        this.prizeCard = prizeCard;
    }
}

module.exports = Card;