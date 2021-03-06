
import {track,trigger} from "./effect"
import {
  mutableHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from "./baseHandler";
import { ReactiveFlags } from './baseHandler';
export function reactive(raw){
  return new Proxy(raw,mutableHandlers)
}

export function readonly(raw){
  return new Proxy(raw,readonlyHandlers)
}

export function isReactive(value){
  return !!value[ReactiveFlags.IS_REACTIVE]   
}
export function isReadonly(value){
  return !!value[ReactiveFlags.IS_ONLY]   
}
export function shallowReadonly(raw) {
  return new Proxy(raw,shallowReadonlyHandlers)
}
export function isProxy(value){
  return !!value[ReactiveFlags.IS_PROXY]
}