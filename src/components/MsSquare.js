import React, { Component } from 'react';

class MsSquare extends Component {
  constructor(props) {
    super(props);
    this.state = { flipped: this.props.flipped };
  }

  handleClick = (e) => {
    e.stopPropagation();
    this.setState({flipped: 'true'});
  }

  render() {
    const cn = this.state.flipped === 'true' ? 'card flip' : 'card';;
    return (
      <div className='square' onClick={this.handleClick}>
        <div className={cn}>
          <div className='front'>
            <strong>?</strong>
          </div>
          <div className='back'>
            <strong>{this.props.back}</strong>
          </div>
        </div>
      </div>
    );
  }
}

export default MsSquare;
