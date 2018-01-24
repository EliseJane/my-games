import React, { Component } from 'react';
import TicTacToeGame from './TicTacToeGame';

class TicTacToePanel extends Component {
  render() {
    return (
      <div className='tictactoe' onClick={this.props.handleClick}>
        Tic Tac Toe
        <TicTacToeGame />
      </div>
    );
  }
}

export default TicTacToePanel;
