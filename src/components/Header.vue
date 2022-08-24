<template>
    <header>
        <h1>{{ title }}</h1>
        <Btn v-show="homePage" :text="toggleAddTask ? 'Close' : 'Add Task'" :color="toggleAddTask ? 'red' : 'green'" @btn-clicked="$emit('toggle-task')" />
    </header>
</template>
<script>
import Btn from './Btn.vue';
export default {
    name: 'Header',
    props: {
        title: String,
        toggleAddTask: Boolean
    },
    components: {
        Btn
    },
    computed:{
        homePage(){
            if(this.$route.name === 'Home'){
                return true;
            }else{
                return false;
            }
        }
    }
}
</script>
<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>