let userSymbol = '1-4.png';
let fruitSymbol = 'upsize.png';
let blank = 'blank.png';
let poisonSymbol = 'downsize.png';
let playerPosition = [1,1];
let poisonPosition = [4,1];
let fruitPosition = [4,4];
let goalPosition = [1,4];
let goalType = 'goal3-4.png';
let score = 0;
let gridLength = 4;
let fill = 1;
let gameOn = true;

printGrid();

document.getElementById(fruitPosition).src = fruitSymbol;
document.getElementById(goalPosition).src = goalType;

function newGame() {
    location.reload();
}

function placeGoal() {
    innerGoal = Math.floor(Math.random() * 4) + 1;
    let innerGoalType = '';

    if (innerGoal === 1) {
        goalType = 'goal1-4.png';
    } else if (innerGoal === 2) {
        goalType = 'goal2-4.png';
    } else if (innerGoal === 3) {
        goalType = 'goal3-4.png';
    } else {
        goalType = 'goalfull.png';
    }

    do {
        goalPosition[0] = Math.floor(Math.random() * 4) + 1;
        goalPosition[1] = Math.floor(Math.random() * 4) + 1;
        document.getElementById(poisonPosition).src = poisonSymbol;
    }
    while (arrMatch(goalPosition, playerPosition) == true || arrMatch(goalPosition, fruitPosition) == true || arrMatch(goalPosition, poisonPosition) == true);
}

function gameOver(cause) {

    document.getElementById('score').className = 'span2';

    if (cause === 'overfill') {
        document.getElementById('score').innerHTML = 'Game over! You overfilled yourself. Your score was ' + score + '.';
        gameOn = false;
        document.getElementById('newGame').className = '';
    } else if (cause === 'empty') {
        document.getElementById('score').innerHTML = 'Game over! You emptied yourself. Your score was ' + score + '.';
        gameOn = false;
        document.getElementById('newGame').className = '';
    } else if (cause === 'mismatch') {
        document.getElementById('score').innerHTML = 'Game over! You didn\'t match the goal. Your score was ' + score + '.';
        gameOn = false;
        document.getElementById('newGame').className = '';
    }
}

document.onkeydown = function(e) {
    if (gameOn === true) {
        switch (e.keyCode) {
            case 37:
                console.log('left');
                if (playerPosition[1] === 1) {
                    break;
                } else {
                    playerPosition[1]--;
                    gatherCheck();
                    printGrid();
                }
                break;
            case 38:
                console.log('up');
                if (playerPosition[0] === 1) {
                    break;
                } else {
                    playerPosition[0]--;
                    gatherCheck();
                    printGrid();
                }
                break;
            case 39:
                console.log('right');
                if (playerPosition[1] === 4) {
                    break;
                } else {
                    playerPosition[1]++;
                    gatherCheck();
                    printGrid();
                }
                break;
            case 40:
                console.log('down');
                if (playerPosition[0] === 4) {
                    break;
                } else {
                    playerPosition[0]++;
                    gatherCheck();
                    printGrid();
                }
                break;
        }
    }
};

function arrMatch(arr1, arr2) {

    for (var i = 0; i < arr2.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

    return true;
}

function fillUp() {
    if (fill !== 4){
        fill++
        if (fill === 1) {
            userSymbol = '1-4.png';
        } else if (fill === 2) {
            userSymbol = '2-4.png';
        } else if (fill === 3) {
            userSymbol = '3-4.png';
        } else {
            userSymbol = 'full.png';
        }
    } else {
        gameOver('overfill');
    }       
}

function fillDown() {
    
    if (fill !== 1) {
        fill--
        if (fill === 1) {
            userSymbol = '1-4.png';
        } else if (fill === 2) {
            userSymbol = '2-4.png';
        } else if (fill === 3) {
            userSymbol = '3-4.png';
        } else {
            userSymbol = 'full.png';
        } 
    } else {
        gameOver('empty');
    }    
}

function gatherCheck() {
    if (arrMatch(playerPosition, fruitPosition) === true) {
        fillUp();
        placeFruit();
    } else if (arrMatch(playerPosition, poisonPosition) === true) {
        fillDown();
        placePoison();
    } else if (arrMatch(playerPosition, goalPosition) === true) {
        scoreCheck(userSymbol);
    }else {
        console.log('you fail bitch');
    }
}

function scoreCheck(userFraction) {

    if (userFraction === '1-4.png' && goalType === 'goal1-4.png') {
        score++
        document.getElementById('score').innerHTML = score;
        placeGoal();
    } else if (userFraction === '2-4.png' && goalType === 'goal2-4.png') {
        score++
        document.getElementById('score').innerHTML = score;
        placeGoal();
    } else if (userFraction === '3-4.png' && goalType === 'goal3-4.png') {
        score++
        document.getElementById('score').innerHTML = score;
        placeGoal();
    } else if (userFraction === 'full.png' && goalType === 'goalfull.png') {
        score++
        document.getElementById('score').innerHTML = score;
        placeGoal();
    } else {
        gameOver('mismatch');
    }

}

function placePoison() {
    do {
        poisonPosition[0] = Math.floor(Math.random() * 4) + 1;
        poisonPosition[1] = Math.floor(Math.random() * 4) + 1;
        document.getElementById(poisonPosition).src = poisonSymbol;
    }
    while (arrMatch(poisonPosition, playerPosition) == true || arrMatch(poisonPosition, fruitPosition) == true || arrMatch(poisonPosition, goalPosition) == true);
}

function placeFruit() {

    do {
        fruitPosition[0] = Math.floor(Math.random() * 4) + 1;
        fruitPosition[1] = Math.floor(Math.random() * 4) + 1;
        document.getElementById(fruitPosition).src = fruitSymbol;
    }
    while (arrMatch(fruitPosition, playerPosition) == true || arrMatch(fruitPosition, poisonPosition) == true || arrMatch(fruitPosition, goalPosition) == true);
    
}

function upOrDown() {

    let coinFlip = Math.floor(Math.random() * 2) + 1;

    if (coinFlip === 1) {
        return fruitSymbol;
    } else {
        return poisonSymbol;
    }

}

function printGrid() {

    let innerArr = [];

    for (i = 1 ; i < (gridLength + 1) ; i++) {
        for (j = 1 ; j < gridLength + 1 ; j++) {
            innerArr[0] = i;
            innerArr[1] = j;
            console.log(innerArr);
            if (arrMatch(innerArr, playerPosition) === true) {
                document.getElementById(innerArr).src = userSymbol;
            } else if (arrMatch(innerArr, fruitPosition) === true) {
                document.getElementById(innerArr).src = fruitSymbol;
            } else if (arrMatch(innerArr, poisonPosition) === true) {
                document.getElementById(innerArr).src = poisonSymbol;
            } else if (arrMatch(innerArr, goalPosition) === true) {
                document.getElementById(innerArr).src = goalType;
            } else {
                document.getElementById(innerArr).src = blank;
            }
        }
    }   
}