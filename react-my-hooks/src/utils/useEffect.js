import React, { useState } from 'react';
import ReactDOM from 'react-dom';

//简易版实现
let lastEffectDependencies;
export default function useEffect(callback, dependencies) {
  if (lastEffectDependencies) {
    const changed = dependencies.every((item, index) => {
      return item === lastEffectDependencies[index]
    })
    if (!changed) {
      setTimeout(callback())
      lastEffectDependencies = dependencies
    }
  } else {
    setTimeout(callback())
    lastEffectDependencies = dependencies
  }
}
function App() {
  let [number, setNumber] = useState(0)
  useEffect(() => {
    console.log(number);
  }, [number])
  return (

    <div>
      <h1>{number}</h1>
      <button onClick={() => setNumber(number + 1)}>+</button>
    </div>
  )
}
function render() {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}
render()
