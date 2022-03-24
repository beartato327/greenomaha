<template>
  <v-expansion-panel>
    <v-expansion-panel-header id="glass-exp-panel" class="text-h5 purple--text"
      >Glass Recycling<v-icon class="pl-2" color="purple"
        >mdi-bottle-soda</v-icon
      ></v-expansion-panel-header
    >
    <v-expansion-panel-content>
      <v-card v-for="(location, i) in glassSites" :key="i">
        <v-card-title class="text-h5 purple--text">
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

export default {
  components: {
    CardFooter,
  },
  props: {
    id: Object,
  },
  data() {
    return {
      glassSites: [],
    };
  },
  mounted() {
    const colRef = collection(db, "glassSites");

    onSnapshot(colRef, (snapshot) => {
      const glassSites = [];
      snapshot.docs.forEach((doc) => {
        glassSites.push({ ...doc.data(), id: doc.id });
      });
      this.glassSites = glassSites;
    });
  },
};
</script>

<style>
#glass-exp-panel:hover {
 background-color: #F3E5F5;
}

@media screen and (min-width: 600px) {
  .v-expansion-panel {
    max-width: 66.66%;
  }
}
</style>
