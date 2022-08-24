<template>
    <AddTask v-if="toggleAddTask" @add-task="addTask" />
    <Tasks :tasks="tasks" @delete-task="deleteTask" @toggle-reminder="toggleReminder"/>
</template>

<script>
import AddTask from '../components/AddTask.vue';
import Tasks from '../components/Tasks.vue';

export default {
    inheritAttrs:false,
    name: 'Home',
    props: {
        toggleAddTask: Boolean
    },
    components:{
        AddTask, Tasks
    },
    data(){
        return {
            tasks: [],
        }
    },
    methods: {
        async addTask(newTask){
            const response = await fetch('/api/tasks', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask)
            });
            const data = await response.json();
            this.tasks = [ ...this.tasks, data];
        },

        async deleteTask(id){
            if(confirm('Are you sure, to delete this task ?')){
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'delete'
            });
            await response.status === 200 ? this.tasks = this.tasks.filter(task => task.id !== id) : alert('Error while deleting task...');
            }
        },

        async toggleReminder(id){
        const taskToToggle = await this.fetchTask(id);
        const updatedTask = await { ...taskToToggle, reminder: !taskToToggle.reminder };
        console.log(updatedTask);
        const response = await fetch(`/api/tasks/${id}`, {
                            method: 'PUT',
                            headers:{
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updatedTask)
                            });
        const data = await response.json();
        await response.status === 200 ? this.tasks = this.tasks.map( task => task.id === id ? {...task, reminder : data.reminder } : task) : alert('Error while updating task...');
        },

        async fetchTasks(){
            const response = await fetch('/api/tasks');
            const data = await response.json();
            return data; 
        },

        async fetchTask(id){
            const response = await fetch(`/api/tasks/${id}`);
            const data = await response.json();
            return data;
        }
    },
    async created(){
        this.tasks = await this.fetchTasks()
    }
}
</script>