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
        let value = this.props.getValue(i);
        return <Square
            n={i}
            value={value}
            onClick={() => {this.props.onClick(i)}}
        />;
    }

    render() {
        return (
            <div>
                <div className="status">{this.props.status}</div>
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
            player: 'X',
            history: [{squares: Array(9).fill(" ")}],
        }
    }

    renderBoard(status) {
        return <Board 
            status={status}
            getValue={(i) => {return this.getValue(i)}}
            onClick={(i) => {this.handleClick(i)}}
        />
    }

    render() {
        let status = 'Next player: ' + this.state.player;
        const winningPlayer = this.checkWinner();
        if (winningPlayer) {
            status = 'Winner: ' + winningPlayer + "!";
        }
        return (
            <div className="game">
                <div className="game-board">
                    {this.renderBoard(status)}
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }

    getValue(i) {
        let value = this.state.history[this.state.history.length - 1].squares[i];
        return value;
    }

    handleClick(i) {
        if (this.checkWinner()) {
            return;
        }
        if (this.state.history[this.state.history.length - 1].squares[i] === " ") {
            let history = this.state.history.slice();
            let squares = history[history.length - 1].squares.slice();
            squares[i] = this.state.player;
            history.push({squares: squares});
            this.setState({history: history});
            this.setState({player: this.state.player === 'X' ? 'O': 'X'});
            console.log(history);
        }
    }

    checkPlayerWinner(player) {
        const state = this.state.history[this.state.history.length - 1].squares.join("");
        let winner = false;
        let winningStates = [
            new RegExp([player, player, player, "......"].join("")),
            new RegExp(["...", player, player, player, "..."].join("")),
            new RegExp(["......", player, player, player].join("")),
            new RegExp(["..", player, ".", player, ".", player, ".."].join("")),
            new RegExp([player, "..", player, "..", player].join("")),
            new RegExp([player, "...", player, "...", player].join("")),
        ];
        winningStates.forEach(
            (re) => {
                if (re.exec(state)) {
                    console.log("Winner " + player + "!");
                    winner = true;
                }
            }
        )
        return winner;
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
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);