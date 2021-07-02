const rootFiber = A1


const beginWork = (Fiber)=>{
  console.log(`${Fiber.key} start`)
}
const completeUnitWork = (Fiber)=>{
  console.log(`${Fiber.key} end`)
}

const performUnitOfWork = (Fiber)=>{
  beginWork(Fiber)
  if(Fiber.child){
    return Fiber.child
  }
  while(Fiber){
    completeUnitWork(Fiber);
    if(Fiber.sibling){
      return Fiber.sibling
    }
    Fiber = Fiber.return
  }
}

const workloop = (nextUnitOfWork) =>{
  while(nextUnitOfWork){
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }
  if(!nextUnitOfWork) console.log('reconciliation阶段结束')
}
workloop(rootFiber)