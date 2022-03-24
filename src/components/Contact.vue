<template>
  <v-dialog
    v-model="dialog"
    @input="resetForm"
    hide-overlay
    transition="dialog-bottom-transition"
    max-width="600px"
    :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <v-card>
      <v-toolbar dark color="teal lighten-1">
        <v-btn icon dark @click="(dialog = false), resetForm()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="flex text-center">Contact Us</v-toolbar-title>
      </v-toolbar>
      <!--   <v-card-text class="text-header-4 pt-5">
            Thank you for reaching out! We will try to acknowledge emails within 24 hours.
            <br /><br />
            While we get our email service set up please email us at <a href="mailto:support@greenomaha.something">support@greenomaha.something</a>
        </v-card-text> -->
      <div id="form">
        <div id="alert-success" class="pt-4" v-if="show_success">
          <v-alert dense color="green" shaped type="success">
            Message was sent successfully!
          </v-alert>
        </div>
        <v-form
          id="comment-form"
          @submit.prevent="sendContactMessage"
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
            form="comment-form"
            type="submit"
            :disabled="!valid"
            color="teal lighten-1"
            class="mr-4 white--text"
            @click="validate"
          >
            Send
          </v-btn>
        </v-form>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      show_success: false,
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
    sendContactMessage() {
      const url = `https://us-central1-greenomaha-137ec.cloudfunctions.net/sendEmail?name=${this.name}&email_from=${this.email}&message=${this.comment}`;
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(url, requestOptions);
      this.show_success = true;
      this.resetForm();
      setTimeout(() => {
        this.show_success = false;
        this.resetForm();
      }, 3000);
    },
    resetForm() {
      this.$refs.form.reset();
    },
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

#alert-success {
  margin: auto;
  width: 75%;
}
</style>
