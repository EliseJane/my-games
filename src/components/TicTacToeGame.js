import React, { Component } from 'react';

class TicTacToeGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [[null, null, null], [null, null, null], [null, null, null]],
      turn: 'human'
    };
  }

  getMousePosition = (e) => {
    const grid = document.querySelector('.grid');
    const rect = grid.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  handleClick = (e) => {
    e.stopPropagation();
    if (this.state.turn === 'human') {
      const pos = this.getMousePosition(e);
      this.humanTurn(pos.x, pos.y);
    }
  }

  humanTurn = (x, y) => {
    let row, col;

    if (y < 100) {
      row = 0;
    } else if (y < 200) {
      row = 1;
    } else if (y < 300) {
      row = 2;
    }

    if (x < 100) {
      col = 0;
    } else if (x < 200) {
      col = 1;
    } else if (x < 300) {
      col = 2;
    }

    if (this.state.grid[row][col] === null) {
      let grid = this.state.grid;
      grid[row][col] = "X";
      this.setState({grid: grid});
      this.stampSquareX(x, y);
      if (this.win("X")) {
        this.setState({turn: "humanWin"})
      } else {
        this.setState({turn: 'ai'});
        this.aiTurn();
      }
    }
  }

  stampSquareX = (x, y) => {
    let grid = document.querySelector('.grid');
    let ctx = grid.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(x-20, y-20);
    ctx.lineTo(x+20, y+20);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x-20, y+20);
    ctx.lineTo(x+20, y-20);
    ctx.stroke();
  }

  aiTurn = () => {
    console.log(this.state.grid);
    let square = this.findWinningSquare("O");
    if (square === null) {
      square = this.findWinningSquare("X");
    }
    if (square === null) {
      square = this.findBlankSquare();
    }
    if (square !== null) {
      this.markGrid(square);
      setTimeout(function(square) {
        this.stampSquareO(square)
      }.bind(this), 1000, square);
    } else {
      this.setState({turn: 'over'});
    }
  }

  markGrid = (square) => {
    let grid = this.state.grid;
    grid[square[0]][square[1]] = "O";
    this.setState({grid: grid});
  }

  findWinningSquare = (token) => {
    let grid = this.state.grid;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === null) {
          grid[i][j] = token;
          if (this.win(token, grid)) {
            return ([i, j]);
          } else {
            grid[i][j] = null;
          }
        }
      }
    }
    return null;
  }

  findBlankSquare = () => {
    let grid = this.state.grid;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === null) {
          return ([i, j]);
        }
      }
    }
    return null;
  }

  stampSquareO = (rowcol) => {
    let grid = document.querySelector('.grid');
    let ctx = grid.getContext('2d');
    let centerY = (rowcol[0]*100) + 50;
    let centerX = (rowcol[1]*100) + 50;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2, true);
    ctx.stroke();
    if (this.win("O")) {
      this.setState({turn: "aiWin"})
    } else {
      this.setState({turn: 'human'});
    }
  }

  win = (token, grid=this.state.grid) => {
    if (grid[0][0] === token && grid[0][1] === token && grid[0][2] === token) {
      return true;
    } else if (grid[1][0] === token && grid[1][1] === token && grid[1][2] === token) {
      return true;
    } else if (grid[2][0] === token && grid[2][1] === token && grid[2][2] === token) {
      return true;
    } else if (grid[0][0] === token && grid[1][0] === token && grid[2][0] === token) {
      return true;
    } else if (grid[0][1] === token && grid[1][1] === token && grid[2][1] === token) {
      return true;
    } else if (grid[0][2] === token && grid[1][2] === token && grid[2][2] === token) {
      return true;
    } else if (grid[0][0] === token && grid[1][1] === token && grid[2][2] === token) {
      return true;
    } else if (grid[0][2] === token && grid[1][1] === token && grid[2][0] === token) {
      return true;
    } else {
      return false;
    }
  }

  drawGrid = () => {
    let grid = document.querySelector('.grid');
    if (grid) {
      let ctx = grid.getContext('2d');
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 4;

      for (let i=0; i<=300; i+=100) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 300);
        ctx.stroke();
      }

      for (let j=0; j<=300; j+=100) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(300, j);
        ctx.stroke();
      }
    }
  }

  resetGrid = (e) => {
    e.stopPropagation();
    this.setState({turn: 'human', grid: [[null, null, null], [null, null, null], [null, null, null]]});
    let grid = document.querySelector('.grid');
    let ctx = grid.getContext('2d');
    ctx.clearRect(0, 0, 300, 300);
  }

  whoseTurn = () => {
    if (this.state.turn === 'ai') {
      return (<p className='turn'>my turn...</p>);
    } else if (this.state.turn === 'human') {
      return (<p className='turn'>your turn, stamp an empty square</p>);
    } else if (this.state.turn === 'over') {
      return (<p className='turn'>game over</p>);
    } else if (this.state.turn === 'aiWin') {
      return (<p className='turn'>computer won!</p>);
    } else if (this.state.turn === 'humanWin') {
      return (<p className='turn'>you won!</p>);
    }
  }

  render() {
    return (
      <div className='tttgame'>
        {this.whoseTurn()}
        <canvas
          className='grid'
          width='300px'
          height='300px'
          onClick={this.handleClick}
        ></canvas>
        {this.drawGrid()}
        <button onClick={this.resetGrid}>New Game</button>
      </div>
    );
  }
}

export default TicTacToeGame;
