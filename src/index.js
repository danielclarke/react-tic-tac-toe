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
    constructor(props) {
        super(props);
        this.state = {
            player: 'X',
            squares: Array(9).fill(" "),
        }
    }

    renderSquare(i) {
        return <Square
            n={i}
            value={this.state.squares[i]}
            onClick={() => {this.handleClick(i);}}
        />;
    }

    handleClick(i) {
        if (this.checkWinner()) {
            return;
        }
        let squares = this.state.squares.slice();
        squares[i] = this.state.player;
        this.setState({squares: squares}, () => {this.checkWinner()});
        this.setState({player: this.state.player === 'X' ? 'O': 'X'});
    }

    checkWinner() {
        const state = this.state.squares.join("");
        const player = this.state.player === 'X' ? 'O': 'X';
        let winningStates = [
            new RegExp([player, player, player].join("")),
            new RegExp([player, ".", player, ".", player].join("")),
            new RegExp([player, "..", player, "..", player].join("")),
            new RegExp([player, "...", player, "...", player].join("")),
        ];
        winningStates.forEach(
            (re) => {
                console.log(re.exec(state));
                if (re.exec(state)) {
                    console.log("Winner " + player + "!");
                    // this.setState({player: "Winner " + player + "!"})
                    return true;
                }
            }
        )
        return false;
    }

    render() {
        let status;
        if (this.checkWinner()) {
            status = 'Winner: ' + this.state.player + "!";
        } else {
            status = 'Next player: ' + this.state.player;
        }
        return (
            <div>
                <div className="status">{status}</div>
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
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);