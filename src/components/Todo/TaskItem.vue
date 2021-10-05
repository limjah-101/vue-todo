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

                <v-list-item-action>
                    <v-btn
                        icon
                        @click.stop="dialogs.delete = true"
                    >
                        <v-icon color="grey lighten-1">mdi-delete</v-icon>
                    </v-btn>
                </v-list-item-action>
            </template>
        </v-list-item>
        <v-divider></v-divider>

        <dialog-delete 
            v-if="dialogs.delete" 
            :task="task"
            @closeDialog="dialogs.delete = false"            
        />
    </div>
</template>

<script>
import DialogDeleteVue from './Dialogs/DialogDelete.vue';


export default {
    data() {
        return {
            dialogs: {
                delete: false
            }
        }
    },
    props: ['task'],

    components: {
        'dialog-delete': DialogDeleteVue
    }
};
</script>
