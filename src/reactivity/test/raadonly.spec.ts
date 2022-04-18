
import { readonly}from "../reactivity"

it("readonly",()=>{
  let obj = readonly({
    age:10
  })
  expect(obj.age).toBe(10)
  console.warn = jest.fn();
  obj.age++
  expect(console.warn).toHaveBeenCalled();
})