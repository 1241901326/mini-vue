

import { track,trigger } from './effect'
const set = createSetter()
const get = createGetter()
const getOnly = createGetter(true)
export const enum ReactiveFlags {
  IS_REACTIVE='is_reactive',
  IS_ONLY = 'is_only'
}
export function createGetter(isOnly = false){
  return function get(target,key) {
    let result = Reflect.get(target,key)
    if(key == ReactiveFlags.IS_REACTIVE){
      return !isOnly
    }
    if(!isOnly){
      track(target,key)
    }
    return result
  }
}
export function createSetter(){
  return function  set(target,key,value){
      let result  = Reflect.set(target,key,value)
      trigger(target,key)
      return result;
  }
}
export const  mutableHandlers = { 
  get,set
}
export const readonlyHandlers = {
  get:getOnly,
  set(target, key) {
    console.warn(
      `key :"${String(key)}" set 失败，因为 target 是 readonly 类型`,
      target
    );

    return true;
  },
}