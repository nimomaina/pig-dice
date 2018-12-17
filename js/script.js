//business logic
$(document).ready(function() {
  function getRandom() {
    return Math.floor(Math.random() * (6 )) + 1;
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
  //Front end logic
  $("#flashbtn").click(function() {
    $("#play").show();
    $(".start").hide();
    event.preventDefault();
  });


  $(function() {

    var total = 0;

    $("#letsPlay").click(function() {
      player1.name = $("input#player1").val();
      player2.name = $("input#player2").val();

      $("#playername1").text(player1.name);
      $("#playername2").text(player2.name);
      $("#displayScore1").text(player1.score);
      $("#displayScore2").text(player2.score);
      $("#turnScore").text(total);
    });

    $("#roll").click(function() {
      var dice = getRandom();
      $("#rollNum").text(dice);
      if (dice !== 1) {
        total += dice;
        $("#turnScore").text(total);
        if (player1.turn && player1.checkWin(total)) {
          player1.score += total;
          alert(player1.name + " has won!!  score: " + player1.score);
          resetGame();
        } else if (player2.turn && player2.checkWin(total)) {
          player2.score += total;
          alert(player2.name + " has won!! score: " + player2.score);
          resetGame()
        }
      } else {
        total = 0;
        $("#turnScore").text(total);
        if (player1.turn) {
          switchPlayer(player1.name);
        } else {
          switchPlayer(player2.name);
        }
      }
    });

    $("#hold").click(function() {
      if (player1.turn === 1) {
        player1.score += total;
        $("#displayScore1").text(player1.score);
        total = 0;
        switchPlayer(player1.name);
      } else {
        player2.score += total;
        $("#displayScore2").text(player2.score);
        total = 0;
        switchPlayer(player2.name);
      }
    });
  });
});
