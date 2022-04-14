import {reactive} from "../reactivity"
import {effect} from "../effect"


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