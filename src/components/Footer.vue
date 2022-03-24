<template>
  <v-footer id="footer" elevation="6" color="primary">
    <v-row justify="center" no-gutters>
      <v-btn
        color="white"
        text
        small
        class="my-1"
        rounded
        @click.stop="(showAbout = true), (showContact = false)"
      >
        Who We Are
      </v-btn>
      <v-btn
        color="white"
        text
        small
        class="my-1"
        rounded
        @click.stop="gotoBuyMeACoffe()"
      >
        Buy Me A Coffee
      </v-btn>
      <v-btn
        color="white"
        text
        small
        class="my-1"
        rounded
        @click.stop="(showContact = true), (showAbout = false)"
      >
        Contact Us
      </v-btn>
      <v-col class="primary py-1 text-center white--text" cols="12">
        <p>
          <strong>{{ new Date().getFullYear() }} - GREENER OMAHA</strong>
        </p>
      </v-col>
    </v-row>
    <About v-model="showAbout" />
    <Contact v-model="showContact" />
  </v-footer>
</template>

<script>
import About from "./About.vue";
import Contact from "./Contact.vue";

export default {
  components: {
    About,
    Contact,
  },
  data: () => ({
    showAbout: false,
    showContact: false,
  }),
  methods: {
    gotoBuyMeACoffe: () => {
      window.location.href = "https://www.buymeacoffee.com/recapurro327";
    },
  },
};
</script>

<style>
#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>