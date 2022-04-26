'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function creatVNode(type, prop, chinldren) {
    const vnode = {
        type,
        prop,
        chinldren
    };
    return vnode;
}

function h(type, props, children) {
    return creatVNode(type, props, children);
}

//公共方法
function isObject(value) {
    return value != null && typeof value == 'object';
}

function patch(vnode, container) {
    //处理组件
    //判断节点类型
    if (typeof vnode.type == 'string') {
        processElement(vnode, container);
    }
    else if (isObject(vnode.type)) {
        processComponent(vnode, container);
    }
}
function processComponent(vnode, container) {
    //挂载组件
    mountComponent(vnode, container);
}
function mountComponent(vnode, container) {
    //创建虚拟节点实例
    const instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance, container);
}
function createComponentInstance(vnode) {
    const component = {
        vnode
    };
    return component;
}
function setupComponent(instance) {
    // initProps()
    //initSlots()
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    const component = instance.vnode.type;
    const { setup } = component;
    if (setup) {
        //function   obj
        const setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    //function  obj 
    //function
    if (typeof setupResult == 'object') {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const component = instance.vnode.type;
    if (component.render) {
        instance.render = component.render;
    }
}
function setupRenderEffect(instance, container) {
    const subTree = instance.render();
    patch(subTree, container);
}
function processElement(vnode, container) {
    mountElement(vnode, container);
}
function mountElement(vnode, container) {
    const { type, chinldren, prop } = vnode;
    console.log(vnode, 'vnode');
    const el = document.createElement(type);
    if (typeof chinldren == 'string') {
        el.textContent = chinldren;
    }
    else if (chinldren instanceof Array) {
        chinldren.forEach(item => {
            patch(item, el);
        });
    }
    for (const key in prop) {
        el.setAttribute(key, prop[key]);
    }
    console.log(el, 'el');
    container.append(el);
}

function creatApp(rootComponent) {
    //虚拟节点
    return {
        mount(rootController) {
            //先转化为虚拟节点，后续操作都基于虚拟节点
            //component -> vnode
            const vnode = creatVNode(rootComponent);
            render(vnode, rootController);
        }
    };
}
function render(vnode, container) {
    patch(vnode, container);
}

exports.creatApp = creatApp;
exports.creatVNode = creatVNode;
exports.h = h;
