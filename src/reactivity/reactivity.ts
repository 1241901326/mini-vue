
import {track,trigger} from "./effect"
export function reactive(raw){
  return new Proxy(raw,{
    get(target,key){
      //target[key]
      let result = Reflect.get(target,key)
      //收集依赖
      track(target,key)
      return result
    },
    set(target,key,value){
      let result  = Reflect.set(target,key,value)
      //触发依赖
      trigger(target,key)
      return result;
    }
  })  
}