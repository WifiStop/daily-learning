let activeEffect = null
const targetMap = new WeakMap();
export function effect(eff){
  activeEffect = eff;
  activeEffect();
  activeEffect = null
}
export function ref(raw){
  const r = {
    get value(){
      track(r,'value')
      return raw
    },
    set value(newVal){
      if (newVal !== raw) {
        raw = newVal
        trigger(r, 'value')
      }
    }
  }
  return r
}
export function computed(getter){
  let result = ref();
  effect(()=>(result.value = getter()))
  return result
}
export function reactive(target) {
  const hanler = {
    get(target, key, receiver) {
      let result = Reflect.get(target, key, receiver)
      track(target,key)
      return result
    },
    set(target, key, value, receiver) {
      let oldValue = target[key];
      let result = Reflect.set(target,key,value,receiver);
      if(oldValue!=value){
        trigger(target,key)
      }
      return result
    }
  }
  return new Proxy(target,hanler)
}
function track(target, key) {
  if(activeEffect){
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    console.log(depsMap)
    dep.add(activeEffect)
  }
 
}

function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  let dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => {
      effect()
    });
  }
}