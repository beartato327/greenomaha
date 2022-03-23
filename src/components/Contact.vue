<template>
  <v-dialog v-model="dialog" hide-overlay transition="dialog-bottom-transition" max-width="600px" :fullscreen="$vuetify.breakpoint.xsOnly">
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
      <!--   <div id="form">
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-textarea
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Item"
      required
    ></v-textarea>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Send
    </v-btn>
  </v-form>
        </div> -->
      </v-card>
  </v-dialog>
</template>

<script>
export default {
  data(){
    return{
      contact_email: '',
      contact_message: '',
      contact_notice: '',
    }
  },
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

<style>
#form{
  margin: auto;
  width: 90%;
  text-align: center;
  padding-bottom: 15px;
}
</style>
