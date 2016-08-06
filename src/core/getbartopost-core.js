/**
 * Created by SONY on 2016/8/4.
 */
let _ = require('lodash');
class BarToPost{
    do(barcode){
            let checkedcode = checkBarcode(barcode);
            //console.log(checkedcode);
            let formattedcode = formatBarCode(checkedcode);
            let mattedcode = matchPostcode(formattedcode,getcodesObjects());
            let postcodeString = getPostcodeString(mattedcode);
            return postcodeString;
    }
    checkBarcode(barcode){
    if(barcode.length === 32 || barcode.length === 52  ){
        if( barcode.charAt(0)==='|' && barcode.charAt(barcode.length-1)==='|'){
            let temp = barcode.split('').map((element)=>{
                let reg =/\d/;
                return reg.test(element); //匹配有其他字符,数字，特殊字符等
            });

            if(!temp.includes(true)){
                let codearr = barcode.substring(1,barcode.length-2);
                let flag = _.chain(codearr).split('').chunk(5).map(item => item.join('')).map(n => _getBarcodes().includes(n)).value();
                if(flag.includes(false)){
                    return false;
                }else{
                    return barcode;
                }

            }
        }
    }
    return false;
}
}
function getcodesObjects(){
    return [
        {no:'0',code:'||:::'},{no:'1',code:':::||'},{no:'2',code:'::|:|'},{no:'3',code:'::||:'},{no:'4',code:':|::|'},
        {no:'5',code:':|:|:'},{no:'6',code:':||::'},{no:'7',code:'|:::|'},{no:'8',code:'|::|:'},{no:'9',code:'|:|::'}
    ];
}

function formatBarCode(barcode){
    if(barcode !== false){
        return  barcode.substr(1,barcode.length-1);
    }
    return false;
}
function matchPostcode(barcode,allcodes){
    if(barcode !== false){
        let temps = _.chunk(barcode.split(''),5);
        let newBarcodes =  temps.map((temp)=>{
            return temp.join('');
        });
        return newBarcodes.map((newbarcode)=>{
            let code = allcodes.find((code)=> code.code === newbarcode );
            return code.no;
        });
    }
    return false;
}
function getPostcodeString(postcode){
    if(postcode !== false){
        let codes = _.dropRight(postcode);
        if(codes.length === 9){
            codes.splice(5,0,'-');
        }
        return codes.join('');
    }
    return false;
}
module.exports = BarToPost;