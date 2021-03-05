// console.log("sane", $);

(function () {
    var playing = true;
    var currentPlayer = "";
    var win = $(".windiv");
    var resetBtn = $(".reset");
    var slots = $(".slot");
    var victoryMes;

    resetBtn.hide();

    $(".column").on("click", function (e) {
        if (playing) {
            resetBtn.hide();
            // console.log("row3: ", $(".row3"));
            // console.log("target", e.target); // returns the exact element i clicked on
            // console.log("current target", e.currentTarget); // return the element that has the click handler on it

            var col = $(e.currentTarget);
            var slotsInCol = col.children();
            // console.log("slotsInCol:", slotsInCol);

            // loop through all of the slots in the column
            for (var i = slotsInCol.length - 1; i >= 0; i--) {
                // console.log("slotsInCol.eq(0)", slotsInCol.eq(i));
                if (
                    !slotsInCol.eq(i).hasClass("player1") &&
                    !slotsInCol.eq(i).hasClass("player2")
                ) {
                    slotsInCol.eq(i).addClass(currentPlayer);
                    break;
                }
            }

            // returns all the slots in the row that was clicked
            // console.log("my row: ", $(".row" + i));
            var slotsInRow = $(".row" + i);
            // checkForVictory(slotsInCol);

            // console.log("slots: ", slots);

            if (checkForVictory(slotsInCol)) {
                // console.log("column victory");
                winGame();
            } else if (checkForVictory(slotsInRow)) {
                // console.log("row victory");
                winGame();
            } else if (checkForVictory(slots)) {
                // console.log("diagonal win");
                winGame();
            }

            switchPlayer();
        }
    });

    function switchPlayer() {
        if (currentPlayer === "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
        // console.log("currentplayer IF: ", currentPlayer);
    }

    function checkForVictory(slots) {
        if (playing) {
            // console.log(slots);
            var counter = 0; // number of adjacent chips in a column
            for (var i = 0; i < slots.length; i++) {
                if (slots.eq(i).hasClass(currentPlayer)) {
                    // console.log(slots.eq(i));
                    counter++;
                    if (counter === 4) {
                        return true;
                    }
                } else {
                    counter = 0;
                    // console.log("counter reset to 0:(");
                }

                if (
                    (slots.eq(i).hasClass(currentPlayer) &&
                        slots.eq(i + 7).hasClass(currentPlayer) &&
                        slots.eq(i + 14).hasClass(currentPlayer) &&
                        slots.eq(i + 21).hasClass(currentPlayer)) ||
                    (slots.eq(i).hasClass(currentPlayer) &&
                        slots.eq(i + 5).hasClass(currentPlayer) &&
                        slots.eq(i + 10).hasClass(currentPlayer) &&
                        slots.eq(i + 15).hasClass(currentPlayer))
                    ////////////// fix the cross unwanted win
                    //   && if slotsInCol.eq(i)
                ) {
                    return true;
                }
            }
        }
    }

    function init() {
        playing = true;
        $(".hole").css({
            borderRadius: "50%",
        });
        $(".board").css({ backgroundColor: "rgb(98 94 94)" });
        if (playing) {
            win.removeClass(".win");
            win.html(victoryMes).hide();
            resetBtn.hide();
            slots.removeClass("player1");
            slots.removeClass("player2");
        }
    }

    function getRandomColorNumber() {
        return Math.floor(Math.random() * 256);
    }

    function winGame() {
        victoryMes = `<div class="win">Well done ${currentPlayer}, you won!</div>`;
        win.addClass("win");
        win.css({
            visibility: "visible",
        });
        win.html(victoryMes).show();
        // $(".board").css({ backgroundColor: "rgb(244 242 217)" });

        var r = getRandomColorNumber();
        var g = getRandomColorNumber();
        var b = getRandomColorNumber();
        var randomColor = "rgb(" + r + ", " + g + ", " + b + ")";
        $(".board").css({ backgroundColor: randomColor });

        if (currentPlayer === "player1") {
            slots.removeClass("player2");
            slots.addClass("player1");
        } else if (currentPlayer === "player2") {
            slots.addClass("player2");
        }
        $(".hole").css({
            borderRadius: "0%",
        });

        setTimeout(function () {
            resetBtn.addClass("reset");
            resetBtn.show();
        }, 2000);

        playing = false;
    }

    resetBtn.on("click", init);
})();

// ///////// indicate the 4 that made the win
// For coins stacked over each other:
// if (
//                 slots.eq(k).hasClass(currentPlayer) &&
//                 slots.eq(k + 1).hasClass(currentPlayer) &&
//                 slots.eq(k + 2).hasClass(currentPlayer) &&
//                 slots.eq(k + 3).hasClass(currentPlayer) &&
//                 k % (slots.length / columns.length) <= 2
//             ) {
//                 console.log(currentPlayer + "diag won!");
//                 slots.eq(k).addClass("victory");
//                 slots.eq(k + 1).addClass("victory");
//                 slots.eq(k + 2).addClass("victory");
//                 slots.eq(k + 3).addClass("victory");
//                 $(".overlay").css({ visibility: "visible" });
//                 return true;
// }

/// make boarders in front of the chips for animation
/// on each slot in html add border - zindex higher than hole

// if (
//     slots.eq(i+23).hasClass(currentPlayer) &&
//     slots.eq(i+7).hasClass(currentPlayer)
// ) {
// }
//  && slots.eq(i).hasClass(currentPlayer) != 23
