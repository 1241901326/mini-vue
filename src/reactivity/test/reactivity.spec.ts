import {reactive} from "../reactivity"
import {effect,stop} from "../effect"


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
     console.log(sumAge)
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
 
  expect(scheduler).not.toHaveBeenCalled()  //没有执行
  expect(dummy).toBe(1)
  obj.foo++
  expect(scheduler).toHaveBeenCalledTimes(1)
  expect(dummy).toBe(1)
  run()
  expect(dummy).toBe(2)
  
})
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
  // obj.prop++;
  expect(dummy).toBe(2);
  // stopped effect should still be manually callable
  runner();
  expect(dummy).toBe(3);
});