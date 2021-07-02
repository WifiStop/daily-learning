const sleep = delay => {
  for (let start = Date.now(); Date.now() - start <= delay;) {}
}
let taskQueue = [
  () => {
    console.log('task1 start')
    sleep(20)
    console.log('task1 end')
  },
  () => {
    console.log('task2 start')
    sleep(20)
    console.log('task2 end')
  },
  () => {
    console.log('task3 start')
    sleep(20)
    console.log('task3 end')
  }
]
const performUnitwork = ()=>{
  taskQueue.shift()()
}
const workloop = (deadline)=>{
  console.log(`此帧的剩余时间为: ${deadline.timeRemaining()}`);
  while((deadline.timeRemaining()>0||deadline.didTimeout)&&taskQueue.length>0){
    performUnitwork()
  }
  if(taskQueue.length>0){
    requestIdleCallback(workloop,{timeout:1000})
  }
}
requestIdleCallback(workloop,{timeout:1000})
