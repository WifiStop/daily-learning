import React ,{useState,memo,useMemo}from 'react';
import ReactDOM from 'react-dom';

let lastCallback;
let lastCallbackDependencies;
export default function useCallback(callbackFn,dependencies){
  console.log(dependencies)
  if(lastCallbackDependencies){
    const changed = dependencies.every((item,index)=>item===lastCallbackDependencies[index])
    if(!changed){
      lastCallback =callbackFn;
      lastCallbackDependencies = dependencies
    }
  }else{
    lastCallback =callbackFn;
    lastCallbackDependencies = dependencies
  }
  return lastCallback;

}

function Child({data,test1}) {
    console.log(test1,"天啊，我怎么被渲染啦，我并不希望啊")

    const test = useMemo(()=>{
      console.log("====")
      return 1
    },[1])
    return (
        <div>child</div>
    )
}
// eslint-disable-next-line
Child = memo(Child)
function App(){
    const [count, setCount] = useState(0);
    const addClick = useCallback(()=>{console.log("addClick")},[])

        return (
        <div>
            
            <Child data={123} test1={addClick}></Child>
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