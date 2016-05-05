/**
 * Created by ran on 2016/4/18.
 */
function regPassword(str){
    if (str.length < 6 || str.length > 20) {
        return false;
    }
    if (/[^A-Za-z_0-9]/.test(str)) {
        return false;
    }
    if (/(^\d+$)|(^[a-z]+$)|([A-Z]+$)|(^_+$)/.test(str)) {
        return false;
    }
    return true;
}
//大写字母、小写字母、数字、下划线最少两种,长度为6~15


function regName(str){
    return /^[A-Za-z_0-9]{3,10}$/.test(str);
    }
//只能是字母、数字、下划线，3-10个字符