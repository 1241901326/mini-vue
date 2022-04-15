let activiteEffect;
class ReactiveEffect {
  private _fn:any
  deps = []
  active= true
  onStop?: () => void;
  constructor(fn,public scheduler?){
    this._fn = fn;
  }
  run() {
    //将自己赋值给activiteEffect
   activiteEffect = this
   return this._fn()
  }
  stop() {
    //拥有effect所有的dep,反向删除。 我effect删除你的dep， dep是所有的reactive内容
    if(this.active){
      this.deps.forEach((dep:any) => {
        dep.delete(this)
      })
      if(this.onStop){
        this.onStop();
      }
      this.active = false
    }
  }
}

export function  effect(fn,options:any ={}){
  const _effect = new ReactiveEffect(fn, options.scheduler);
  //将options中的 包括onstop  lazy onTrack onTrigger computed 赋值到effect中
  Object.assign(_effect, options);
  _effect.run();
  const runner: any = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}
let allMap = new Map()
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
  if(!activiteEffect) return 

  if(activiteEffect.active){
    dep.add(activiteEffect)
  }
  activiteEffect.deps.push(dep)
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
     if(!effect){return}
      if(effect.scheduler){
        effect.scheduler()
       }else {
        effect.run()
       }
   }
}

export function stop(runner){
  runner.effect.stop()
  //调用stop 以后不触发 runner
}