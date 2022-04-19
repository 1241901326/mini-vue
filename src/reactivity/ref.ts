

import { isObject } from '../shared';
import {refTrack,refTrigger,isTracking}from "./effect"
import { reactive } from './reactive';
class RefImpl {
  public _value: any;
  dep:any
  constructor(value){
    this.dep =new Set()
    this._value = value;
  }
  get value() {
    //依赖收集
    if(isTracking()){
      refTrack(this.dep)
    }
    // return isObject(this._value)?reactive(this._value):this._value;
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
export function isRef(){}

export function unRef(){}
export function proxyRefs(){}