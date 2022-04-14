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