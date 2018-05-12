import React, { Component, PropTypes } from 'react';

class HeatMapRecord extends Component {
  HandleTouch(e) {
    console.log(this.state);
    console.log(e.targetTouches[0].clientX);
    console.log(e.targetTouches[0].clientY);
  }
  render() {
    return (
      <div
        onTouchStart={(e) => {
          // console.log(e.targetTouches[0].pageX);
          console.log(this.props.gameKey);
          this.HandleTouch(e);
        }}
        role="presentation"
      >
        {this.props.children}
      </div>
    );
  }
}

HeatMapRecord.propTypes = {
  children: PropTypes.node.isRequired,
  gameKey: PropTypes.string.isRequired,
};

export default HeatMapRecord;
