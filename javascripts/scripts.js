$(function () {

    var squares = [];
    var size= 3;
    var empty = "&nbsp;";
    var score;
    var moves;
    var turn = "X";

          // Winning numbers grid
      /*
       *
       *     273                 84
       *        \               /
       *          1 |   2 |   4  = 7
       *       -----+-----+-----
       *          8 |  16 |  32  = 56
       *       -----+-----+-----
       *         64 | 128 | 256  = 448
       *       =================
       *         73   146   292
       *
       */
          // I add row, column and diagonal sums of squared values to determine the winner
    wins = [7, 56, 448, 73, 146, 292, 273, 84];

//sets player names up on initial load of page, have to reload the game to reset names
    var setPlayer = function(){
        var firstplayer = prompt('HHWWHAT is your name, playerrrrr????');
        var secondplayer = prompt('HHWWHAT is your name, playerrrr????');

        firstplayer = $('#playerone').text(firstplayer);
        secondplayer = $('#playertwo').text(secondplayer);
    }

//sets up inital game, places turn on x first (player 1)
    var startNewGame = function() {
        turn = "X";
        score = {"X": 0, "O": 0};
        moves = 0;
        squares.forEach(function (square) {
          square.html(empty);
        });
    }

//determines the win by matching summed value to winning numbers array listed above (win)
    var win = function (score) {
        for (var i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    }

//Will set the game board to respond to determined outcome,

//either X is a winner with 3 across in all directions,
// O is a winner with 3 across in all directions
// or a draw occurs with no winner determined
// otherwise allow next turn of X or O
    var set = function() {

        if ($(this).html() !== empty) {
            return;
        }
        $(this).html(turn);
        moves += 1;
        score[turn] += $(this)[0].counter;
        if (win(score[turn])) {
            alert(turn + " wins!");
            startNewGame();
        } else if (moves === size * size) {
            alert("It's a draw!");
            startNewGame();
        } else {
            if( turn === "X") {
              turn = "O";
            } else {
              turn = "X";
            };
        }
    }

//constructs the board itself by using jquery to create table elements and placing initial css on it
//appends elements to parents to have the DOM generate the board
     var play = function() {
        var board = $("<table border=5 border-style=outset bordercolor=white cellspacing=0 color=white align=center display=inline-block>"), counter = 1;
        for (var i = 0; i < size; i += 1) {
            var row = $("<tr>");
            board.append(row);
            for (var j = 0; j < size; j += 1) {
                var cell = $("<td height=100 width=100 align=center valign=center></td>");
                cell[0].counter = counter;
                cell.click(set);
                row.append(cell);
                squares.push(cell);
                counter += counter;
            }
        }

//runs player name and places full board on the page and launches a new game instance
        setPlayer();
        $(document.getElementById("tictactoe") || document.body).append(board);
        startNewGame();
    }

//Time to Tic Tac Toe
    play();
});
