var bet = 12;

function getNumber() {
    min = 1;
    max = 36;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function parseBet(bet) {
    if(typeof(bet) === "number") {
        //logic
    }
    if(typeof(bet) === "string") {
        //logic
    }
    console.log(typeof(bet));
}

parseBet(bet);
