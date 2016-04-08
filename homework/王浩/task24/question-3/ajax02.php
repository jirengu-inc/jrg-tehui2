<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>ajax-2</title>
<meta name="description" content="">
<meta name="keywords" content="">
<link href="http://cdn.bootcss.com/normalize/3.0.3/normalize.min.css" rel="stylesheet">
<style>
    body{
        font-family: "Microsoft Yahei";
        color: #333;
    }
    .wrap{
        width: 300px;
        margin: 40px auto;
        border: solid 2px #E27272;
        padding: 10px;
        border-radius: 10px;
        text-align: center;
    }
    a{
        display: inline-block;
        text-decoration: none;
        padding: 5px 10px;
        color: #E27272;
        font-weight: bold;
        border: solid 1px #E27272;
        border-radius: 5px;
        margin-right: 30px;
        margin-bottom: 10px;
    }
    a:hover{
        background-color: #E27272;
        color: #fff;
    }
</style>
</head>
<body>
    <div class="wrap">
        <p>2s之后后台会传回数字+1;<br>在2s期间点击按钮无效！</p>
        <a href="#" id="btn">点击</a>
        <span class="show">1</span>
        <div class="content"></div>
    </div>
    <script>
        var btn = document.querySelector("#btn");
        var show = document.querySelector(".show");
        var content = document.querySelector(".content");
        btn.addEventListener("click", ajax, false);

        function ajax(e) {
            console.log(show.innerText);
            var url = "ajax02_01.php" + "?num=" + show.innerText;
            console.log(url);
            content.innerHTML = "content= " + show.innerText + "<br>url=" + url
            e.preventDefault(); //阻止a连接跳转
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 1) {
                    btn.removeEventListener("click", ajax, false);
                }
                if (xhr.readyState === 4) {
                    btn.addEventListener("click", ajax, false);
                }

                if (xhr.status === 200 && xhr.readyState === 4) {
                    show.innerText = xhr.responseText;
                    console.log(show.innerText);
                }
            }
            xhr.open("get", url, true);
            xhr.send();
        }
    </script>
</body>
</html>