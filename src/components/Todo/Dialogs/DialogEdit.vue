<template>
    <v-dialog :value="true" persistent max-width="290">
        <v-card>
            <v-card-title class="text-h5">
                Edit Task
            </v-card-title>
           
            <v-card-text>
                Edit the title of the task  
                <v-text-field v-model="taskTitle" @keyup.enter="updateTask"/>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                    @click="$emit('closeDialog')"
                    color="grey darken-1" 
                    text 
                >
                    Cancel
                </v-btn>
                <v-btn 
                    @click="updateTask"
                    :disabled="isTitleValid"
                    color="red darken-1" 
                    text
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
   props: ['task'],

   data: () => ({
       taskTitle: null
   }),

   mounted() {
       this.taskTitle = this.task.title
   },

   computed: {
       isTitleValid() {
           return !this.taskTitle || this.taskTitle === this.task.title;
       }
   },

   methods: {
       
       updateTask() {
           if(this.isTitleValid)
                return;

           let updatedTask = {
               id: this.task.id,
               title: this.taskTitle
           }
           this.$store.commit('updateTask', updatedTask);
           this.$emit('closeDialog'); // close modal
       }
   }

}
</script>