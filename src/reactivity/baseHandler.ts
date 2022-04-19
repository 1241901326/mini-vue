

import { track,trigger } from './effect'
import { reactive, readonly } from './reactive'
import {isObject,extend}from '../shared'
const set = createSetter()
const get = createGetter()
const getOnly = createGetter(true)
const getShallowOnly = createGetter(true,true)
export const enum ReactiveFlags {
  IS_REACTIVE='is_reactive',
  IS_ONLY = 'is_only',
  IS_PROXY ='is_proxy'
}
export function createGetter(isOnly = false,isShallow = false){
  return function get(target,key) {
    let result = Reflect.get(target,key)

    if(key == ReactiveFlags.IS_REACTIVE){
      return !isOnly
    }else if(key == ReactiveFlags.IS_ONLY){
      return isOnly
    }
    else if (key == ReactiveFlags.IS_PROXY){
      return true
    }
    if(isShallow){
      return result
    }
    if(isObject(result)){
      return  isOnly?readonly(result):reactive(result)
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
export const shallowReadonlyHandlers = extend({},readonlyHandlers,{get:getShallowOnly})