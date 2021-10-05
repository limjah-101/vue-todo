<template>
    <div>
        <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" icon v-bind="attrs" v-on="on">
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
    </div>
</template>

<script>
import DialogDeleteVue from "./Dialogs/DialogDelete.vue";
import DialogEditVue from "./Dialogs/DialogEdit.vue";

export default {
    data: () => ({
        dialogs: {
            edit: false,
            delete: false,
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
                    console.log("DATA");
                },
            },
            {
                title: "Delete",
                icon: "mdi-delete",
                onClick() {
                    this.dialogs.delete = true;
                },
            },
        ],
    }),
    methods: {
        handleMenuClick(i) {
            this.items[i].onClick.call(this); // pass this to onClick scope
        },
    },
    components: {
        "dialog-edit": DialogEditVue,
        "dialog-delete": DialogDeleteVue,
    },
    props: ["task"],
};
</script>
