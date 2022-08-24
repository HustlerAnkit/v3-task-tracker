<template>
    <AddTask v-if="toggleAddTask" />
    <Tasks :tasks="allTasks"/>
</template>

<script>
import AddTask from '../components/AddTask.vue';
import Tasks from '../components/Tasks.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Home',
    props: {
        toggleAddTask: Boolean
    },
    components:{
        AddTask, Tasks
    },
    computed: {
        ...mapGetters(['allTasks'])
    },
    methods: {
        ...mapActions(['fetchTasks']),
    },
    created(){
        this.fetchTasks();
    }
}
</script>