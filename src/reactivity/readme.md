reactive 双向绑定
{scheduler} 当更新依赖的时候执行当前 scheduler
stop stop 只有无法触发更新 除非 runner
runner 返回一个 fn 的执行
isStop 在 stop 的同时执行 isStop
readOnly 类似 reactive 没有收集触发依赖
isReadOnly 判读是否是 readonly 不是的话警告 console.wran
isReactive 判断是否是 reactive
ref 绑定 第一步是 ref 的绑定，如果是一个对象的话，会返回一个 reactive
isRef 判断是不是 ref
unRef 是 ref 返回 ref 否则返回参数本身

ref 的重点, 如果更新的值是相同的话，不会重新触发 effect，也不会赋值

在逻辑组织和逻辑复用方面，Composition API 是优于 Options API。因为 Composition API 几乎是函数，会有更好的类型推断。
Composition API 对 tree-shaking 友好，代码也更容易压缩；
Composition API 中没有对 this 的使用，减少了 this 指向不明的情况；
如果是小型组件，可以继续使用 Options API，也是十分友好的

export interface ReactiveEffectOptions {
// 延迟计算，为 true 时候，传入的 effect 不会立即执行。
lazy?: boolean
// 是否是 computed 数据依赖的监听函数
computed?: boolean
// 调度器函数，接受的入参 run 即是传给 effect 的函数，如果传了 scheduler，则可通过其调用监听函数。
scheduler?: (run: Function) => void
// **仅供调试使用**。在收集依赖(get 阶段)的过程中触发。
onTrack?: (event: DebuggerEvent) => void
// **仅供调试使用**。在触发更新后执行监听函数之前触发。
onTrigger?: (event: DebuggerEvent) => void
//通过 `stop`  终止监听函数时触发的事件。
onStop?: () => void
}
