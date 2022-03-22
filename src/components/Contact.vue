<template>
  <v-dialog v-model="dialog" hide-overlay transition="dialog-top-transition" max-width="600px" :fullscreen="$vuetify.breakpoint.xsOnly">
    <v-card>
        <v-toolbar
          dark
          color="teal lighten-1"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title class="flex text-center">Contact Us</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="text-header-4 pt-5">
            Thank you for reaching out! We will try to acknowledge emails within 24 hours.
            <br /><br />
            While we get our email service set up please email us at <a href="mailto:support@greenomaha.something">support@greenomaha.something</a>
        </v-card-text>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
    props:{
        value: Boolean,
    },
    computed:{
        dialog:{
            get(){
                return this.value
            },
            set(value){
                this.$emit('input', value)
            }
        }
    }
};
</script>

<style></style>
