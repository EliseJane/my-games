import React, { Component } from 'react';
import DeckOfCardsGame from './DeckOfCardsGame';

class DeckOfCardsPanel extends Component {
  render() {
    return (
      <div className='deck' onClick={this.props.handleClick}>
        Deck of Playing Cards
        <DeckOfCardsGame />
      </div>
    );
  }
}

export default DeckOfCardsPanel;
