<template>
    <v-app id="inspire">
        <!-- Sidebar -->
        <v-navigation-drawer v-model="drawer" app :mobile-breakpoint="768">
            <v-img
                src="sea.jpg"
                height="170"
                gradient="to top right, rgba(19,84,122,.0), rgba(128,208,199,.0)"
                class="pa-4 pt-6"
            >
                <v-avatar size="70" class="mb-2">
                    <img
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                        alt="John"
                    />
                </v-avatar>
                <div class="white--text text-subtitle-1 font-weight-bold">
                    Coming
                </div>
                <div class="white--text text-subtitle-2">
                    Soon
                </div>
            </v-img>

            <v-list dense nav>
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    :to="item.to"
                    link
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list> </v-navigation-drawer
        ><!-- end_sidebar -->

        <!-- Navbar -->
        <v-app-bar
            app
            color="primary"
            dark
            src="sea.jpg"
            prominent
            :height="$route.path === '/' ? '220' : '170'"
        >
            <template v-slot:img="{ props }">
                <v-img
                    v-bind="props"
                    gradient="to top right,  rgba(0,0,0, .5),  rgba(0,0,0, .0)"
                ></v-img>
            </template>

            <v-container class="header-container pa-0">
                <v-row>
                    <v-app-bar-nav-icon
                        @click="drawer = !drawer"
                        class="mt-2"
                    ></v-app-bar-nav-icon>
                    <v-spacer></v-spacer>
                    <search-bar />
                </v-row>
                <v-row>
                    <v-toolbar-title class="text-h4 font-weight-bold ml-4">{{
                        $store.state.appName
                    }}</v-toolbar-title>
                </v-row>

                <!--Live DateTime-->
                <live-date /><!--End_Live_DateTime-->

                <!-- New Task Input -->
                <v-row v-if="$route.path === '/'">
                    <task-form /> </v-row
                ><!-- End_New Task Input -->
            </v-container> </v-app-bar
        ><!-- End_Navbar -->

        <v-main>
            <router-view></router-view>
            <snackbar />
        </v-main>
    </v-app>
</template>

<script>
import Snackbar from "./components/Shared/Snackbar.vue";
import TaskFormVue from "./components/Todo/TaskForm.vue";
import LiveDateVue from "./components/Tools/LiveDate.vue";
import SearchBarVue from "./components/Tools/SearchBar.vue";

export default {
    data: () => ({
        drawer: null,
        items: [
            { title: "Todo", icon: "mdi-format-list-checks", to: "/" },
            { title: "About", icon: "mdi-help-box", to: "/about" },
        ],
    }),
    components: {
        snackbar: Snackbar,
        "search-bar": SearchBarVue,
        "live-date": LiveDateVue,
        "task-form": TaskFormVue,
    },
    mounted() {
        // Fetch tasks from index DB
        this.$store.dispatch("getTasksFormIndexDb");
    },
};
</script>

<style scoped>
.header-container {
    max-width: none;
}
</style>
