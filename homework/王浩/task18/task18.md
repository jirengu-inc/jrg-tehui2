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

