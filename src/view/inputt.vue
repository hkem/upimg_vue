<template>
    <div>
        <h3>{{name}}</h3>
        <h3>{{price}}</h3>
        <input v-on:input="$emit('input', $event.target.value)">
        </div>
</template>
<script>
export default {
    name:"inputt",
    data(){
        return{
            name:"我们的",
            price:"加油",
            searchText:"谢谢"
        }
    }
}
</script>
