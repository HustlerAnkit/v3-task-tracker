<template>
    <div>
        <button @click="btnClicked()" class="btn" :style="{ background: color }">{{ text }}</button>
    </div>
</template>
<script>
export default {
    name: 'Btn',
    props: {
        color: String,
        text: String
    },
    methods: {
        btnClicked(){
            this.$emit('btn-clicked');
        }
    }
}
</script>
<style lang="">
    
</style>