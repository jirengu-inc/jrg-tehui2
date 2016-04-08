<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>task-24-1</title>
<meta name="description" content="">
<meta name="keywords" content="">
<link href="" rel="stylesheet">
</head>
<body>
    名称：<input type="text" class="username">
	<span class="info"></span>
    <br/>
    <!-- 类型：<input type="radio" name="type" id="get">  -->
    <!-- <label for="get">GET</label>
    <input type="radio" name="type" id="post">
    <label for="post">POST</label><br> -->
    <button class="btn">提交</button><br/><br/><br/>

	名称：<input type="text" class="username2">
	<span class="info2"></span> <br/>
    <button class="btn2">提交</button><br/><br/><br/>


名称：<input type="text" class="username3">
    <span class="info3"></span> <br/>
    <button class="btn3">提交</button>

    <script type="text/javascript">
    	
    function ajax(opts){

         var xhr=new XMLHttpRequest();

            xhr.onreadystatechange=function(){
                if(xhr.status===200 && xhr.readyState===4){
                    var json=JSON.parse(xhr.responseText);
                    opts.success(json);
                    }
                if(xhr.status===404 && xhr.readyState===4){
                    opts.error();
                    }
                }

                var dataStr="";
                for(var key in opts.data){
                    dataStr += key + "=" + opts.data[key]+"&";
                }
                dataStr = dataStr.substr(0, dataStr.length-1);
                if(opts.type.toLowerCase()==="post"){
                    xhr.open(opts.type , opts.url ,true);
                    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                    xhr.send(dataStr);
                }
                if(opts.type.toLowerCase()==="get"){
                    xhr.open(opts.type , opts.url+"?"+dataStr ,true);
                    xhr.send(dataStr);
                }

    }        


    document.querySelector(".btn2").addEventListener("click",function(){
    	ajax({
    		url: "task-24q-1-get.php",
    		type: "get",
    		data:{
    			username: document.querySelector(".username2").value,

    		},
    		success: function(data){
                var info2=document.querySelector(".info2");


                info2.innerHTML=jsonData(data);   
    		},
    		error: function(){
                var info2=document.querySelector(".info2");
                info2.innerHTML="error";
    		}
    	})
    },false);


    document.querySelector(".btn3").addEventListener("click",function(){
        ajax({
            url: "task-24-1-post.php",
            type: "post",
            data:{
                username: document.querySelector(".username3").value,

            },
            success: function(data){
                var info3=document.querySelector(".info3");


                info3.innerHTML=jsonData(data);   
            },
            error: function(){
                var info3=document.querySelector(".info3");
                info3.innerHTML="error";
            }
        })
    },false);



    	var type=document.querySelector(".type");
    	var btn=document.querySelector(".btn");
    	var info=document.querySelector(".info");
    	// var type=document.querySelector("")
    	btn.addEventListener("click",function(){
            var username=document.querySelector(".username").value;
            var xhr=new XMLHttpRequest();
            var url="task-24-1-get.php"+"?username="+username;
            xhr.onreadystatechange=function(){
                if(xhr.status===200 && xhr.readyState===4){
                    var json=JSON.parse(xhr.responseText);
                    info.innerHTML=jsonData(json);
                    }
                }
                xhr.open("get",url,true);
                xhr.send();
        },false);

        function jsonData(json){
            var str="";
            for(var key in json){
                str+="<p>"+key+" : "+json[key]+"</p>";
            }
            return str;
        }




    	// function ajax(opts){
    	// 	var username=document.querySelector(".username").value;
    	// 	var xhr=new XMLHttpRequest();
    	// 	var url="task-24-1-post.php";
    	// 	xhr.onreadystatechange=function(){
    	// 	    if(xhr.status===200 && xhr.readyState===4){
    	// 	    	info.innerHTML=xhr.responseText;
    	// 	    	}
    	// 	    }

    	// 	    xhr.open("post",url,true);
    	// 	    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    	// 	    xhr.send("name="+username);
    	// }


    	// function ajax(opts){
    	// 	var username=document.querySelector(".username").value;
    	// 	var xhr=new XMLHttpRequest();
    	// 	var url="task-24-1-get.php"+"?name="+username;
    	// 	xhr.onreadystatechange=function(){
    	// 	    if(xhr.status===200 && xhr.readyState===4){
    	// 	    	info.innerHTML=xhr.responseText;
    	// 	    	}
    	// 	    }
    	// 	    xhr.open("get",url,true);
    	// 	    xhr.send();
    	// }
    </script>
</body>
</html>