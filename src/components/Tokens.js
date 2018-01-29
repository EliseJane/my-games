import React, { Component } from 'react';

class Tokens extends Component {
  render() {
    return (
      <div className='tokens'>
        <button value={0} onClick={this.props.handleClick}>0</button>
        <button value={1} onClick={this.props.handleClick}>1</button>
        <button value={2} onClick={this.props.handleClick}>2</button>
        <button value={3} onClick={this.props.handleClick}>3</button>
        <button value={4} onClick={this.props.handleClick}>4</button>
        <button value={5} onClick={this.props.handleClick}>5</button>
        <button value={6} onClick={this.props.handleClick}>6</button>
        <button value={7} onClick={this.props.handleClick}>7</button>
        <button value={8} onClick={this.props.handleClick}>8</button>
        <button value={9} onClick={this.props.handleClick}>9</button>
        <br/>
        <button value="add" onClick={this.props.handleClick}>+</button>
        <button value="sub" onClick={this.props.handleClick}>-</button>
        <button value="mul" onClick={this.props.handleClick}>x</button>
        <button value="div" onClick={this.props.handleClick}>/</button>
        <button value="(" onClick={this.props.handleClick}>(</button>
        <button value=")" onClick={this.props.handleClick}>)</button>
        <button value="back" onClick={this.props.handleDelete}>&#8592;</button>
        <button value="submit" onClick={this.props.handleSubmit}>=</button>
      </div>
    );
  }
}

export default Tokens;
