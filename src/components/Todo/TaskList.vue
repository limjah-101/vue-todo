<template>
    <v-list flat class="pt-0">
        <draggable 
            v-model="tasks" 
            handle=".handle">
            <task-item
                v-for="task in tasks"
                :key="task.id"
                :task="task"
            />
        </draggable>
    </v-list>
</template>

<script>
import TaskItem from "./TaskItem.vue";
import draggable from "vuedraggable";

export default {
    components: {
        "task-item": TaskItem,
        draggable: draggable,
    },
    computed: {
        tasks: {
            get() {
                return this.$store.getters.filteredTasks;
            },
            set(value) {
                this.$store.commit("updateTasksAfterDragSorting", value);
            },
        },
    },
};
</script>
