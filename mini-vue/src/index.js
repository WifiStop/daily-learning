import './index.less';
import './deps'
function h(tag,props,children){
  return {
    tag,
    props,
    children
  }
}
function mount(vnode,container){
  const el = vnode.el = document.createElement(vnode.tag);
  if(vnode.props){
    for(const key in vnode.props){
      const value = vnode.props[key];
      el.setAttribute(key,value)
    }
  }
  if(vnode.children){
    if(typeof vnode.children == 'string'){
      el.textContent = vnode.children
    }else{
      vnode.children.forEach(child=>{
        mount(child,el)
      })
    }
  }
  container.appendChild(el);
}

const vdom = h('div',{class:'red'},[
  h('span',null,"hello")
])
const vdom2 = h('div',{class:'green'},[
  h('span',null,"change")
])
mount(vdom,document.getElementById('app'))
function patch(n1,n2){
  if(n1.tag===n2.tag){
    const el = n2.el = n1.el;
    const oldProps = n1.props || {};
    const newProps = n2.props || {};
    for(const key in newProps){
      const oldValue = oldProps[key]
      const newValue = newProps[key]
      if(newValue !== oldValue){
        el.setAttribute(key,newValue)
      }
    }
    for(const key in oldProps){
      if(!(key in newProps)){
        el.removeAttribute(key)
      }
    }
    const oldChildren = n1.children;
    const newChildren = n2.chilren;
    if(typeof newChildren === 'string'){
      if(typeof oldChildren === 'string'){
        if(newChildren !== oldChildren){
          el.textContent = newChildren
        }
      }else{
        el.textContent = newChildren
      }
    }else{
      if(typeof oldChildren === 'string'){
        el.innerHTML = '';
        newChildren.forEach(child=>{
          mount(child,el)
        })
      }else{
        const commonLength = Math.min(oldChildren.length,newChildren.length);
        for(let i=0;i<commonLength;i++){
          patch(oldChildren[i],newChildren[i])
        }
        if(oldChildren.length>newChildren.length){
          oldChildren.slice(newChildren.length).forEach(child=>{
            el.removeChild(child,el)
          })
        }else if(oldChildren.length<newChildren.length){
          newChildren.slice(oldChildren.length).forEach(child=>{
            mount(child,el)
          })
        }
        
      }
    }
  }else{

  }
}
setTimeout(()=>{
  patch(vdom,vdom2)
},3000)
