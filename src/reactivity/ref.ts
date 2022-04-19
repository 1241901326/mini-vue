

import { isObject } from '../shared';
import {refTrack,refTrigger,isTracking}from "./effect"
import { reactive } from './reactive';
class RefImpl {
  public _value: any;
  dep:any
 public __v_isRef = true;
  constructor(value){
    this.dep =new Set()
    this._value = value;
  }
  get value() {
    //依赖收集
    if(isTracking()){
      refTrack(this.dep)
    }
    return isObject(this._value)?reactive(this._value):this._value;
  }

  set value(newValue){
    if(!Object.is(this._value,newValue)){
      this._value = newValue;
      // 触发依赖
      refTrigger(this.dep)
    }
  }
}
export function ref(value){
    return new RefImpl(value)
}
export function isRef(value){
  return !!value.__v_isRef
}

export function unRef(value){
 return isRef(value)?value.value:value
}
export function proxyRefs(raw){
  // 类似 template 可以直接访问 return 出来的 ref的值 而不用 ref.value
  return new Proxy(raw,{
    get(target,key){
      return unRef(Reflect.get(target,key))
    },
    set(target,key,value){
      if(isRef(Reflect.get(target,key))&& !isRef(value)){
        return Reflect.get(target,key).value = value
      }else{
        return Reflect.set(target,key,value)
      }
    }
  })
}