### 问答

- 数组的方法里push、pop、shift、unshift、join、split分别什么名作用？

	- push——可以在数组的最后面添加任意多元素，然后返回新数组的length值；
	- pop——可以删除数组末尾的一个元素，并且返回被删除的数组元素；
	- shift——可以删除数组的第一个元素，并且返回被删除的元素；
	-  unshift——可以在数组的最前面添加任意多元素，并且返回新数组的length值；
	-  join——可以把数组转换为字符串，字符串默认用","分割，如果join输入了参数，那么就使用传入的参数分割字符串。但是join和前面的四个命令最大的区别就是它不会改变数组本身，只是输出一个字符串，所以多用于给变量赋值。
	-  split——它与join正好相反，可以把字符串分割成数组，而且也不会更改字符串本身，只是输出值传递给变量。如果没有给split传递参数，那么它会把字符串完整的转换为数组，并且数组的长度为1.如果传入了参数，（一般以逗号或者字符串中出现的字符分割）就以该参数分割数组。
	
### 代码题

1. 数组
 - 用splice实现push、pop、shift、unshift方法。	
		- push函数：	
	
				function push(){
				if(typeof arguments[0] === "object" && arguments[0] instanceof Array){
				for(var i=1;i<arguments.length;i++){
				arguments[0].splice(arguments[0].length,0,arguments[i]);
				}
				console.log(arguments[0].length	);
				}
				else{
				console.log("请输入数组！");
				return
				}
				}	
				var b=[1,2,3,4];
				push(b,5,6)
		
 		- pop函数：
 		
 				function pop(){
				if(arguments.length === 1 && typeof arguments[0] === "object" && arguments[0] instanceof Array){
				console.log(arguments[0][arguments[0].length-1]);
				arguments[0].splice(arguments[0].length-1,1);
				}
				else{
				console.log("请删参数中除数组外的其他数据！");
				return
				}
				}	
				var b=[1,2,3,4];
				pop(b)
 		- unshift函数：
 					
 				function unshift(){
				if(typeof arguments[0] === "object" && arguments[0] instanceof Array){
				for(var i=arguments.length-1;i>0;i--){
				arguments[0].splice(0,0,arguments[i]);
				}
				console.log(arguments[0].length	);
				}
				else{
				console.log("请输入数组！");
				return
				}
				}	
				var b=[1,2,3,4];
				unshift(b,5,6)
				
		- shift函数：

				function shift(){
				if(arguments.length ===1 && typeof arguments[0] === "object" && arguments[0] instanceof Array){
				console.log(arguments[0][0]);
				arguments[0].splice(0,1);
				}
				else{
				console.log("请删参数中除数组外的其他数据！");
				return
				}
				}	
				var b=[1,2,3,4];
				shift(b)	
				
 - 使用数组拼接处如下字符串：
 
		var prod = {
	    name: '女装',
	    styles: ['短款', '冬季', '春装']
		};
		function getTpl(data){
		//todo...
		};
		var result = getTplStr(prod);  //result为下面的字符串
		
	 解答如下：
 
		var prod = {
	    name: '女装',
	    styles: ['短款', '冬季', '春装']
	    };
	    function getTpl(data){
	        var result = "";		//申明空字符，遍历对象；
	        for(var i in data){
	            result += data[i]+",";
	        }
	        var result = result.split(",");		//把字符串分割为数组
	        result.pop();		//删除数组最后的空值；
	        var htmls=[];		//命名空数组；
	        var dt = "<dt>"+result[0]+"</dt>\n";		//命名dt变量
	        htmls.push('<dl class="product">\n',dt);		//push内容
	        for(var j=1;j<result.length;j++){		//遍历数组中除第一项元素；
	            htmls.push("  <dd>"+result[j]+"</dd>\n")
	            //给每个元素添加内容；在<dd>前面添加俩个空格，纯粹是为了美观；
	        }
	        htmls.push("</dl>");		
	        console.log(htmls.join(""))		//把数组重新整合为字符串；
	    };
	    var result = getTpl(prod); 
	    输出样式为：
	    <dl class="product">
		<dt>女装</dt>
	  	<dd>短款</dd>
	 	 <dd>冬季</dd>
	 	 <dd>春装</dd>
		</dl>
	
 - 写一个find函数，实现下面的功能：
 
 		var arr = [ "test", 2, 1.5, false ];
   		function find(data,parameter){
        console.log(data.indexOf(parameter)) 
   		}
   		find(arr,"test");   //0
    	find(arr,2);    //1
    	find(arr,0);    -1
    	
 - 写一个函数filterNumeric，实现如下功能:
 				
 		arr = ["a", 1, "b", 2];
		arr = filterNumeric(arr);  //   [1,2]	
			
 	代码如下：
 	
 		function filterNumeric(data){
		var pop=[];
		for(var i=0;i<data.length;i++){
		if(typeof data[i]==="number"){
			pop.push(data[i]);
		}
		}
		console.log(pop);
		return pop;
		}
		arr = ["a", 1, "b", 2];
		arr = filterNumeric(arr); 
		
 - 对象obj有个className属性，里面的值为的是空格分割的字符串(和html元素的class特性类似)，写addClass、removeClass函数，有如下功能：
 
 		var obj = {
		  className: 'open menu'
		}
		addClass(obj, 'new') // obj.className='open menu new'
		addClass(obj, 'open')  // 因为open已经存在，此操作无任何办法
		addClass(obj, 'me') // obj.className='open menu new me'
		console.log(obj.className)  // "open menu new me"

		removeClass(obj, 'open') // obj.className='menu new me'
		removeClass(obj, 'blabla')  // 不变
		
	代码如下：
	
 		var obj = {
            className: 'open menu'
        }

        function addClass(data, str) {
            for (var i in data) {
                if (data[i].split(" ").indexOf(str) === -1) {
                    var p = data[i].split(" ");
                    p.push(str);
                    data[i] = p.join(' ')
                    return data[i];
                } else {
                    p = data[i];
                    return data[i];
                }
            }
        }
        console.log(addClass(obj, "new"));
        console.log(addClass(obj, "open"));
        console.log(addClass(obj, "me"));
        console.log(obj.className);

        function removeClass(data, str) {
            for (var i in data) {
                var cat = data[i].split(" ")
                if (cat.indexOf(str) > -1) {
                    var dog = cat.filter(function(e) {
                        return e !== str;
                    });
                    data[i] = dog.join(" ");
                    return data[i];
                } else {
                    return data[i];
                }
            }
        }
        console.log(removeClass(obj, 'open')) // obj.className='menu new me'
         console.log(removeClass(obj, 'balaba'))
         
 - 写一个camelize函数，把my-short-string形式的字符串转化成myShortString形式的字符串，如
 
 		camelize("background-color") == 'backgroundColor'
		camelize("list-style-image") == 'listStyleImage' 
		
 代码如下：		
 
 		function camelize(str) {
        str = str.split("-");   
        //把字符串通过符号”-“拆分为数组；
        var data = "",
        p1 = "";        
        //命名俩个空数组；
        for (var i = 1; i < str.length; i++) {  
        //通过循环变量数组；
        data = str[i].split("");        
        //把数组的字符串元素继续拆分为数组；
        data[0] = data[0].toUpperCase();    
        //把第一个字母转换为大写；
        data = data.join("");       
        //把拆分的数组合并为字符串元素；
        p1 += data;
        //通过叠加来合并变量的元素；
        }
        p1 = str[0] + p1
        //把数组的第一个元素合并；
        console.log(p1)
        //输出结果
        return p1;
        //返回结果；
        }
        camelize("back-ground-color")
        camelize("list-style-image")
        
 - 如下代码输出什么？为什么?
 
 		arr = ["a", "b"];
		arr.push( function() { alert(this) } );
		arr[arr.length-1]()  // ?      
		
 解析如下：
 
 		arr = ["a", "b"];   
        arr.push( function() { alert(this) } );
        //把匿名函数添加到数组arr的末尾；
        //此时如果输出arr，就可以看到arr多了一个匿名函数；
        //["a", "b", function anonymous()]
        arr[arr.length-1]()  
        //arr[arr.length-1]选择的是数组arr的最后一个元素，
        //即刚刚添加的匿名函数；
        //然后加括号，表示这是一个自执行函数，
        //而函数的结果就是输出当前数组，
        //所以会弹窗输出数组的详情；输出的数组没有方括号，
        //类似输出alert([1,2,3])也没有方括号，但是
        //alert(”[1,2,3]“)当作字符串输出时候就会有方括号了。
        
 - 写一个函数filterNumericInPlace，过滤数组中的数字，删除非数字
 
 		arr = ["a", 1, "b", 2];
		filterNumericInPlace(arr);
		console.log(arr)  // [1,2]   
		
 代码如下：
 
 		arr = ["a", 1, "b", 2];
        function filterNumericInPlace(data) {
            for (var i = 0; i < data.length; i++) {
                //遍历数组元素
                if (typeof data[i] !== "number") {
                    //找到所以的非数字元素
                    data.splice(i, 1);
                    //删除所以的非数字元素
                }
            }
            return data;
            //返回有数字组成的数组
        }
        filterNumericInPlace(arr);
         //执行function
        console.log(arr);
         //输出数组  [1,2]     
         
 - 写一个ageSort函数实现如下功能：
 
 		var john = { name: "John Smith", age: 23 }
		var mary = { name: "Mary Key", age: 18 }
		var bob = { name: "Bob-small", age: 6 }
		var people = [ john, mary, bob ]
		ageSort(people) // [ bob, mary, john ] 
		
 代码如下：
 			
 		function ageSort(data){
            var count=[];
            for (var i in data){
                count.push(data[i].age);
            }
            console.log(count);
            count.sort(function(a,b){
                    return a-b;
                });
            console.log(count);
            return count;
        }
        // 怎么把数字和文字关联起来；
        // 数字排序已经完成；

        
 - 写一个filter(arr, func) 函数用于过滤数组，接受两个参数，第一个是要处理的数组，第二个参数是回调函数(回调函数遍历接受每一个数组元素，当函数返回true时保留该元素，否则删除该元素)。实现如下功能：
 
 		function isNumeric (el){
   		return typeof el === 'number'; 
		}
		arr = ["a", -1, 2, "b"]

		arr = filter(arr, isNumeric) ; // arr = [-1, 2],  过滤出数字
		arr = filter(arr, function(val) { return val > 0 });  // arr = [2] 过滤出大于0的整数       
		
 函数代码如下：
 
		function filter(arr,func){
       	 return arr.filter(func)		
   		 }   
   		 
### 字符串
 - 写一个 ucFirst函数，返回第一个字母为大写的字符
 
 		ucFirst("hunger") == "Hunger"
 		
  代码如下：
     		      
   		function ucFirst(str) {
        var cat = str.split("");
        //把字符串str分割为数组；
        cat[0] = cat[0].toUpperCase();
        //把数组的第一个元素转换为大写，并且重新赋值给自己；
        str = cat.join("");
        //把数组转换为字符串
        // console.log(str);
        return str;
        //返回新的字符串；
        }
        ucFirst("hunger") == "Hunger"
        
 - 写一个函数truncate(str, maxlength), 如果str的长度大于maxlength，会把str截断到maxlength长，并加上...，如
 
 		truncate("hello, this is hunger valley,", 10)) == "hello, thi...";
		truncate("hello world", 20)) == "hello world"   
		
 代码如下：
 
        function truncate(str, maxlength) {
            if (str.length > maxlength) {
                str = str.substr(0, maxlength) + "...";
                //通过substr（）方法返回字符串长度为maxlength
                console.log(str);
                return str;
            } else {
                console.log(str);
                return str;
            }
        }
        truncate("hello, this is hunger valley,", 10); //"hello, thi..."
        truncate("hello world", 20); //"hello world"
        
### 数学函数
 - 写一个函数limit2，保留数字小数点后两位，四舍五入， 如:    
 
 		var num1 = 3.456
		limit2( num1 );  //3.46
		limit2( 2.42 );    //2.42
		
 代码如下：
 
         function limit2(num) {
            num = Math.round(num * 100) / 100;
            console.log(num);
            return num;
        }
        var num1 = 3.456
         limit2(num1); //3.46
        limit2(2.42); //2.42		

 - 写一个函数，获取从min到max之间的随机数，包括min不包括max：
 - 
		function limit(min,max){
		var count = Math.random()*(max-min)+min
		console.log(count);
		} 
		
 - 写一个函数，获取从min都max之间的随机整数，包括min包括max
 
 		function limit(min,max){
 		var count = Math.round(Math.random()*(max-min)+min);
 		console.log(count);
 		}
 		
 - 写一个函数，获取一个随机数组，数组中元素为长度为len，最小值为min，最大值为max(包括)的随机数
 
 		        function limit2(min, max, len) {
            var arr = [];
            for (var i = 0; i < len; i++) {
                arr[i] = Math.random() * (max - min) + min;
                //遍历数组，先给arr赋值random随机数；
            }
            var a = Math.round(Math.random() * (len - 1));
            arr[a] = max;

            //在arr数组中通过给下标赋值（0～len-1）的整数为max；
            //覆盖之前的随机数；
            console.log(arr);
            //输出数组；
            return arr;
            //返回数组；
        }
        limit2(1, 4, 5); //min = 1 ; max = 4 ; len = 5;
         //[2.063154788927876, 2.130518894800349, 4, 3.8430192770209413, 2.689970523706876]
         //这样每次输出数组中都会有最大值4，最小值1的概率极低。