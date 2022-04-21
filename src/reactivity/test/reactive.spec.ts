import {reactive,isProxy} from "../reactive"
import {effect,stop} from "../effect"

// 监听函数的配置项

it("reactivit",()=>{
  let myObj = reactive({
    age:10,
    obj:{
      name:'222'
    }
  })
  let  sumAge
  expect(myObj.age).toBe(10)
  myObj.age++
  expect(myObj.age).toBe(11)
  effect(()=>{
     sumAge = myObj.age
  })
  expect(isProxy(myObj)).toBe(true)
  expect(isProxy(myObj.obj)).toBe(true)
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
