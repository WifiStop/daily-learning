import React ,{useState,memo}from 'react';
import ReactDOM from 'react-dom';
let lastMemo
// eslint-disable-next-line
let lastMemoDependencies
function useMemo(callback,dependencies){
  if(lastMemoDependencies){
    const changed = dependencies.every((item,index)=>item === lastMemoDependencies[index])
    if(!changed){
      lastMemo = callback;
    lastMemoDependencies =dependencies
    }
  }else{
    lastMemo = callback;
    lastMemoDependencies =dependencies
  }
}
function Child({data}) {
    console.log("天啊，我怎么被渲染啦，我并不希望啊")
    return (
        <div>child</div>
    )
}
// eslint-disable-next-line
Child = memo(Child)
function App(){
    const [count, setCount] = useState(0);
    // eslint-disable-next-line
    const [number, setNumber] = useState(20)
    let data = useMemo(()=> ({number}),[number])
    return (
        <div>
            
            <Child data={data}></Child>
            <button onClick={() => { setCount(count + 1)}}>
                增加
            </button>
        </div>
    );
}
function render(){
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
}
render()
