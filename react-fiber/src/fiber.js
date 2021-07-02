
const reconcileChildren = (currentFilber,newChildren)=>{
  let newChildIndex = 0;
  let prevSibling;

  while(newChildIndex<newChildren.length){
    let newChild = newChildren[newChildIndex];
    let tag;
    if (newChild.type === ELEMENT_TEXT) { // 这是文本节点
      tag = TAG_TEXT
    } else if (typeof newChild.type === 'string') {  // 如果type是字符串，则是原生DOM节点
      tag = TAG_HOST
    }
    let newFiber = {
      tag,
      type:newChild.type,
      prpos:newChild.props,
      stateNode:null,
      return:currentFilber,
      effectTag:INSERT,
      nextEffect:null
    }
    if(newFiber){
      if(newChildIndex===0){
        currentFilber.child = newFiber
      }else{
        prevSibling.sibling = newFiber
      }
      prevSibling = newFiber
    }
    newChildIndex++;
  }
}

const completeUnitOfWork = (currentFiber)=>{
  let returnFiber = currentFiber.return;
  if(returnFiber){
    if(!returnFiber.firstEffect){
      returnFiber.firstEffect = currentFiber.firstEffect;
    }
    if(currentFiber.lastEffect){
      if(returnFiber.lastEffect){
        returnFiber.lastEffect.nextEffect = currentFiber.firstEffect
      }
      returnFiber.lastEffect = currentFiber.lastEffect
    }
    const effectTag = currentFiber.effectTag;
    if(effectTag){
      if(returnFiber.lastEffect){
        returnFiber.lastEffect.nextEffect = currentFiber
      }else{
        returnFiber.lastEffect = currentFiber
      }
      returnFiber.lastEffect = currentFiber
    }
  }
}

// 把该节点和子节点任务都执行完
const performUnitOfWork = (currentFiber) => {
  beginWork(currentFiber)
  if (currentFiber.child) {
    return currentFiber.child
  }
  while (currentFiber) {
    completeUnitOfWork(currentFiber) // 让自己完成
    if (currentFiber.sibling) { // 有弟弟则返回弟弟
      return currentFiber.sibling
    }
    currentFiber = currentFiber.return // 没有弟弟，则找到父亲，让父亲完成，父亲会去找他的弟弟即叔叔
  }
}
