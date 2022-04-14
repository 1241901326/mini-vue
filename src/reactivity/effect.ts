
class ReactiveEffect {
  private _fn:any
  constructor(fn){
    this._fn = fn;
  }
  run() {
    //将自己赋值给activiteEffect
    activiteEffect = this
    this._fn()
  }
}

export function  effect(fn){
  //注册
  let _effect = new ReactiveEffect(fn);
  //调用
   _effect.run()
}

let allMap = new Map()
let activiteEffect;
//收集依赖
export function track(target,key){
  let depMaps = allMap.get(target)
  if(!depMaps){
    depMaps = new Map()
    allMap.set(target,depMaps)
  }
  let dep = depMaps.get(key)
  if(!dep){
    dep  = new Set()
    depMaps.set(key,dep)
  }
  dep.add(activiteEffect)
}

//触发依赖
export function trigger(target,key){
  let depMaps = allMap.get(target)
  if(!depMaps){
    depMaps = new Map()
    allMap.set(target,depMaps)
  }
  let dep = depMaps.get(key)
  if(!dep){
    dep  = new Set()
    depMaps.set(key,dep)
  }
  //防止有undefined出现导致找不到run,同时触发多个dep
   for (const effect of dep){
    effect&&effect.run()
   }
}