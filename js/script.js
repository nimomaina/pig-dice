//business logic
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Player(name, score, turn) {
    this.name = name;
    this.score = score;
    this.turn = turn;
}

Player.prototype.startTurn = function() {
    this.turn = 1;
};

Player.prototype.endTurn = function() {
    this.turn = 0;
};

Player.prototype.hold = function(total) {
    this.score += total;
};

Player.prototype.checkWin = function(total) {
    return ((this.score + total) >= 100);
};

var player1 = new Player(null, 0, 1);
var player2 = new Player(null, 0, 0);

var switchPlayer = function(playerName) {
    console.log(player1.name, playerName);
    if (player1.name === playerName) {
        player1.endTurn();
        $("#score1").removeClass("active");
        player2.startTurn()
        $("#score2").addClass("active");
    } else {
        player2.endTurn();
        $("#score2").removeClass("active");
        player1.startTurn()
        $("#score1").addClass("active");
    }
}

var resetGame = function() {
    player1.name = null;
    player2.name = null;
    $("input#player1").val("");
    $("input#player2").val("");
    $("#score1-span").text("0");
    $("#score2-span").text("0");
    $("#total-span").text("0");
    $("#diceGame").hide();
}
