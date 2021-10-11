<template>
    <v-text-field
        v-model="newTaskTitle"
        @keyup.enter="createTask"
        class="pa-3 add_task"
        outlined
        placeholder="Add task"
        hide-details
        clearable
    >
        <template v-slot:append>
            <v-icon @click="createTask" color="white" :disabled="isTitleValid">
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
        createTask() {
            if (this.isTitleValid) return;
            this.$store.dispatch("createTask", this.newTaskTitle);
            this.newTaskTitle = "";
        },
    },
};
</script>

<style>
.add_task.v-input--is-focused .v-input__slot {
    background: rgba(31, 94, 129, 0.5) !important;
}
</style>
