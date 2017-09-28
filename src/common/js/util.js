/**
 * 解析url参数
 * @example ?id=123&name=jack
 * @return Object {id:12345,name:jack}
 */
 export function urlParse(){
   let url = window.location.search;//?id=123456&a=b
   let obj = {};
   let reg = /[?&][^?&]+=[^?&]+/g;
   let arr = url.match(reg); //?id=123456,&a=b
   if(arr){
     arr.forEach((item) => {
       let tempArr = item.substring(1).split('=');
       let key = decodeURIComponent(tempArr[0]);
       let value = decodeURIComponent(tempArr[1]);
       obj[key] = value;
     })
   }
   return obj;
 }

