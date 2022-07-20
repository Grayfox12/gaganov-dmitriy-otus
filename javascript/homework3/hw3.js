// Вспомогательная функция для получения селектора node
function nodeSelector(node){
    let _children = Array.from(node.parentElement.children)
    let _sametypeChildren = _children.filter(child=>child.nodeName == node.nodeName)
    if(_sametypeChildren.length > 1) return `${node.nodeName.toLowerCase()}:nth-child(${_children.indexOf(node)+1})`
    return `${node.nodeName.toLowerCase()}`
}

function getPath(node){
    if(node === document.body) return 'body'
    if(node.id) return `#${node.id}`
    return `${getPath(node.parentElement)} ${nodeSelector(node)}`
}
