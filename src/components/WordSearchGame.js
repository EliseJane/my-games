import React, { Component } from 'react';
import { grid1, words1 } from '../wordSearches/test1';
import { grid2, words2 } from '../wordSearches/test2';

class WordSearchGame extends Component {
  constructor () {
    super();

    this.state = {
      grid: null,
      words: null,
      game: false
    }
  }

  testCase1 = () => {
    this.setState({
      grid: grid1,
      words: words1,
    }, this.runWS);
  }

  testCase2 = () => {
    this.setState({
      grid: grid2,
      words: words2,
    }, this.runWS);
  }

  runWS = () => {
    const grid = this.state.grid;
    const words = this.state.words;

    let matches = {};

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        words.forEach(word => {
          if (word[0] === grid[row][col]) {
            if (row > 0 && word[1] === grid[row-1][col]) {
              if (!(word in matches)) {
                if (this.searchAround(grid, word, row, col, "up", null)) {
                  matches[word] = [row, col];
                }
              }
            }
            if (row > 0 && col+1 < grid[0].length && word[1] === grid[row-1][col+1]) {
              if (!(word in matches)) {
                if (this.searchAround(grid, word, row, col, "up", "right")) {
                  matches[word] = [row, col];
                }
              }
            }
            if (col+1 < grid[0].length && word[1] === grid[row][col+1]) {
              if (!(word in matches)) {
                if (this.searchAround(grid, word, row, col, null, "right")) {
                  matches[word] = [row, col]
                }
              }
            }
            if (row+1 < grid.length && col+1 < grid[0].length && word[1] === grid[row+1][col+1]) {
              if (!(word in matches)) {
                if (this.searchAround(grid, word, row, col, "down", "right")) {
                  matches[word] = [row, col];
                }
              }
            }
            if (row+1 < grid.length && word[1] === grid[row+1][col]) {
              if (!(word in matches)) {
                if (this.searchAround(grid, word, row, col, "down", null)) {
                  matches[word] = [row, col];
                }
              }
            }
            if (row+1 < grid.length && col > 0 && word[1] === grid[row+1][col-1]) {
              if (!(word in matches)) {
                if (this.searchAround(grid, word, row, col, "down", "left")) {
                  matches[word] = [row, col];
                }
              }
            }
            if (col > 0 && word[1] === grid[row][col-1]) {
              if (!(word in matches)) {
                if (this.searchAround(grid, word, row, col, "left")) {
                  matches[word] = [row, col];
                }
              }
            }
            if (row > 0 && col > 0 && word[1] === grid[row-1][col-1]) {
              if (!(word in matches)) {
                if (this.searchAround(grid, word, row, col, "up", "left")) {
                  matches[word] = [row, col];
                }
              }
            }
          }
        });
      }
    }
    let result = "matches: \n";
    for (let word in matches) {
      result += word;
      result += " ";
      result += matches[word][0];
      result += " ";
      result += matches[word][1];
      result += '\n';
    }
    alert(result);
    this.setState({
      grid: [],
      words: []
    });
  }

  searchAround = (grid, word, row, col, ver, hor) => {
    for (let letter = 0; letter < word.length; letter++) {
      if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] !== word[letter]) {
        return false;
      }

      if (ver === "up") {
        row = row - 1;
      } else if (ver === "down") {
        row = row + 1;
      }

      if (hor === "left") {
        col = col - 1;
      } else if (hor === "right") {
        col = col + 1;
      }
    }
    return true;
  }

  render() {
    return (
      <div className='wsgame'>
        <button onClick={this.testCase1}>Run test 1</button>
        <button onClick={this.testCase2}>Run test 2</button>
        <p>Someday there will be a visual representation of the word search grid here.</p>
      </div>
    );
  }
}

export default WordSearchGame;
