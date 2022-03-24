<template>
  <v-expansion-panel>
    <v-expansion-panel-header id="styro-exp-panel" class="text-h5 orange--text"
      >Styrofoam Recycling<v-icon class="pl-2" color="orange"
        >mdi-food-takeout-box</v-icon
      ></v-expansion-panel-header
    >
    <v-expansion-panel-content>
      <Hefty />
      <v-card v-for="(location, i) in styroSites" :key="i">
        <v-card-title class="text-h5 orange--text">
          {{ location.site }}
        </v-card-title>
        <v-card-subtitle
          ><div>{{ location.address }}</div>
          <div>{{ location.hours }}</div></v-card-subtitle
        >
        <v-card-text>
          <div>Description: {{ location.description }}</div>
          <div>Status: {{ location.status }}</div>
          <div v-if="location.reported === null"></div>
          <div v-else>
            Last reported:
            {{
              location.reported.toDate().toLocaleDateString([], {
                month: "numeric",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
          </div>
        </v-card-text>
        <v-card-actions>
          <CardFooter v-bind:location="location" />
        </v-card-actions>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { db } from "../firebase/db";
import { collection, onSnapshot } from "firebase/firestore";
import CardFooter from "./CardFooter.vue";
import Hefty from "./Hefty.vue"

export default {
  components: {
    CardFooter,
    Hefty,
  },
  props: {
    id: Object,
  },
  data() {
    return {
      styroSites: [],
    };
  },
  mounted() {
    const colRef = collection(db, "styroSites");

    onSnapshot(colRef, (snapshot) => {
      const styroSites = [];
      snapshot.docs.forEach((doc) => {
        styroSites.push({ ...doc.data(), id: doc.id });
      });
      this.styroSites = styroSites;
    });
  },
};
</script>

<style>
#styro-exp-panel:hover{
  background-color: #FFF3E0;
}

@media screen and (min-width: 600px) {
  .v-expansion-panel {
    max-width: 66.66%;
  }
}
</style>
