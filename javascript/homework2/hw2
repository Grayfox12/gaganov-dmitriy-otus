function promiseReduce(asyncFunctions, reduce, initialValue) {
    let _initialValue = initialValue
    let firstFn = new Promise(resolve => resolve())
    for(let fn of asyncFunctions)
        firstFn = firstFn
            .then(next=>fn())
            .then(
                next=>{
                    _initialValue = reduce(_initialValue, next)
                    return null
                },
                error=>{
                    return null/*new Promise(resolve => resolve())*/
                })
    return firstFn.then(next => _initialValue)
}
