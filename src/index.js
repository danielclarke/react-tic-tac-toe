import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    console.log(props.n);
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
            squares: Array(9).fill(null),
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
        let squares = this.state.squares.slice();
        squares[i] = this.state.player;
        this.setState({squares: squares});
        this.setState({player: this.state.player === 'X' ? 'O': 'X'});
        console.log('click');
    }

    render() {
        console.log('render board');
        const status = 'Next player: ' + this.state.player;

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