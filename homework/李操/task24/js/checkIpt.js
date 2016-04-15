//检查用户名格式：只能是字母、数字、下划线，3-10个字符
function checkname() {
    if (!username.value.match(/^\w{3,10}$/g)) {
        document.getElementsByClassName("usernameErr")[0].innerText = "*用户名格式错误";
        addClass(username, "errColor");
        return false;
    } else if (username.value.match(/^\w{3,10}$/g)) {
        document.getElementsByClassName("usernameErr")[0].innerText = "";
        removeClass(username, "errColor");
        return true;
    }
}

var isSuccess = false;
console.log("用户名“licao”已存在");
//AJAX请求后台数据验证是否已存在用户名
function existname(makesure) {
    ajax({
        url: "task24-3.php",
        type: "post",
        data: {
            userName: username.value
        },
        success: function(ret) {
            if (!ret.data) {
                isSuccess = false;
                document.getElementsByClassName("usernameErr")[0].innerText = "*用户名已存在";
                addClass(username, "errColor");
                makesure && makesure(false);
            } else if(ret.data) {
                isSuccess = true;
                document.getElementsByClassName("usernameErr")[0].innerText = "";
                removeClass(username, "errColor");
                makesure && makesure(true);
            }
        },
        error: function() {
            alert("Error :(");
        }
    });

    if(isSuccess){
        return true;
    }else if(!isSuccess){
        return false;
    }
}

//检查邮箱格式
function checkemail() {
    if (!email.value.match(/^([\w\.\-])+\@(([\w\-])+\.)+([a-zA-Z0-9]{2,4})$/)) {
        document.getElementsByClassName("emailErr")[0].innerText = "*邮箱格式错误";
        addClass(email, "errColor");
        return false;
    } else if (email.value.match(/^([\w\.\-])+\@(([\w\-])+\.)+([a-zA-Z0-9]{2,4})$/)) {
        document.getElementsByClassName("emailErr")[0].innerText = "";
        removeClass(email, "errColor");
        return true;
    }
}

//检查密码格式：6-15个字符，包括大小写字母、数字、下划线至少两种
function checkpwd() {
    if (!(pwd.value.match(/^(?!^\d+$)(?!^[A-Z]+$)(?!^[a-z]+$)(?!^[_]+$).{6,15}$/) && pwd.value.match(/^\w{6,15}$/))) {
        document.getElementsByClassName("pwdErr")[0].innerText = "*密码格式错误";
        addClass(pwd, "errColor");
        return false;
    } else if (pwd.value.match(/^(?!^\d+$)(?!^[A-Z]+$)(?!^[a-z]+$)(?!^[_]+$).{6,15}$/) && pwd.value.match(/^\w{6,15}$/)) {
        document.getElementsByClassName("pwdErr")[0].innerText = "";
        removeClass(pwd, "errColor");
        return true;
    }
}

//检查密码是否一致
function checkrepeatpwd() {
    if (!(repeatpwd.value === pwd.value)) {
        document.getElementsByClassName("repeatpwdErr")[0].innerText = "*密码不一致";
        addClass(repeatpwd, "errColor");
        return false;
    } else if (repeatpwd.value === pwd.value) {
        document.getElementsByClassName("repeatpwdErr")[0].innerText = "";
        removeClass(repeatpwd, "errColor");
        return true;
    }
}