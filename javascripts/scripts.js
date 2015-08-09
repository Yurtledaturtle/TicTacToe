
$(function () {

    var squares = [];
    var size= 3;
    var empty = "&nbsp;";
    var score;
    var moves;
    var turn = "X";

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

    wins = [7, 56, 448, 73, 146, 292, 273, 84];

    var startNewGame = function() {
        turn = "X";
        score = {"X": 0, "O": 0};
        moves = 0;
        squares.forEach(function (square) {
          square.html(empty);
        });
        console.log(squares);
    }

    var win = function (score) {
        for (var i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    }

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

     var play = function() {
        var board = $("<table border=1 cellspacing=0>"), counter = 1;
        for (var i = 0; i < size; i += 1) {
            var row = $("<tr>");
            board.append(row);
            for (var j = 0; j < size; j += 1) {
                var cell = $("<td height=50 width=50 align=center valign=center></td>");
                cell[0].counter = counter;
                cell.click(set);
                row.append(cell);
                squares.push(cell);
                counter += counter;
            }
        }

        $(document.getElementById("tictactoe") || document.body).append(board);
        startNewGame();
    }

    play();
});
