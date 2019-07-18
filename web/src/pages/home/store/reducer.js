import { fromJS } from "immutable";  //确保源state不被更改

const defaultState = fromJS({
  number: 0,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'add_action':   
      return state.set('number', fromJS(state.get('number') + action.value))  //单个赋值 set 多个赋值merge({})
    default:
      return state;
  }
}