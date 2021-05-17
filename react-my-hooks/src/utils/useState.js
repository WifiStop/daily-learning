import ReactDOM from 'react-dom';
 
 let lastStateArr=[];
 let stateIndex = -1
 export default function useState(initState){
  stateIndex += 1
  const stateId = stateIndex;
  if (lastStateArr[stateId]) {
    return lastStateArr[stateId];
  }
  const setState = (value) => {
    lastStateArr[stateId][0] = value;
    render()
    stateIndex = -1
  };
  const tuple = [initState, setState];
  lastStateArr[stateId] = tuple;
 
  return tuple
}
function App() {
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(1);
  return (
      <div>
          {count}<br/>
          {count1}<br/>
          <button
              onClick={() => {
                  setCount(count + 1);
                  setCount1(count1 + 1);
              }}
          >
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
