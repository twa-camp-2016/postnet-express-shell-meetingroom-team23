function loadAllItems() {
    return [
        {barcode: ':::||', zipcode: 1},
        {barcode: '::|:|', zipcode: 2},
        {barcode: '::||:', zipcode: 3},
        {barcode: ':|::|', zipcode: 4},
        {barcode: ':|:|:', zipcode: 5},
        {barcode: ':||::', zipcode: 6},
        {barcode: '|:::|', zipcode: 7},
        {barcode: '|::|:', zipcode: 8},
        {barcode: '|:|::', zipcode: 9},
        {barcode: '||:::', zipcode: 0},
        {barcode: '||:::', zipcode: 10}
    ]
}

function correntBarcode() {
    return [
        ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::', '||:::'
    ]
}

module.exports={
    loadAllItems:loadAllItems,
    correntBarcode
}

//uhiupjp
