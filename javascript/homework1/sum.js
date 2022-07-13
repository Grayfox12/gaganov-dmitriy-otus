function sum(firstoperand){
    let _sum = firstoperand;
    return function addition(secondoperand){
        if(secondoperand===undefined || secondoperand===null || isNaN(secondoperand)) return _sum
        _sum+=secondoperand
        return addition
    }
}
