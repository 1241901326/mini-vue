import { isObject } from '../shared';

export function patch(vnode,container){

  //处理组件
  //判断节点类型
  if(typeof vnode.type == 'string'){
    processElement(vnode,container);
  }else if(isObject(vnode.type)){
    processComponent(vnode,container)
  }

}
export function processComponent(vnode,container){
  //挂载组件
  mountComponent(vnode,container)
}

export function mountComponent(vnode,container){
  //创建虚拟节点实例
  const instance = createComponentInstance(vnode)

  setupComponent(instance)
   setupRenderEffect(instance,container)


}

export function createComponentInstance(vnode){
const component  = {
  vnode
}
  return component
}

export function setupComponent(instance){
  // initProps()
  //initSlots()

  setupStatefulComponent(instance)

}

export function setupStatefulComponent (instance){
  const component = instance.vnode.type
  const {setup} = component

  if(setup){
    //function   obj
    const setupResult =   setup()
    handleSetupResult(instance,setupResult)
  }

}

export function handleSetupResult(instance,setupResult: any) {
  //function  obj 
  //function
  if(typeof setupResult == 'object'){
      instance.setupState = setupResult
  }

  finishComponentSetup(instance)
}
export function finishComponentSetup(instance: any) {
  const component = instance.vnode.type
  if(component.render){
    instance.render = component.render
  }
}

export function setupRenderEffect(instance:any ,container) {
  const subTree = instance.render()


  patch(subTree,container)

}

export function processElement(vnode: any,container) {
  mountElement(vnode,container)
}

export function mountElement(vnode: any,container) {
  const {type,children,props} = vnode
  const el = document.createElement(type)
  el.textContent = children
  for (const key in props){
    el.setAttribute(key, props[key])
  }
  container.append(el)
  document.append(el)
}

