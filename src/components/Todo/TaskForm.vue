<template>
    <v-text-field
        v-model="newTaskTitle"        
        @keyup.enter="addTask"
        class="pa-3"
        outlined
        label="Add task"        
        hide-details
        clearable
    >
        <template v-slot:append>
            <v-icon @click="addTask" color="primary" :disabled="isTitleValid">
                mdi-plus
            </v-icon>
        </template>
    </v-text-field>
</template>

<script>
export default {
    data() {
        return {
            newTaskTitle: "",
        };
    },
    computed: {
        isTitleValid() {
            return !this.newTaskTitle;
        },
    },

    methods: {
        addTask() {
            if (this.isTitleValid) return;
            this.$store.dispatch("addTask", this.newTaskTitle);
            this.newTaskTitle = "";
        },
    },
};
</script>
