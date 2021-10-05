<template>
    <div class="home">
        <task-form />
        <task-list v-if="$store.state.tasks.length" />
        <no-task v-else />
    </div>
</template>

<script>
import TaskForm from "../components/Todo/TaskForm.vue";
import TaskList from "../components/Todo/TaskList.vue";
import NoTask from "../components/Todo/NoTask.vue";

export default {
    name: "Home",

    components: {
        "task-form": TaskForm,
        "task-list": TaskList,
        "no-task": NoTask,
    },
};
</script>