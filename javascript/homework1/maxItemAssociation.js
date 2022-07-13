function maxItemAssociation(historyPurchases){
    let goodsMap = {}
    let maxAssociation = null;
    for (let purchase of historyPurchases){
        for(let i =0; i < purchase.length; i ++){
            for(let j = i+1; j < purchase.length; j++){
                if(goodsMap[purchase[j]] && goodsMap[purchase[i]] && (goodsMap[purchase[j]] !== goodsMap[purchase[i]])){
                    let _set = Array.from(new Set([...goodsMap[purchase[j]],...goodsMap[purchase[i]]]))
                    _set.forEach(key=>{
                        goodsMap[key] = _set
                    })
                }
                if(!goodsMap[purchase[i]] && !goodsMap[purchase[j]]){
                    goodsMap[purchase[i]] = [purchase[i],purchase[j]]
                    goodsMap[purchase[j]] = goodsMap[purchase[i]];
                }
                if(!goodsMap[purchase[i]]){
                    goodsMap[purchase[j]].push(purchase[i])
                    goodsMap[purchase[i]]= goodsMap[purchase[j]]
                }
                if(!goodsMap[purchase[j]]){
                    goodsMap[purchase[i]].push(purchase[j])
                    goodsMap[purchase[j]]= goodsMap[purchase[i]]
                }

                if(!maxAssociation || maxAssociation.length<goodsMap[purchase[j]].length)maxAssociation= goodsMap[purchase[j]]
                else if(maxAssociation !==goodsMap[purchase[j]] && maxAssociation.length === goodsMap[purchase[j]].length){
                    maxAssociation.sort()
                    goodsMap[purchase[j]].sort()
                    if(maxAssociation[0]>goodsMap[purchase[j]][0])maxAssociation = goodsMap[purchase[j]]
                }
            }
        }
    }
    return maxAssociation.sort()
}
