
import { reactive, readonly,isReactive,isReadonly,isProxy}from "../reactive"

it("readonly",()=>{
  let obj = readonly({
    age:10,
    obj:{name:'222'}
  })
  expect(obj.age).toBe(10)
  console.warn = jest.fn();
  obj.age++
  expect(console.warn).toHaveBeenCalled();
  expect(isReadonly(obj.obj)).toBe(true)
  expect(isProxy(obj)).toBe(true)
  expect(isProxy(obj.obj)).toBe(true)
})

it('isreactive',()=>{
  let obj = {age:10}
  let reactiveObj = reactive({
    age:10,
    obj:{name: '22'}
  })
  expect(isReactive(obj)).toBe(false)
  expect(isReactive(reactiveObj)).toBe(true)
  expect(isReactive(reactiveObj.obj)).toBe(true)
})
