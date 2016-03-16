
function isNumber(e1){
	if(typeof e1 == "number"){
		return true;
	}
	else{
		return false;
	}
}
var a=2;
alert(isNumber(a));

number object boolean string undefined function


function isNumber(e1){
	if(typeof e1 == "number"){
		return true;
	}
	else{
		return false;
	}
}
function isString(e1){
	if(typeof e1 == "string"){
		return true;
	}
	else{
		return false;
	}
}
function isBoolean(e1){
	if(typeof e1 == "boolean"){
		return true;
	}
	else{
		return false;
	}
}
function isFunction(e1){
	if(typeof e1 == "function"){
		return true;
	}
	else{
		return false;
	}
}

var a = 2,
	b = "jirengu",
	c = false;
alert( isNumber(a));
alert(isString(a));
alert(isString(b));
alert( isBoolean(c) );
alert( isFunction(a) );
alert( isFunction( isNumber));


function isNumber(e1){
	if(typeof e1 == "number"){
		return true;
	}
}
function isString(e1){
	if(typeof e1 == "string"){
		return true;
	}
}
function isBoolean(e1){
	if(typeof e1 == "boolean"){
		return true;
	}
}
function isFunction(e1){
	if(typeof e1 == "function"){
		return true;
	}
}

var a = 2,
	b = "jirengu",
	c = false;
alert( isNumber(a));
alert(isString(a));
alert(isString(b));
alert( isBoolean(c) );
alert( isFunction(a) );
alert( isFunction( isNumber));

console.log(1+1) = 2;
console.log("2"+"4") = "24";
console.log(2+"4") = "24";
console.log(+new Date()) = 1457717756319;
console.log(+"4") = 4;

var arr = [3,4,5]
for(var i=0;i<arr.length;i++){
	console.log(arr[i]*arr[i]);
}

var arr = [3,4,5]
for(var i=0;i<arr.length;i++){
	console.log(arr[i]^2);
}

var arr = [3,4,5]
for(var i=0;i<arr.length;i++){
	console.log(arr[i]*arr[i]);
}
9
16
25

var arr = [3,4,5];
var sum;
for(var i=0;i<arr.length;i++){

	sum+=arr[i]*arr[i]+",";

}
console.log(sum);
9
16
25

var arr = [3,4,5];
var sum;
for(var i=0;i<arr.length;i++){
  sum+=arr[i]*arr[i]+",";
}
console.log(sum);
 undefined9,16,25,

var obj={
	name: "hunger",
	sex: "male",
	age: 28
}
for(var a in obj){

	console.log(a+": "+obj[a]+"; ");
}
name: hunger;
sex: male;
age: 28;

console.log(sum())
var obj={
	name: "hunger",
	sex: "male",
	age: 28
}
obj[0]

sum=function(){
	for(var a in obj){
		var b;
		b+=(a+": "+obj[a]+", ");
	}
}
console.log(sum)

