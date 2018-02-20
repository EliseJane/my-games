import React, { Component } from 'react';
import '../App.css';
import LispPanel from './LispPanel';
import TicTacToePanel from './TicTacToePanel';
import MinesweeperPanel from './MinesweeperPanel';
import WordSearchPanel from './WordSearchPanel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lisp: false,
      minesweeper: false,
      tictactoe: false,
      wordsearch: false
    };
  }

  wordSearchClick = () => {
    if (this.state.wordsearch === false) {
      this.setState({minesweeper: false}, this.closeMinesweeper);
      this.setState({tictactoe: false}, this.closeTicTacToe);
      this.setState({lisp: false}, this.closeLisp);
      this.setState({wordsearch: true}, this.openWordSearch);
    } else {
      this.setState({wordsearch: false}, this.closeWordSearch);
    }
  }

  openWordSearch = () => {
    document.querySelector('.wordsearch').style.zIndex = '1';
    document.querySelector('.wordsearch').style.height = '100%';
    document.querySelector('.wsgame').style.visibility = "visible";
  }

  closeWordSearch = () => {
    document.querySelector('.wordsearch').style.zIndex = '3';
    document.querySelector('.wordsearch').style.height = '120px';
    document.querySelector('.wsgame').style.visibility = "hidden";
  }

  lispClick = () => {
    if (this.state.lisp === false) {
      this.setState({minesweeper: false}, this.closeMinesweeper);
      this.setState({tictactoe: false}, this.closeTicTacToe);
      this.setState({lisp: false}, this.closeDeckOfCards);
      this.setState({lisp: true}, this.openLisp);
    } else {
      this.setState({lisp: false}, this.closeLisp);
    }
  }

  openLisp = () => {
    document.querySelector('.lisp').style.zIndex = '1';
    document.querySelector('.lisp').style.width = '100%';
    document.querySelector('.lgame').style.visibility = "visible";
  }

  closeLisp = () => {
    document.querySelector('.lisp').style.zIndex = '2';
    document.querySelector('.lisp').style.width = '120px';
    document.querySelector('.lgame').style.visibility = "hidden";
  }

  minesweeperClick = () => {
    if (this.state.minesweeper === false) {
      this.setState({lisp: false}, this.closeLisp);
      this.setState({tictactoe: false}, this.closeTicTacToe);
      this.setState({lisp: false}, this.closeDeckOfCards);
      this.setState({minesweeper: true}, this.openMinesweeper);
    } else {
      this.setState({minesweeper: false}, this.closeMinesweeper);
    }
  }

  openMinesweeper = () => {
    document.querySelector('.minesweeper').style.zIndex = '1';
    document.querySelector('.minesweeper').style.width = '100%';
    document.querySelector('.msgame').style.visibility = "visible";
  }

  closeMinesweeper = () => {
    document.querySelector('.minesweeper').style.zIndex = '2';
    document.querySelector('.minesweeper').style.width = '120px';
    document.querySelector('.msgame').style.visibility = "hidden";
  }

  ticTacToeClick = () => {
    if (this.state.tictactoe === false) {
      this.setState({lisp: false}, this.closeLisp);
      this.setState({minesweeper: false}, this.closeMinesweeper);
      this.setState({lisp: false}, this.closeDeckOfCards);
      this.setState({tictactoe: true}, this.openTicTacToe);
    } else {
      this.setState({tictactoe: false}, this.closeTicTacToe);
    }
  }

  openTicTacToe = () => {
    document.querySelector('.tictactoe').style.zIndex = '1';
    document.querySelector('.tictactoe').style.height = '100%';
    document.querySelector('.tictactoe').style.padding = '150px 50px 50px 50px';
    document.querySelector('.tttgame').style.visibility = "visible";
  }

  closeTicTacToe = () => {
    document.querySelector('.tictactoe').style.zIndex = '3';
    document.querySelector('.tictactoe').style.height = '120px';
    document.querySelector('.tictactoe').style.padding = '50px';
    document.querySelector('.tttgame').style.visibility = "hidden";
  }

  render() {
    return (
      <div className="App">
        <WordSearchPanel handleClick={this.wordSearchClick} />
        <LispPanel handleClick={this.lispClick} />
        <TicTacToePanel handleClick={this.ticTacToeClick} />
        <MinesweeperPanel handleClick={this.minesweeperClick} />
        <p className="App-intro">
          <span className="App-title">My React Games</span>
          I made this single page app and various "games" to review
          technologies and algorithms that have come up in my interview
          process. Enjoy!
        </p>
      </div>
    );
  }
}

export default App;
