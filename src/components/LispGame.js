import React, { Component } from 'react';
import Expression from './Expression';
import Tokens from './Tokens';

class LispGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: []
    };
  }

  processLisp = () => {
    let answer = 0;

// lisp algorithm here

    this.setState({tokens: [answer]});
  }

  tokenClick = (e) => {
    e.stopPropagation();
    let tokens = this.state.tokens;
    tokens.push(e.target.value);
    this.setState({tokens: tokens});
  }

  equalClick = (e) => {
    e.stopPropagation();
    this.processLisp();
  }

  backspaceClick = (e) => {
    e.stopPropagation();
    let tokens = this.state.tokens;
    tokens.pop();
    this.setState({tokens: tokens});
  }

  render() {
    return (
      <div className='lgame'>
        enter your expression, press = to compute
        <Expression tokens={this.state.tokens} />
        <Tokens handleDelete={this.backspaceClick} handleClick={this.tokenClick} handleSubmit={this.equalClick} />
      </div>
    );
  }
}

export default LispGame;
