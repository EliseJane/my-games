import React, { Component } from 'react';
import MinesweeperGame from './MinesweeperGame';

class Minesweeper extends Component {
  render() {
    return (
      <div className='minesweeper' onClick={this.props.handleClick}>
        Minesweeper
        <MinesweeperGame />
      </div>
    );
  }
}

export default Minesweeper;
