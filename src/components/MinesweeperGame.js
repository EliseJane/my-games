import React, { Component } from 'react';
import MsSquare from './MsSquare';

class MinesweeperGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [[null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null]
          ],
      bombs: 0
    };
  }

  handleChange = (e) => {
    this.setState({bombs: Number(e.target.value)})
  }

  createGrid = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let grid = [[null, null, null, null, null],
          [null, null, null, null, null],
          [null, null, null, null, null],
          [null, null, null, null, null],
          [null, null, null, null, null]
        ];
    grid = this.setBombs(grid, this.state.bombs);
    grid = this.setFlags(grid);

    this.setState({grid: grid});
    this.printCards();
  }

  setBombs = (grid, bombs) => {
    let bomb = 0
    while (bomb < bombs) {
      let randRow = Math.floor(Math.random() * Math.floor(5));
      let randCol = Math.floor(Math.random() * Math.floor(5));
      if (grid[randRow][randCol] === null) {
        grid[randRow][randCol] = true;
        bomb++;
      }
    }
    return grid;
  }

  setFlags = (grid) => {
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (grid[row][col] === null) {
          let bombs = 0;
          if (col > 0 && grid[row][col-1] === true) {
            bombs++;
          }
          if (col < 4 && grid[row][col+1] === true) {
            bombs++;
          }
          if (row > 0 && grid[row-1][col] === true) {
            bombs++;
          }
          if (row < 4 && grid[row+1][col] === true) {
            bombs++;
          }
          if (row > 0 && col > 0 && grid[row-1][col-1] === true) {
            bombs++;
          }
          if (row < 4 && col > 0 && grid[row+1][col-1] === true) {
            bombs++;
          }
          if (row < 4 && col < 4 && grid[row+1][col+1] === true) {
            bombs++;
          }
          if (row > 0 && col < 4 && grid[row-1][col+1] === true) {
            bombs++;
          }
          grid[row][col] = bombs;
        }
      }
    }
    return grid;
  }

  printCards = () => {
    let squares = [];
    let grid = this.state.grid;
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        squares.push(<MsSquare
          back={grid[row][col]}
          flipped="false"
          key={(row+1)*(col+10)}
        />);
      }
    }
    return squares;
  }

  stop = (e) => {
    e.stopPropagation();
  }

  render() {
    return (
      <div className='msgame'>
        <p>Avoid the bombs!</p>
        <form onClick={this.stop} onSubmit={this.createGrid} id='todo'>
          <select onChange={this.handleChange}>
            <option value='1'>1 bomb</option>
            <option value='2'>2 bombs</option>
            <option value='3'>3 bombs</option>
            <option value='4'>4 bombs</option>
            <option value='5'>5 bombs</option>
            <option value='6'>6 bombs</option>
            <option value='7'>7 bombs</option>
            <option value='8'>8 bombs</option>
            <option value='9'>9 bombs</option>
            <option value='10'>10 bombs</option>
          </select>
          <input type='submit' value='New Game' />
        </form>
        {this.printCards()}
      </div>
    );
  }
}

export default MinesweeperGame;
