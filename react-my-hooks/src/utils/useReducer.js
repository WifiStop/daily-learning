import React from 'react';
import ReactDOM from 'react-dom';

let lastState;
export default function useReducer(reducer,initialState){
    lastState = lastState || initialState;
    function dispatch(action){
        lastState = reducer(lastState,action)
        render()
    }
    return[lastState,dispatch]
}
// 官方 useReducer Demo
// 第一个参数：应用的初始化
const initialState = {count: 0};

// 第二个参数：state的reducer处理函数
 function reducer(state, action) {
    switch (action.type) {
        case 'increment':
          return {count: state.count + 1};
        case 'decrement':
           return {count: state.count - 1};
        default:
            throw new Error();
    }
}

function App() {
    // 返回值：最新的state和dispatch函数
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            Count: {state.count}<br/>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        </>
    );
}
function render(){
  ReactDOM.render(
      <App />,
      document.getElementById('root')
  );
}
render()
