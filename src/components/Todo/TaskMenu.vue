<template>
    <div>
        <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="grey" icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    @click="handleMenuClick(i)"
                >
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <dialog-edit
            v-if="dialogs.edit"
            :task="task"
            @closeDialog="dialogs.edit = false"
        />
        <dialog-delete
            v-if="dialogs.delete"
            :task="task"
            @closeDialog="dialogs.delete = false"
        />

         <dialog-due-date
            v-if="dialogs.dueDate"
            :task="task"
            @closeDialog="dialogs.dueDate = false"
        />
    </div>
</template>

<script>
import DialogDeleteVue from "./Dialogs/DialogDelete.vue";
import DialogDueDateVue from './Dialogs/DialogDueDate.vue';
import DialogEditVue from "./Dialogs/DialogEdit.vue";

export default {
    data: () => ({
        dialogs: {
            edit: false,
            delete: false,
            dueDate: false
        },
        items: [
            {
                title: "Edit",
                icon: "mdi-pencil",
                onClick() {
                    this.dialogs.edit = true;
                },
            },
            {
                title: "Due date",
                icon: "mdi-calendar",
                onClick() {
                    this.dialogs.dueDate = true;
                },
            },
            {
                title: "Delete",
                icon: "mdi-delete",
                onClick() {
                    this.dialogs.delete = true;
                },
            },
             {
                title: "Sort",
                icon: "mdi-drag-horizontal-variant",
                onClick() {
                    if(!this.$store.state.search)
                        this.$store.commit('toggleSorting');
                    else
                        this.$store.commit('showSnackbar', 'Sorry, unable to sort while searching !')
                },
            },
        ],
    }),
    methods: {
        handleMenuClick(i) {
            this.items[i].onClick.call(this); // bind this to onClick scope
        },
    },
    components: {
        "dialog-edit": DialogEditVue,
        "dialog-delete": DialogDeleteVue,
        "dialog-due-date": DialogDueDateVue        
    },
    props: ["task"],
};
</script>

