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
};

export default HeatMapRecord;
