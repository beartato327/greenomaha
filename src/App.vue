<template>
  <v-app>
    <v-main>
      <AppBar />
      <v-container id="container">
        <Home />
      </v-container>
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar";
import Home from "./components/Home";
import Footer from "./components/Footer";

export default {
  name: "App",

  components: {
    AppBar,
    Home,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>
#container {
/*   min-height: 100vh; /* will cover the 100% of viewport */
  overflow: hidden;
  display: block;
  position: relative;
  padding-bottom: 150px; /* height of your footer */
}
</style>
