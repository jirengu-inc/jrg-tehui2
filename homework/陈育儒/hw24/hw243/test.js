function testname(){
	var re= /^\w{6,12}$/g;
	console.log(username.value+1);
		if(re.test(username.value)){
			ajax({
				url:"hw24-3.php",
				type:"post",
				data:{
					"name":username.value
				},
				success:function(data){
					if(data === 0){
						tipname.innerText=username.value+"已经被注册了，请更换一个";
						addClass(username,"error");
						return false;
					}
					else if(data === 1){
						console.log(username.value);
						tipname.innerText="恭喜"+username.value+"可以使用！";
						removeClass(username,"error");
						return true;
					}
				}
			})
	}
	else{
			tipname.innerText="用户名格式不正确";
			addClass(username,"error");
			return false;
	}
}

function testpwd(){
	var pwd = pass.value;
	var repwd = /^\w{6,12}$/;
	var repwd2 =/^[a-z]{6,12}$|^[A-Z]{6,12}$|^[0-9]{6,12}$|^_{6,12}$/;
		if(repwd.test(pwd)){
			if(repwd2.test(pwd)){
				tippwd.innerText="密码至少包含大写小写字母,数字,下划线两种";
				addClass(pass,"error");
				return false;
			}
			else{
			  tippwd.innerText="密码可以使用";
			  removeClass(pass,"error");
			  return true;
			}
		}
		else{
			tippwd.innerText="密码格式不正确";
			addClass(pass,"error");
			return false;
		}
}

function testagain(){
	var pwd = pass.value;
	var pwd2 = again.value;

	if(pwd2.length>0){
		if(pwd===pwd2){
			tippwd2.innerText="密码一致";
			removeClass(again,"error");
			return true;
	  }
	  else{
			tippwd2.innerText="密码不一致";
			addClass(again,"error");
			return false;
		}
	}else{
		tippwd2.innerText="请输入密码";
		addClass(again,"error");
		return false;
	}

}