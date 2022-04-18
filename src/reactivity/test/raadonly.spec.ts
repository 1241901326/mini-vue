
import { reactive, readonly,isReactive}from "../reactivity"

it("readonly",()=>{
  let obj = readonly({
    age:10
  })
  expect(obj.age).toBe(10)
  console.warn = jest.fn();
  obj.age++
  expect(console.warn).toHaveBeenCalled();
})

it('isreactive',()=>{
  let obj = {age:10}
  let reactiveObj = reactive({
    age:10
  })
  expect(isReactive(obj)).toBe(false)
  expect(isReactive(reactiveObj)).toBe(true)
})
