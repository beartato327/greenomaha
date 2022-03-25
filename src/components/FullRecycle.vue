<template>
  <v-expansion-panels class="pa-0 mt-1">
    <v-expansion-panel>
      <v-expansion-panel-header
        id="recycle-exp-panel"
        class="text-h5 green--text"
        >Full Service Recycling<v-icon class="pl-2" color="green"
          >mdi-recycle</v-icon
        ></v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <Hefty />
        <v-expansion-panels>
          <v-expansion-panel id="child-panel" v-for="(location, i) in fullSites" :key="i">
            <v-expansion-panel-header class="text-h6 green--text">{{
              location.site
            }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card>
                <v-card-subtitle
                  ><div>{{ location.address }}</div>
                  <div>{{ location.hours }}</div></v-card-subtitle
                >
                <v-card-text>
                  <div>Description: {{ location.description }}</div>
                  <br />
                  <div>Closest to the entrance is the first bin</div>
                  <div class="text-subtitle-2">Recycle Bins:</div>
                  <div v-for="(number, x) in location.recycleBins" :key="x">
                    <v-list-item three-line>
                      <v-list-item-content>
                        <v-list-item-title class="text-body-2"
                          >Bin Number: {{ x }}</v-list-item-title
                        >
                        <v-list-item-subtitle>
                          Status: {{ number.status }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle
                          v-if="number.reported === null"
                        ></v-list-item-subtitle>
                        <v-list-item-subtitle v-else>
                          Last Reported At:
                          {{
                            number.reported.toDate().toLocaleDateString([], {
                              month: "numeric",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </div>
                  <br />
                  <div>Closest to the entrance is the first bin</div>
                  <div class="text-subtitle-2">Glass Bins:</div>
                  <div v-for="(bin, x) in location.glassBins" :key="x">
                    <v-list-item three-line>
                      <v-list-item-content>
                        <v-list-item-title class="text-body-2"
                          >Bin Number: {{ parseInt(x) / 10 }}</v-list-item-title
                        >
                        <v-list-item-subtitle>
                          Status: {{ bin.status }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle
                          v-if="bin.reported === null"
                        ></v-list-item-subtitle>
                        <v-list-item-subtitle v-else>
                          Last Reported At:
                          {{
                            bin.reported.toDate().toLocaleDateString([], {
                              month: "numeric",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <CardFooterFull v-bind:location="location" />
                </v-card-actions>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { db } from "../firebase/db";
import { collection, onSnapshot } from "firebase/firestore";
import CardFooterFull from "./CardFooterFull.vue";
import Hefty from "./Hefty.vue";

export default {
  components: {
    CardFooterFull,
    Hefty,
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

<style scoped>
#recycle-exp-panel:hover {
  background-color: #e8f5e9;
}

#child-panel {
    max-width: 100% !important;
}

@media screen and (min-width: 600px) {
  .v-expansion-panel {
    max-width: 66.66%;
  }
}
</style>
