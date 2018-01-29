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

  processLisp = (tokens=this.state.tokens, stack=[]) => {
    let i = tokens.length - 1; // last index
    let subproblem = []; // in case parentheses are encountered

    while (i >= 0) { // until the first index
      if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(tokens[i]))) {  // if token is an operand
        stack.push(Number(tokens[i]));  // add it to the stack
      } else if (tokens[i] === "add") { // if token is add
        let sum = stack.pop();  // pop off the stack
        while ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(stack[stack.length-1]))) {
          sum += stack.pop(); // and add all numbers popped off the stack to this sum
        }
        stack.push(sum); // then push that sum back on the stack to replace the operands
      } else if (tokens[i] === "sub") { // if token is sub
        let difference = stack.pop();  // pop off the stack
        while ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(stack[stack.length-1]))) {
          difference -= stack.pop(); // and subtract all numbers popped off the stack from this difference
        }
        stack.push(difference); // then push that difference back on the stack to replace the operands
      } else if (tokens[i] === "mul") { // if token is mul
        let product = stack.pop();  // pop off the stack
        while ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(stack[stack.length-1]))) {
          product *= stack.pop(); // and multiply all numbers popped off the stack with this product
        }
        stack.push(product); // then push that product back on the stack to replace the operands
      } else if (tokens[i] === "div") { // if token is div
        let quotient = stack.pop();  // pop off the stack
        while ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(stack[stack.length-1]))) {
          quotient /= stack.pop(); // and divide this quotient by all numbers popped off the stack
        }
        stack.push(quotient); // then push that quotient back on the stack to replace the operands
      } else if (tokens[i] === ")") { // if close parenthesis, from here to open parenthesis will be subproblem
        i-- // skip it
        while (tokens[i] !== "(") { // as long as we're in the subproblem
          subproblem.unshift(tokens[i]); // add to beginning of subproblem
          i--; // and move back one
        }
        this.processLisp(subproblem, stack); // then process subproblem, ultimately adding result to original stack
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
