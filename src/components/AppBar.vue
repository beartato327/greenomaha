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
        ><v-btn id="subMenuBtn" class="green--text">Who We Are</v-btn
        ><v-btn id="subMenuBtn" class="green--text"
          >Contact</v-btn
        ></v-toolbar-title
      >
    </v-app-bar>
  </div>
</template>

<script>
export default {};
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
</style>