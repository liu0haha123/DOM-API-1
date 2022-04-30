window.dom = {
    // 增
    create(string){
        const container = document.createElement("template")
        //只有这个标签能100%容纳所有标签
        container.innerHTML = string.trim()
        return container.content.firstChild
    },
    after(node,nodeInsert){
        //没有下一个节点也可以插入
        node.parentNode.insertBefore(nodeInsert,node.nextSibling)
    },
    before(node,nodeInsert) {
        node.parentNode.insertBefore(nodeInsert,node)
    },
    append(parent,node){
        parent.appendChild(node)
    },
    wrap(node,parent){
        // 先把父节点放到子节点前面，然后用append移动进去
        dom.before(node,parent)
        dom.append(parent,node)
    },
    // 删 注意返回删除的对象
    remove(node){
      node.parentNode.removeChild(node)
      return node
    },
    empty(node) {
        // 解构赋值
        const {childNodes} = node.childNodes
        const array = []
        // for循环方法有子节点长度动态变换的问题
        let fc = node.firstChild
        while (fc){
            array.push(dom.remove(node.firstChild))
            fc = node.firstChild
        }
        return array
    },

    // 改
    attr(node,name,value){
        // 重载
        if (arguments.length === 3){
            return node.setAttributeNode(name,value)
        }
        else if(arguments.length ===2){
            return node.getAttribute(name)
        }
    },
    text(node,string){
        if (arguments.length ===2){
            //适配
            if("innerText" in node){
                node.innerText = string
            }
            else{
                node.textContent = string
            }
        }
        else if(arguments.length === 1){
            return node.innerText
        }
    },
    html(node,string){
        if (arguments.length ===2){
            //适配
            node.innerHTML = string
        }
        else if(arguments.length === 1){
            return node.innerHTML
        }
    },
    style(node,name,value){
        if (arguments.length ===3){
            //style("div","color","red")
            node.style[name] = value
        }
        else if(arguments.length === 2){
            if(typeof  name === "string"){
                return node.style[name]
            }
            else if(name instanceof Object){
                const object = name
                for(let key in Object){
                    node.style[key] = object[key]
                }
            }

        }
    },
    class:{
        add(node,className) {
            node.classList.add(className)
        },
        remove(node,className){
            node.classList.remove(className)
        },
        has(node,className){
            return node.classList.contains(className)
        }

    },
    on(node,eventName,fn){
        node.addEventListener(eventName,fn)
    },
    off(node,eventName,fn){
        node.removeEventListener(eventName,fn)
    },
    // 查
    find(selector,scope){
        return (scope || document).querySelectorAll(selector)
    },
    parent(node){
        return node.parentNode
    },
    children(node){
        return node.children
    },
    siblings(node){
        // 注意children是伪数组
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },
    next(node){
        let x = node.nextSibling
        while (x && x.nodeType === 3){
            x = x.nextSibling
        }
        return x
    },
    previous(node){
        let x = node.previousSibling
        while (x && x.nodeType === 3){
            x = x.previousSibling
        }
        return x
    },
    each(nodeList,fn){
        for(let i= 0;i<nodeList.length;i++){
            fn.call(null,nodeList[i])
        }
    },
    index(node){
        const list = dom.children(node.parentNode)
        let i
        for(i=0;i<list.length;i++){
            if(list[i] === node){
                break
            }
        }
        return i
    }
}
