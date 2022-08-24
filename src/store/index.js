import { createStore } from 'vuex';
import Tasks from './modules/Tasks'

export default createStore({
    modules: {
        Tasks
    }
})