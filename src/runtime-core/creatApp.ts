import { patch } from './component';
import { creatVNode } from './vnode';
export function creatApp(rootComponent){
  //虚拟节点
  return{
    mount(rootController){
      //先转化为虚拟节点，后续操作都基于虚拟节点
      //component -> vnode
     const vnode = creatVNode(rootComponent)
     render(vnode,rootController)

    }
  }
}
export function render(vnode,container){
  patch(vnode,container)
}