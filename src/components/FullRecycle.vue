<template>
  <v-expansion-panels class="pa-0 mt-1">
    <v-expansion-panel>
      <v-expansion-panel-header
        id="recycle-exp-panel"
        class="text-h5 green--text"
        >Full Service Recycling<v-icon class="pl-2 ma-0" color="green"
          >mdi-recycle</v-icon
        ></v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <Hefty />
        <v-expansion-panels>
          <v-expansion-panel
            id="child-panel"
            v-for="(location, i) in fullSites"
            :key="i"
          >
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
                  <div class="blue--text"><strong><em>Closest to the entrance is the first bin</em></strong></div>
                  <div class="text-subtitle-2 green--text">Recycle Bins:</div>
                  <div v-for="(number, x) in location.recycleBins" :key="x">
                    <v-list-item three-line>
                      <v-list-item-content>
                        <v-list-item-title class="text-body-2"
                          >Bin Number: {{ x }}</v-list-item-title
                        >
                        <v-list-item-subtitle v-if="number.reported === null">
                          Status: Loading...
                        </v-list-item-subtitle>
                        <v-list-item-subtitle v-else>
                          Status:  {{ number.status }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle
                          v-if="number.reported === null"
                        >
                        Last Reported At: Loading...
                        </v-list-item-subtitle>
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
                    <v-card-actions>
                      <CardFooterFullRecycle v-bind:location="[location, x]" />
                    </v-card-actions>
                  <v-divider id="div" class="primary"></v-divider>
                  </div>
                  <br />
                  <div class="blue--text"><strong><em>Closest to the entrance is the first bin</em></strong></div>
                  <div class="text-subtitle-2 purple--text">Glass Bins:</div>
                  <div v-for="(bin, x) in location.glassBins" :key="x">
                    <v-list-item three-line>
                      <v-list-item-content>
                        <v-list-item-title class="text-body-2"
                          >Bin Number:
                          {{ parseInt(x) / 100 }}</v-list-item-title
                        >
                        <v-list-item-subtitle  v-if="bin.reported === null">
                          Status: Loading...
                        </v-list-item-subtitle>
                        <v-list-item-subtitle v-else>
                          Status: {{ bin.status }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle
                          v-if="bin.reported === null"
                        >
                        Last Reported At: Loading...
                        </v-list-item-subtitle>
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
                    <v-card-actions>
                      <CardFooterFullGlass v-bind:location="[location, x]" />
                    </v-card-actions>
                    <v-divider float-left id="div" class="purple"></v-divider>
                  </div>
                </v-card-text>
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
import CardFooterFullRecycle from "./CardFooterFullRecycle.vue";
import CardFooterFullGlass from "./CardFooterFullGlass.vue";
import Hefty from "./Hefty.vue";

export default {
  components: {
    CardFooterFullRecycle,
    CardFooterFullGlass,
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
#div{
  width: 75%;
  margin-left: 0;
}

#recycle-exp-panel:hover {
  background-color: #e8f5e9;
}

#child-panel {
  max-width: 100% !important;
}

@media screen and (min-width: 960px) {
  #div{
  width: 50%;
  margin-left: 0;
}

  .v-expansion-panel {
    max-width: 66.66%;
  }
}
</style>
