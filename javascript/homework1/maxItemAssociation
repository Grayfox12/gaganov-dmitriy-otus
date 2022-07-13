function maxItemAssociation(historyPurchases){
    let goodsMap = {}
    let maxAssociation = null;
    for (let purchase of historyPurchases){
        for(let i =0; i < purchase.length; i ++){
            for(let j = i+1; j < purchase.length; j++){
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
                if(!maxAssociation || maxAssociation.length<goodsMap[purchase[i]].length)maxAssociation= goodsMap[purchase[i]]
            }
        }
    }
    return maxAssociation.sort()
}
