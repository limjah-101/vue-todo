import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        appName: process.env.VUE_APP_TITLE,
        search: null,
        tasks: [
            {
                id: 1,
                title: "First task",
                done: false,
                dueDate: "2021-10-3",
            },
            {
                id: 2,
                title: "Move data to vue store",
                done: false,
                dueDate: "2021-10-21",
            },
            {
                id: 3,
                title: "Add date picker",
                done: false,
                dueDate: null,
            },
        ],
        snackbar: {
            show: false,
            message: "",
        }        
    },
    mutations: {
        addTask(state, newTaskTitle) {
            if (newTaskTitle === "") return;

            let newTask = {
                id: Date.now(),
                title: newTaskTitle,
                done: false,
                dueDate: null
            };

            state.tasks.push(newTask);
        },
        doneTask(state, id) {
            let task = state.tasks.filter((task) => task.id === id)[0];
            task.done = !task.done;
        },

        deleteTask(state, id) {
            state.tasks = state.tasks.filter((task) => task.id !== id);
        },

        updateTask(state, updatedTask) {
            let task = state.tasks.filter(
                (task) => task.id === updatedTask.id
            )[0];
            task.title = updatedTask.title;
        },

        updateTaskDueDate(state, payload) {
            let task = state.tasks.filter(
                (task) => task.id === payload.id
            )[0];
            task.dueDate = payload.dueDate;
        },

        showSnackbar(state, message) {
            let timeout = 0;

            if (state.snackbar.show) {
                state.snackbar.show = false;
                timeout = 300;
            }

            setTimeout(() => {
                state.snackbar.show = true;
                state.snackbar.message = message;
            }, timeout);
        },

        hideSnackbar(state) {
            state.snackbar.show = false;
        },

        setSearch(state, value) {            
            state.search = value;
        }
    },

    actions: {
        addTask({ commit }, newTaskTitle) {
            commit("addTask", newTaskTitle);
            commit("showSnackbar", "Task added !");
        },
        deleteTask({ commit }, id) {
            commit("deleteTask", id);
            commit("showSnackbar", "Task deleted !");
        },

        updateTask({ commit }, updatedTask) {
            commit("updateTask", updatedTask);
            commit("showSnackbar", "Task updated !");
        },

        updateTaskDueDate({ commit }, updatedTask) {
            commit("updateTaskDueDate", updatedTask);
            commit("showSnackbar", "Task due date updated !");
        },
    },

    getters: {
        filteredTasks(state) {
            if(!state.search) return state.tasks;
            
            return state.tasks.filter(task => task.title.toLowerCase().includes(state.search.toLowerCase()))
        }
    },
    modules: {},
});
