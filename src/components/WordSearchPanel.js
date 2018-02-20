import React, { Component } from 'react';
import WordSearchGame from './WordSearchGame';

class WordSearchPanel extends Component {
  render() {
    return (
      <div className='wordsearch' onClick={this.props.handleClick}>
        Word Search
        <WordSearchGame />
      </div>
    );
  }
}

export default WordSearchPanel;
