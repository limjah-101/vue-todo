<template>
    <v-app id="inspire">   
        <!-- Sidebar -->     
        <v-navigation-drawer v-model="drawer" app>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-h6">Todo</v-list-item-title>
                    <v-list-item-subtitle>reload man</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

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
            </v-list>
        </v-navigation-drawer><!-- end_sidebar -->
      
        <!-- Navbar -->
        <v-app-bar 
            app           
            color="primary"
            dark            
            src="mountains.jpg" 
            prominent           
        >
            <template v-slot:img="{ props }">
                <v-img
                    v-bind="props"
                    gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
                ></v-img>
            </template>

            <v-container class="pa-0">
                <v-row>
                    <v-app-bar-nav-icon @click="drawer = !drawer" class="mt-2"></v-app-bar-nav-icon>
                    <v-spacer></v-spacer>
                    <search-bar />
                </v-row>
                <v-row>
                    <v-app-bar-title class="ml-4">Vuetify-Todo</v-app-bar-title>                    
                </v-row>
            </v-container>
                        
        </v-app-bar><!-- End_Navbar -->

        <v-main>            
            <router-view></router-view>
            <snackbar />
        </v-main>

    </v-app>
</template>

<script>
import Snackbar from './components/Shared/Snackbar.vue';
import SearchBarVue from './components/Tools/SearchBar.vue';

export default {
    data: () => ({
        drawer: null,
        items: [
            { title: "Todo", icon: "mdi-format-list-checks", to: "/" },
            { title: "About", icon: "mdi-help-box", to: "/about" },
        ],
        
    }),
    components: {
        'snackbar': Snackbar,
        'search-bar': SearchBarVue
    }
};
</script>
