import Vue from "vue";
import Vuex from "vuex";
import Localbase from "localbase";
let db = new Localbase("db");
db.config.debug = false; // Disable console log

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        appName: process.env.VUE_APP_TITLE,
        search: null,
        tasks: [
            // {
            //     id: 1,
            //     title: "First task",
            //     done: false,
            //     dueDate: "2021-10-3",
            // },           
        ],
        snackbar: {
            show: false,
            message: "",
        },
        sorting: false,
    },
    mutations: {
        addTask(state, newTask) {
            // if (newTaskTitle === "") return;
            state.tasks.push(newTask);
        },

        markTaskAsDone(state, id) {
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

        /**
         * @desc Update tasks state after drag sorting
         * @param {object} state
         * @param {object} tasks
         */
        reorderTasksAfterDrag(state, tasks) {
            state.tasks = tasks;
        },

        setTasks(state, tasks) {
            state.tasks = tasks;
        },

        updateTaskDueDate(state, payload) {
            let task = state.tasks.filter((task) => task.id === payload.id)[0];
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
        },
        toggleSorting(state) {
            state.sorting = !state.sorting;
        },
    },

    actions: {
        /**
         * @desc Retrive Tasks collection from index DB
         * @param {*} param0
         */
         getTasksFormIndexDb({ commit }) {
            db.collection("tasks")
                .get()
                .then((tasks) => {
                    commit("setTasks", tasks);
                });
        },

        /**
         * @dec Create new task item
         * @param {*} param0 
         * @param {*} newTaskTitle 
         */
        createTask({ commit }, newTaskTitle) {
            try {
                let newTask = {
                    id: Date.now(),
                    title: newTaskTitle,
                    done: false,
                    dueDate: null,
                };
                db.collection("tasks")
                    .add(newTask)
                    .then(() => {
                        commit("addTask", newTask);
                        commit("showSnackbar", "Task added !");
                    });
            } catch (error) {
                //@Todo Handle error (example display error in popup or modal)
                console.log(error);
            }
           
        },
        
        /**
         * @desc Find and Update task done property
         * @param {*} param0 
         * @param {*} id 
         */
        markTaskAsDone({ state, commit }, id) {
            let task = state.tasks.filter(task => task.id === id)[0];

            db.collection("tasks")
                .doc({ id: id })
                .update({
                    done: !task.done,
                })
                .then(() => {
                    commit("markTaskAsDone", id);
                });
        },

        /**
         * @desc Find and delete task
         * @param {*} param0 
         * @param {*} id 
         */
        deleteTask({ commit }, id) {
            db.collection("tasks")
                .doc({ id: id })
                .delete()
                .then(() => {
                    commit("deleteTask", id);
                    commit("showSnackbar", "Task deleted !");                                  
                });
        },

        /**
         * @desc Find, update and persit task title
         * @param {*} param0 
         * @param {*} updatedTask 
         */
        updateTask({ commit }, updatedTask) {
            db.collection("tasks")
                .doc({ id: updatedTask.id })
                .update({
                    title: updatedTask.title,
                })
                .then(() => {
                    commit("updateTask", updatedTask);
                    commit("showSnackbar", "Task updated !");                    
                });
        },

        /**
         * @desc Find, update and persit task due_date
         * @param {*} param0 
         * @param {*} updatedTask 
         */
        updateTaskDueDate({ commit }, updatedTask) {
            db.collection("tasks")
                .doc({ id: updatedTask.id })
                .update({
                    dueDate: updatedTask.dueDate,
                })
                .then(() => {
                    commit("updateTaskDueDate", updatedTask);
                    commit("showSnackbar", "Task due date updated !");
                });
        },

        reorderTasksAfterDrag({ commit }, orderedTasks) {
            db.collection("tasks").set(orderedTasks); // No asynchronious commit => remove glitch when draging task        
            commit('reorderTasksAfterDrag', orderedTasks);                
        }

        
    },

    getters: {
        filteredTasks(state) {
            if (!state.search) return state.tasks;

            return state.tasks.filter((task) =>
                task.title.toLowerCase().includes(state.search.toLowerCase())
            );
        },

        getSorting(state) {
            return state.sorting
        }
    },
    modules: {},
});
