<template>
    <div @dblclick="toggleTask(task.id)" :class="[ task.reminder ? 'reminder' : '', 'task']">
        <h3>
            {{ task.text }}
            <i class="fas fa-times" @click="deleteTask(task.id)"></i>
        </h3>
        <p> {{ task.day }}</p>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default{
    name: 'Task',
    props: {
        task: Object
    },
    methods: { 
      ...mapActions(['deleteTask', 'fetchTask', 'updateTask']),

      async toggleTask(id){
        const taskToUpdate = await this.fetchTask(id);
        const updatedTask = { ...taskToUpdate, reminder: !taskToUpdate.reminder };
        // console.log(updatedTask);return;
        this.updateTask({ id, updatedTask });
      }

    }
}
</script>

<style scoped>
.fas {
  color: red;
}
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.task.reminder {
  border-left: 5px solid green;
}
.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>