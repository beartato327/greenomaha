<template>
  <div>
    <v-app-bar height="100%" color="white" elevation="3" flat>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon>
 --><v-img
        id="logo"
        max-height="100px"
        max-width="300px"
        src="../assets/logo.png"
      ></v-img>
    </v-app-bar>
    <v-app-bar height="40%" text>
      <v-toolbar-title id="subMenu"
        ><v-btn @click.stop="showAbout = true" id="subMenuBtn" class="green--text" plain>Who We Are</v-btn
        ><v-btn @click.stop="showContact = true" id="subMenuBtn" class="green--text" plain
          >Contact</v-btn
        ></v-toolbar-title
      >
    </v-app-bar>
    <About v-model="showAbout"/>
    <Contact v-model="showContact"/>
  </div>
</template>

<script>
import About from './About.vue'
import Contact from './Contact.vue'
export default {
  components:{
    About,
    Contact,
  },
  data(){
    return{
      showAbout: false,
      showContact: false,
    }
  }
};
</script>

<style>
#subMenuBtn:hover {
  background-color: #64c44447 !important;
}
#logo {
  display: block;
  margin: 0 auto;
}
#subMenu {
  display: block;
  margin: 0 auto;
}

.v-btn--plain:not(.v-btn--active):not(.v-btn--loading):not(:focus):not(:hover) .v-btn__content{
  opacity: 1;
}
</style>