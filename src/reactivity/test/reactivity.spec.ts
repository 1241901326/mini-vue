import {reactive} from "../reactivity"
import {effect,stop} from "../effect"

// 监听函数的配置项
export interface ReactiveEffectOptions {
  // 延迟计算，为true时候，传入的effect不会立即执行。
  lazy?: boolean
  // 是否是computed数据依赖的监听函数
  computed?: boolean
  // 调度器函数，接受的入参run即是传给effect的函数，如果传了scheduler，则可通过其调用监听函数。
  scheduler?: (run: Function) => void
  // **仅供调试使用**。在收集依赖(get阶段)的过程中触发。
  onTrack?: (event: DebuggerEvent) => void
  // **仅供调试使用**。在触发更新后执行监听函数之前触发。
  onTrigger?: (event: DebuggerEvent) => void
  //通过 `stop` 终止监听函数时触发的事件。
  onStop?: () => void
}

it("reactivit",()=>{
  let myObj = reactive({
    age:10
  })
  let  sumAge
  expect(myObj.age).toBe(10)
  myObj.age++
  expect(myObj.age).toBe(11)
  effect(()=>{
     sumAge = myObj.age
  })
  myObj.age ++
})

it(" effect return runner ",()=>{
  //effect 有一个返回值
  let num  = 10
 const runner =  effect(()=>{
   num++
   return 'back'
  })
  expect(num).toBe(11)
const r = runner()
expect(num).toBe(12)
expect(r).toBe('back')
})

//有scheduler执行scheduler 不执行run 但是会初始化
it('scheduler 调度器',()=>{
  let dummy
  let run:any
  const obj = reactive({
    foo:1
  })
  const scheduler = jest.fn(()=>{
    run = runner
  })
  const runner = effect(()=>{
    dummy =obj.foo
  },{scheduler})
  expect(scheduler).toHaveBeenCalledTimes(0)  //没有执行
  expect(dummy).toBe(1)
  obj.foo++
  expect(scheduler).toHaveBeenCalledTimes(1)
  expect(dummy).toBe(1)
  run()
  expect(dummy).toBe(2)
  
})
//stop以后删除依赖
it("stop", () => {
  let dummy;
  const obj = reactive({ prop: 1 });
  const runner = effect(() => {
    dummy = obj.prop;
  });
  obj.prop = 2;
  expect(dummy).toBe(2);
  stop(runner);
  obj.prop = 3;
  //obj.prop ==  obj.prop =obj.prop + 1 在get的时候也需要删除
  obj.prop++;
  expect(dummy).toBe(2);
  // stopped effect should still be manually callable
  runner();
  expect(dummy).toBe(4);
});
