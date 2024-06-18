import { useState } from "react";
import Card from '../Card/Card';
import './Grid.css';
import IsWinner from "../../helpers/checkWinner";

function Grid({ numberOfCards }) {
    const [board, setBoard] = useState(Array(numberOfCards).fill(""));
    const [turn, setTurn] = useState(true); // true => O, false => X
    const [winner, setWinner] = useState(null);

    function play(index) {
        if (board[index] || winner) return; // Prevent play if cell is already filled or if there is a winner

        const newBoard = [...board];
        newBoard[index] = turn ? "O" : "X";

        const win = IsWinner(newBoard, turn ? "O" : "X"); // Check if there is a winner

        setBoard(newBoard);
        setTurn(!turn);
        if (win) {
            setWinner(win);
        }
    }

    function resetGame() {
        setBoard(Array(numberOfCards).fill(""));
        setTurn(true);
        setWinner(null);
    }

    return (
        <div className="grid-wrapper">
            {winner && (
                <>
                    <h1 className="turn-highlight">Winner is {winner}</h1>
                    
                </>
            )}
            {!winner && <h1 className="turn-highlight">Current turn: {turn ? "O" : "X"}</h1>}

            <div className="grid">
                {board.map((el, idx) => (
                    <Card key={idx} onPlay={play} player={el} index={idx} />
                ))}
            </div>
            {winner && (
                <div className="another"> <button className="reset" onClick={resetGame}>Reset Game</button></div>
               
            )}
        </div>
    );
}

export default Grid;
