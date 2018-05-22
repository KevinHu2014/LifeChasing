import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import './HeatMap.css';

class HeatMapRecord extends Component {
  componentDidMount() {
    console.log(this.props.light);
  }
  HandleTouch(e) {
    // console.log(e.targetTouches[0]);
    // console.log(e.targetTouches[0].clientX);
    // console.log(e.targetTouches[0].clientY);
    // console.log(e.targetTouches[0].radiusX);
    // console.log(e.targetTouches[0].radiusY);
    // console.log(window.innerWidth);
    // console.log(window.innerHeight);
    this.props.firebase.push(
      'touch',
      {
        userUid: this.props.firebaseAuth.uid,
        gameUid: this.props.gameKey,
        time: new Date().getTime(),
        width: window.innerWidth,
        height: window.innerHeight,
        radiusX: e.targetTouches[0].radiusX,
        radiusY: e.targetTouches[0].radiusY,
        page: this.props.page,
        clientX: e.targetTouches[0].clientX,
        clientY: e.targetTouches[0].clientY,
      },
    );
  }
  render() {
    return (
      <div
        onTouchStart={(e) => {
          this.HandleTouch(e);
        }}
        className={this.props.light ? 'HeatMap_Light_On' : 'HeatMap_Light_Off'}
        role="presentation"
      >
        {this.props.children}
      </div>
    );
  }
}

HeatMapRecord.propTypes = {
  light: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  gameKey: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  firebase: PropTypes.shape().isRequired,
  firebaseAuth: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    firebaseAuth: state.firebase.auth,
  };
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(HeatMapRecord);
