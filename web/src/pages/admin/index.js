import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {

  };
}

class Admin extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Admin);