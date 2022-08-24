<template>
    <div v-for="(task, index) in tasks" :key="index">
        <Task :task="task" @delete-task="deleteTask" @toggle-reminder="toggleReminder"/>
    </div>
</template>

<script>
import Task from './Task.vue';
export default {
    name: 'Tasks',
    props: {
        tasks: Array
    },
    components: {
        Task
    },
    methods:{
        deleteTask(id){
            this.$emit('delete-task', id)
        },

        toggleReminder(id){
            this.$emit('toggle-reminder', id);
        }
    },
    emits:[ 'delete-task', 'toggle-reminder' ]
}
</script>