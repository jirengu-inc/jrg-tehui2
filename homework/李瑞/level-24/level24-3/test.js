//验证用户名
function testname(){
var str=username.value;
var key=/^\w{3,10}$/;
if(key.test(str)){
    ajaxname();
    return true;
}else{
  nametip.innerText="请输入正确的用户名"
  addClass(username,"error");
  return false;
}
}

//验证密码
function testpass(){
  var data=pass.value;
  var tem=/^[A-Z]{6,15}$|^[a-z]{6,15}$|^[0-9]{6,15}$|^_{6,15}$/;
  var tem1=/^\w{6,15}$/;
  if(tem1.test(data)){
    if(tem.test(data)){
          passtip.innerText="请输入正确的密码格式（字母、小写、数字、下划线最少两种）";
          addClass(pass,"error");
            return false;
    }else{
      passtip.innerText="密码格式正确";
        removeClass(pass,"error");
        return true;
    }
  }else{
    passtip.innerText="密码太短了！";
    addClass(pass,"error");
      return false;
  }
}

//再次验证密码
function testagin(){
var data=again.value;
  var tem=/^[A-Z]{6,15}$|^[a-z]{6,15}$|^[0-9]{6,15}$|^_{6,15}$/;
  var tem1=/^\w{6,15}$/;
  if(tem1.test(data)){
    if(tem.test(data)){
          againtip.innerText="请输入正确的密码格式";
          addClass(again,"error");
          return false;
    }else if(data ===pass.value){
      againtip.innerText="密码验证正确";
      removeClass(again,"error");
        return true;
    }else{
      againtip.innerText="请输入相同的密码";
      addClass(again,"error");
      return false;
      // console.log(pass.value);
    }
  }else{
    againtip.innerText="请输入六位数以上的密码";
    addClass(again,"error");
      return false;
  }
}
