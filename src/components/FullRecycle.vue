<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-h5 green--text"
      >Full Service Recycling<v-icon color="green"
        >mdi-recycle</v-icon
      ></v-expansion-panel-header
    >
    <v-expansion-panel-content>
      <v-card v-for="(location, i) in fullSites" :key="i">
        <v-card-title class="text-h5 green--text">
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
         <CardFooter  v-bind:location="location"/>
        </v-card-actions>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { db } from "../firebase/db";
import { collection, onSnapshot } from "firebase/firestore";
import CardFooter from "./CardFooter.vue";

export default {
  components: {
    CardFooter,
  },
  props: {
    id: Object,
  },
  data() {
    return {
      fullSites: [],
    };
  },
  mounted() {
    const colRef = collection(db, "fullSites");

    onSnapshot(colRef, (snapshot) => {
      const fullSites = [];
      snapshot.docs.forEach((doc) => {
        fullSites.push({ ...doc.data(), id: doc.id });
      });
      this.fullSites = fullSites;
    });
  },
};
</script>

<style></style>
