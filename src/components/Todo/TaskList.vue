<template>
    <v-list flat class="pt-0">
        <task-item
            v-for="task in $store.getters.filteredTasks" 
            :key="task.id"
            :task="task"
        />        
    </v-list>
</template>

<script>
import TaskItem from './TaskItem.vue';

export default {    
    components: {
        'task-item': TaskItem
    }
};
</script>
