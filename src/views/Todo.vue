<template>
    <div class="home">        
        <task-list v-if="$store.getters.filteredTasks.length" />
        <no-task v-else />

        <btn-done-sorting v-if="$store.state.sorting"/>
    </div>
</template>

<script>
import TaskList from "../components/Todo/TaskList.vue";
import NoTask from "../components/Todo/NoTask.vue";
import ButtonDoneSortingVue from '../components/Todo/ButtonDoneSorting.vue';

export default {
    name: "Home",
    components: {        
        "task-list": TaskList,
        "no-task": NoTask,
        "btn-done-sorting": ButtonDoneSortingVue
    },
};
</script>