import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square
            n={i}
            value={this.props.getValue(i)}
            onClick={() => {this.props.onClick(i)}}
        />;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stepNumber: 0,
            history: [{squares: Array(9).fill(" "), player: 'X'}],
        }
    }

    renderBoard() {
        return <Board
            getValue={(i) => {return this.getValue(i)}}
            onClick={(i) => {this.handleClick(i)}}
        />
    }

    render() {
        const winningPlayer = this.checkWinner();
        const status = winningPlayer ? 'Winner: ' + winningPlayer + "!" : 'Next player: ' + this.state.history[this.state.stepNumber].player;
        return (
            <div className="game">
                <div className="game-board">
                    {this.renderBoard()}
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{this.getMoves()}</ol>
                </div>
            </div>
        );
    }

    getValue(i) {
        return this.state.history[this.state.stepNumber].squares[i];
    }

    handleClick(i) {
        if (this.checkWinner()) {
            return;
        }
        if (this.state.history[this.state.stepNumber].squares[i] === " ") {
            const history = this.state.history.slice(0, this.state.stepNumber + 1);
            const squares = history[history.length - 1].squares.slice();
            squares[i] = this.state.history[this.state.stepNumber].player;
            const nextPlayer = this.state.history[this.state.stepNumber].player === 'X' ? 'O': 'X';
            this.setState({history: history.concat([{squares: squares, player: nextPlayer}])});
            this.setState({stepNumber: this.state.stepNumber + 1});
        }
    }

    checkPlayerWinner(player) {
        const state = this.state.history[this.state.stepNumber].squares.join("");
        const winningStates = [
            new RegExp([player, player, player, "......"].join("")),
            new RegExp(["...", player, player, player, "..."].join("")),
            new RegExp(["......", player, player, player].join("")),
            new RegExp(["..", player, ".", player, ".", player, ".."].join("")),
            new RegExp([player, "..", player, "..", player].join("")),
            new RegExp([player, "...", player, "...", player].join("")),
        ];
        for (const re of winningStates) {
            if (re.exec(state)) {
                console.log("Winner " + player + "!");
                return true;
            }
        }
        return false;
    }

    checkWinner() {
        if (this.checkPlayerWinner('X')) {
            return 'X';
        }
        if (this.checkPlayerWinner('O')) {
            return 'O';
        }
        return undefined;
    }

    getMoves() {
        const moveSelect = (move) => {
            this.setState({stepNumber: move})
        }
        return this.state.history.map((step, move) => {
            const desc = move ? `Go to move # ${move}` : "Go to game start";
            return (
                <li key={move}>
                    <button onClick={() => {moveSelect(move)}}>{desc}</button>
                </li>
            );
        });
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);