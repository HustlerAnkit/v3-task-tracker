const state = {
    tasks: [],
};
const getters = {
    allTasks: (state) => state.tasks,
};
const actions = {
    async storeTask({ commit }, task){
        const response = await fetch('/api/tasks', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        const data = await response.json();
        commit('addTask', data);
    },

    async fetchTasks({ commit }){
        const response = await fetch('/api/tasks');
        const data = await response.json();
        commit('setTasks', data);
    },

    async deleteTask({ commit }, id){
        if(confirm('are you sure, you want to delete this task ?')){
            const response = await fetch(`/api/tasks/${id}`, {
                method: 'delete'
            });
            await response.status === 200 ? commit('removeTask', id) : console.error('Error whiyte deleting Task...');
        }
    },

    async fetchTask({ commit }, id){
        const response = await fetch(`/api/tasks/${id}`);
        const data = await response.json();
        return data;
    },

    async updateTask({ commit }, { id, updatedTask }){
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask)
        });
        const data = await response.json();
        commit('updateTask', { id, data });
    }
};
const mutations = {
    // addTask: (state, task) => state.tasks.unshift(task),
    addTask: (state, task) => state.tasks = [...state.tasks, task],
    setTasks: (state, tasks) => state.tasks = tasks,
    removeTask: (state, id) => state.tasks = state.tasks.filter( task => task.id !== id),
    updateTask: (state, { id, data: updatedTask }) => state.tasks = state.tasks.map( task => task.id === id ? updatedTask : task)
};

export default {
    state,
    getters,
    actions,
    mutations
}