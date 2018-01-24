import React, { Component } from 'react';
import LispGame from './LispGame';

class LispPanel extends Component {
  render() {
    return (
      <div className='lisp' onClick={this.props.handleClick}>
        Lisp Calculator
        <LispGame />
      </div>
    );
  }
}

export default LispPanel;
