<template>
    <div>
        <v-list-item
            @click="$store.commit('doneTask', task.id)"
            :class="{ 'blue lighten-5': task.done }"
        >
            <template v-slot:default="">
                <v-list-item-action>
                    <v-checkbox :input-value="task.done"></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                    <v-list-item-title
                        :class="{
                            'text-decoration-line-through': task.done,
                        }"
                        >{{ task.title }}</v-list-item-title
                    >
                </v-list-item-content>

                <v-list-item-action v-if="task.dueDate">
                    <v-list-item-action-text>
                        <v-icon small>mdi-calendar</v-icon>
                        {{ task.dueDate | formatDate }}
                    </v-list-item-action-text>                   
                </v-list-item-action>

                <v-list-item-action>
                    <task-menu :task="task" />
                </v-list-item-action>
            </template>
        </v-list-item>
        <v-divider></v-divider>
    </div>
</template>

<script>
import TaskMenuVue from "./TaskMenu.vue";
import { format } from 'date-fns'

export default {
    props: ["task"],

    filters: {
        formatDate(date) {
            return format(new Date(date), 'MMM d')
        }
    },
    components: {
        "task-menu": TaskMenuVue,
    },
};
</script>
