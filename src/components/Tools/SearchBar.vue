<template>
    <v-text-field 
        :value="$store.state.search"
        @input="$store.commit('setSearch', $event)"
        @focus="searchClosed = false"
        @blur="searchClosed = true"
        placeholder="Search" 
        filled 
        dense 
        clearable 
        prepend-inner-icon="mdi-magnify" 
        :class="{ 'closed' : searchClosed && !$store.state.search }"
        class="mt-3 expanding-search"></v-text-field>
</template>

<script>
export default {
    data() {
        return {
            term: '',
            searchClosed: true
        }
    }
};
</script>



<style>
.v-text-field > .v-input__control > .v-input__slot:before, 
.v-text-field > .v-input__control > .v-input__slot:after {
    border-color: transparent !important;    
}

.v-text-field.expanding-search{
    transition: max-width .3s ease-in-out;
}
.v-text-field.closed{
    max-width: 50px;
}

.v-text-field.closed .v-input__slot{
    cursor: pointer !important;
    background: transparent !important;
}
</style>
