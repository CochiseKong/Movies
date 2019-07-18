import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { HomeWrapper } from "./style";

class Home extends Component {

  render() {
    const { number, add } = this.props
    return (
      <div>
        <HomeWrapper>
          {number} <button onClick={add}>点击</button>
        </HomeWrapper>
      </div>
    );
  }
}

const mapState = (state) => ({
  number: state.getIn(['home', 'number'])
})

const mapDispacth = (dispatch) => ({
  add() {
    let action = {
      type: 'add_action',
      value: 1
    }
    dispatch(action)

  }
})

export default connect(mapState, mapDispacth)(withRouter(Home));