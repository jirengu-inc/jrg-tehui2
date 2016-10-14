<template>
  <div id="app">
    <h1 v-text="title"></h1>
    <input v-model="newItem" @keyup.13="addNew" placeholder="what to do?">
    <ul v-for="item in items">
      <li :class="{finished:item.isFinished}" @click="toggleClass(item)">{{item.label}}<button @click="removeItem($index)">X</button></li>
    </ul>
  </div>
</template>
<script> 
import Store from "./store"
console.log(Store);
export default {
  data:function(){
    return{
      title:"Work to do",
      items:Store.fetch(),
      newItem:""
    }
  },
  watch:{
    items:{
      handler:function(items){
        Store.save(items);
      },
      deep:true
    }
  },
  methods:{
    toggleClass:function(item){
      item.isFinished = !item.isFinished;
    },
    addNew:function(){
      this.items.push({
        label:this.newItem,
        isFinished:true
      });
      this.newItem = "";
    },
    removeItem:function(idx){
      this.items.splice(idx,1);
    }
  }
}
</script>

<style>
.finished{
  text-decoration: underline;
}
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}
#app a {
  color: #42b983;
  text-decoration: none;
}
button{
  border-radius: 4px;
  margin-left:20px;
}
</style>
