<template>
  <v-dialog
    v-model="dialog"
    hide-overlay
    transition="dialog-bottom-transition"
    max-width="600px"
    :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <v-card>
      <v-toolbar dark color="teal lighten-1">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="flex text-center">Contact Us</v-toolbar-title>
      </v-toolbar>
      <!--   <v-card-text class="text-header-4 pt-5">
            Thank you for reaching out! We will try to acknowledge emails within 24 hours.
            <br /><br />
            While we get our email service set up please email us at <a href="mailto:support@greenomaha.something">support@greenomaha.something</a>
        </v-card-text> -->
      <div v-if="show_contact" id="form">
        <div class="pt-4" v-if="contact_notice != ''">
          <v-alert color="red" shaped outlined type="error">
            There was an error submitting your comment: {{ contact_notice }}
          </v-alert>
        </div>
        <v-form
          @submit.prevent="sendContactMessage()"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="name"
            :counter="20"
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
            v-model="comment"
            :counter="250"
            :comment="comment"
            :rules="commentRules"
            label="Comment"
            required
          ></v-textarea>

          <v-btn
            :disabled="!valid"
            color="teal lighten-1"
            class="mr-4 white--text"
            @click="validate"
          >
            Send
          </v-btn>
        </v-form>
      </div>
      <div v-else class="text-center">
        <h2>We received your comment!</h2>
        <h3>
          Thank you for reaching out, we will attempt to respond in 24 hours if
          there was question or request made.
        </h3>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      show_contact: true,
      contact_notice: "",
      valid: true,
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 20) || "Name must be less than 10 characters",
      ],
      comment: "",
      commentRules: [
        (v) => !!v || "Comment field is required",
        (v) => (v && v.length <= 250) || "This field is required",
      ],
    };
  },
  props: {
    value: Boolean,
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    sendConntactMessage(){
      const url = `https://us-central1-greenomaha-137ec.cloudfunctions.net/sendEmail?name=${this.name}&email_from=${this.email}&message=${this.comment}`
      
    }
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style>
#form {
  margin: auto;
  width: 90%;
  text-align: center;
  padding-bottom: 15px;
}
</style>
