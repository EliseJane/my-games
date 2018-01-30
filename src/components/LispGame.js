import React, { Component } from 'react';
import Expression from './Expression';
import Tokens from './Tokens';

class LispGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: [],
      error: "operator then two operands"
    };
  }

  processLisp = (tokens=this.state.tokens, stack=[]) => {
    let numStack = [];
    let opStack = [];

    tokens.forEach((token => {
      if (!isNaN(Number(token))) {
        numStack.push(Number(token));
      } else if (token === ')') {
        while (opStack[opStack.length-1] !== '(') {
          let op = opStack.pop();
          let num2 = numStack.pop();
          let num1 = numStack.pop();
          numStack.push(this.applyOp(num1, num2, op));
        }
        opStack.pop();
      } else {
        opStack.push(token);
      }
    }));

    while (numStack.length > 1) {
      let op = opStack.pop();
      let num1 = numStack.pop();
      let num2 = numStack.pop();
      numStack.push(this.applyOp(num1, num2, op));
    }

    if (numStack.length === 0 || isNaN(numStack[0])) {
      this.setState({error: "invalid expression"});
    } else {
      this.setState({tokens: numStack, error: "operator then two operands"});
    }
  }

  applyOp = (num1, num2, op) => {
    if (op === 'add') {
      return num1 + num2;
    } else if (op === 'sub') {
      return num1 - num2;
    }
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
        <p className='error'>{this.state.error}</p>
        <Tokens handleDelete={this.backspaceClick} handleClick={this.tokenClick} handleSubmit={this.equalClick} />
      </div>
    );
  }
}

export default LispGame;
