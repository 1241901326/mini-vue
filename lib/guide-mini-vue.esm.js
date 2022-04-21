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

export { creatVNode, h };
