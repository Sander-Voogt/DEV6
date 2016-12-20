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

/**
 * @return {boolean}
 */
function SingleBet(choice) {
    roll = getNumber();
    console.log("CPU: " + roll.toString() + "\nUser: " + choice.toString());
    if (choice !== roll) {
        console.log("User lost");
        return false;
    } else {
        console.log("User won");
        return true;
    }
}

SingleBet(12);
