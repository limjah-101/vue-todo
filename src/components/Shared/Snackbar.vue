<template>
    <v-snackbar v-model="$store.state.snackbar.show">
        {{ $store.state.snackbar.message }}

        <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="$store.commit('hideSnackbar')">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>
<style>
/** fix unable to see snackbar on android device  */
div.v-snack:not(.v-snack--absolute) {
    height: 100%;
}
</style>
