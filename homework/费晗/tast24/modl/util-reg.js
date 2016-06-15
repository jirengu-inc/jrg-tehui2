//用户名（长度3-10个字符，只能包括字母、数字、下划线）
function isLegalUsername(str){
	return /^[A-Za-z_0-9]{3,10}$/.test(str);
}

//密码（长度6-20个字符，包括大写字母、小写字母、数字、下划线至少两种）
function isLegalPassword(str){
	if(str.length < 6 || str.length > 16){
		return false;
	}
	//如果包含上述四种以外的字符，false
	if(/[^A-Za-z_0-9]/.test(str)){
		return false;
	}

	//如果全为大写、小写、下划线、数字, false
	if( /(^[a-z]+$)|(^[A-Z]+$)|(^_+$)|(^\d+$)/g.test(str) ){
		return false;
	}
	return true;
}

function isLegalPhone(str){
	return /^1[3-9]\d{9}$/.test(str);
}

function isLegalEmail(str) {
    var exp = /^[A-Za-z0-9][\w\.\-]+@[A-Za-z0-9][\w\-]+[A-Za-z0-9]\.[A-Za-z]{2,}$/;
    return exp.test(str);
}