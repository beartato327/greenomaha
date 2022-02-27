<template>
  <v-expansion-panel>
        <v-expansion-panel-header id="glass-exp-panel" class="text-h5 purple--text"
          >Glass Recycling<v-icon color="purple"
            >mdi-bottle-soda</v-icon
          ></v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-card v-for="location in locations" :key="location.site">
            <v-card-title class="text-h5 purple--text">
              {{location.site}}
            </v-card-title>
            <v-card-subtitle
              ><div>{{location.address}}</div>
              <div>{{location.hours}}</div></v-card-subtitle
            >
            <v-card-text>
              <div>{{location.description}}</div>
              <div>Status:{{location.status}}</div>
              <div>Last reported:{{location.reported}}</div>
            </v-card-text>
            <v-card-actions>
              <v-dialog transition="dialog-bottom-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text color="purple" v-bind="attrs" v-on="on"
                    >Update Status</v-btn
                  >
                </template>
                <template v-slot:default="dialog">
                  <v-card>
                    <v-toolbar color="purple" dark
                      >Update Location Status</v-toolbar
                    >
                    <v-card-text>
                      <div class="text-h2 pa-12">Hello world!</div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn text color="purple" @click="dialog.value = false">Close</v-btn>
                      <v-btn text color="purple" @click="submit">Submit</v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
</template>

<script>
import {db} from '../firebase/db'
import {collection, doc} from 'firebase/firestore'
export default {
    data(){
        return{
            glassSites:[],
            locations: [
                {"site":"Far West Central", "address":"HyVee 1000 South 178th Street","hours":"Open Daily: 7AM – 7PM","description":"This site is located near 180th and Pacific","status":"TODO","reported":"TODO"},
                {"site":"Westwood Plaza", "address":"12075 West Center Road","hours":"Open Daily: 7AM – 7PM","description":"This site is located behind a Taco Bell and in front of Baker's","status":"TODO","reported":"TODO"},
            ]
        }
    },
methods: {
    submit: function () {
      console.log("you have clicked me");
      const dbOutput = collection(db, 'glassSites')
      const outputList = doc(dbOutput)
      console.log(outputList)
    },
  },
  firestore:{
    glassSites: collection(db, 'glassSites')
    },
}

</script>

<style>

</style>