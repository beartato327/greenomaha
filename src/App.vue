<template>
<v-app>
      <v-main>
        <AppBar />
        <Home />
      </v-main>
    </v-app></template>

<script>
import AppBar from './components/AppBar';
import Home from './components/Home';

export default {
  name: 'App',

  components: {
    AppBar,
    Home,
  },

  data: () => ({
    //
  }),
};
</script>
