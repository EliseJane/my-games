import React, { Component } from 'react';
const UUID = require('uuid/v4');

class Expression extends Component {
  render() {
    const tokens = this.props.tokens.map((token) => {
      return (<span key={UUID()} className='token'>{token}</span>);
    });

    return (
      <div className='expression'>
        {tokens}
      </div>
    );
  }
}

export default Expression;
