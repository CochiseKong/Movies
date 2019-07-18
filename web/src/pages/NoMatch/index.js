import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {

  };
}

class NoNatch extends Component {
  render() {
    return (
      <div>
        404
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(NoNatch);