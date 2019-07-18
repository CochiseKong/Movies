import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {

  };
}

class Login extends Component {
  render() {
    return (
      <div>
        登录页
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Login);