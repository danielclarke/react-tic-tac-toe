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
        const winningPlayer = this.checkWinner();
        const status = winningPlayer ? 'Winner: ' + winningPlayer + "!" : 'Next player: ' + this.state.player;
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
        return this.state.history[this.state.history.length - 1].squares[i];
    }

    handleClick(i) {
        if (this.checkWinner()) {
            return;
        }
        if (this.state.history[this.state.history.length - 1].squares[i] === " ") {
            const history = this.state.history;
            const squares = history[history.length - 1].squares.slice();
            squares[i] = this.state.player;
            this.setState({history: history.concat([{squares: squares}])});
            this.setState({player: this.state.player === 'X' ? 'O': 'X'});
        }
    }

    checkPlayerWinner(player) {
        const state = this.state.history[this.state.history.length - 1].squares.join("");
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
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);