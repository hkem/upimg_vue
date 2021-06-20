<template>
    <div>
        <h3>{{name}}</h3>
        <h3>{{price}}</h3>
        <button v-on:click="$emit('enlarge-text',1)">Enlarge text</button>
        <input v-model="searchText">
        </div>
</template>
<script>
export default {
    name:"test",
    data(){
        return{
            name:"我们的",
            price:"加油",
            searchText:"谢谢"
        }
    }
}
</script>
