reactive 双向绑定
{scheduler} 当更新依赖的时候执行当前 scheduler
stop stop 只有无法触发更新 除非 runner
runner 返回一个 fn 的执行
isStop 在 stop 的同时执行 isStop
readOnly 类似 reactive 没有收集触发依赖
isReadOnly 判读是否是 readonly 不是的话警告 console.wran
isReactive 判断是否是 reactive
