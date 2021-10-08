<template>
  <v-btn 
    @click="$store.commit('toggleSorting')"
    color="primary"
    class="btn-done-sorting"
    >Done sorting</v-btn>
</template>

<script>
export default {

}
</script>

<style>
.btn-done-sorting {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}
</style>