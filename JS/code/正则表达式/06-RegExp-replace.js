/*
const re = /(\w)\s(\w)/;
const str = "John Smith";
const newstr = str.replace(re, "$2, $1");
// Smith, John
console.log(newstr);
*/

/*// 小驼峰命名改连字符命名方式
function styleHyphenFormat(propertyName) {
    function upperToHyphenLower(match) {
        return '-' + match.toLowerCase();
    }
    return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
}

console.log(styleHyphenFormat('getName')) // get-name
console.log(styleHyphenFormat('getUserName')) // get-user-name*/

/*
*  分组
* */
const reg = /([a-z]\d){3}/g
const str = 'a1b2c3d4'
const match = reg.exec(str)
console.log(match)
