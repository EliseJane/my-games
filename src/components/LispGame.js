import React, { Component } from 'react';
import Expression from './Expression';
import Tokens from './Tokens';

class LispGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: [],
      error: null
    };
  }
// add (add 2 3) (sub 3 1)  =  gives 5, should give 7
// add ( sub 4 1 ) 9  =  gives -6, should give 12
  processLisp = (tokens=this.state.tokens, stack=[]) => {
    let i = tokens.length - 1; // last index
    let subproblem = []; // in case parentheses are encountered

    while (i >= 0) { // until the first index
      if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(tokens[i]))) {  // if token is an operand
        stack.push(Number(tokens[i]));  // add it to the stack
      } else if (tokens[i] === "add") { // if token is add
        stack.push(stack.pop() + stack.pop()); // pop 2 off the stack and add sum to stack
      } else if (tokens[i] === "sub") { // if token is sub
        stack.push(stack.pop() - stack.pop()); // pop 2 off the stack and add difference to stack
      } else if (tokens[i] === ")") { // if close parenthesis, from here to open parenthesis will be subproblem
        i-- // skip it
        while (tokens[i] !== "(") { // as long as we're in the subproblem
          subproblem.unshift(tokens[i]); // add to beginning of subproblem
          i--; // and move back one
        }
        this.processLisp(subproblem, stack); // then process subproblem, ultimately adding result to original stack
        subproblem = [];
      }
      i--; // go back an index
    }
    this.setState({tokens: stack});
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
