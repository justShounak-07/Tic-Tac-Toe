const gameboard = (() => {
    // creating an empty array to store 9 values. 
    let board = ["", "", "", "", "", "", "", "", ""];

    // get the current board to read only during outside
    const getboard = () => board;

    // reset the board after every output-
    const resetboard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };[]

    // setting winning logic for the game- considering.
    // considering the matrix from 0 to 9. 
    const checkwin = () => {
        const winpatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], //rows winning
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns winning
        [0, 4, 8], [2, 4, 6], //diagonals winning
        ];
        // winner game logic- 
        for (const pattern of winpatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return " Winner:" + board[a];
            }
        }
        return null;
    };
    // draw game logic- 
    const draw = () => {
        return board.every(cell => cell !== "") && !checkwin();
    };

    // placing marker for the game 'X' or 'O'
    const setcell = (index, marker) => {
        if (index >= 0 && index < board.length && board[index] === "") {
            board[index] = marker;
            return true;
        }
        return false;
    };

    const createplayer = (player_name, marker) => {
        return { player_name, marker };
    }

    const gamecontroller = (() => {
        let player1, player2, currentplayer;
        let gameactive = false;

        const startgame = (name1, name2) => {
            player1 = createplayer(name1, "X");
            player2 = createplayer(name2, "O");
            currentplayer = player1;
            gameboard.resetboard();
            gameactive = true;
            console.log(`Game Started! First player: ${currentplayer.player_name}`);
            // for writing value + string together always use `` instead of ''
        };

        const switchplayer = () => {
            currentplayer = currentplayer === player1 ? player2 : player1
        };
        const playmove = (index) => {
            if (!gameactive) return;
            if (gameboard.setcell(index, currentplayer.marker)) {
                console.log(`${currentplayer.player_name} placed ${currentplayer.marker} at ${index} `)
                    ;

                // check game status- 
                if (gameboard.checkwin()) {
                    console.log(`${currentplayer.player_name} wins!`);
                    gameactive = false;
                }
                else if (gameboard.draw()) {
                    console.log("It's tie!");
                    gameactive = false;
                }
                else {
                    switchplayer();
                    console.log(`next turn: ${currentplayer.player_name}`);
                }
            }
        };
        return { startgame, playmove };
    })();
    return { getboard, setcell, resetboard, checkwin, draw, gamecontroller };
})();
