import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      tasks: [
          {
              id: 1,
              title: 'First task',
              done: false
          },
          {
            id: 2,
            title: 'Move data to vue store',
            done: false
        },
      ]
  },
  mutations: {
    addTask(state, newTaskTitle) {
        if(newTaskTitle === '')
            return;

        let newTask = {
            id: Date.now(),
            title: newTaskTitle,
            done: false
        }

        state.tasks.push(newTask);        
    },
    doneTask(state, id) {
        let task = state.tasks.filter( task => task.id === id)[0];
        task.done = !task.done;
    },
    deleteTask(state, id) {
        state.tasks = state.tasks.filter((task) => task.id !== id);            
    },
  },
  actions: {
  },
  modules: {
  }
})
