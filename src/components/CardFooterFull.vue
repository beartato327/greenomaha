<template>
  <v-dialog transition="dialog-bottom-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <div v-if="location.type === 'glass'">
        <v-btn text color="purple" v-bind="attrs" v-on="on"
          >Update Status</v-btn
        >
      </div>
      <div v-else-if="location.type === 'styro'">
        <v-btn text color="orange" v-bind="attrs" v-on="on"
          >Update Status</v-btn
        >
      </div>
      <div v-else>
        <v-btn text color="green" v-bind="attrs" v-on="on">Update Status</v-btn>
      </div>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <div v-if="location.type === 'glass'">
          <v-toolbar color="purple" dark>Update Location Status</v-toolbar>
        </div>
        <div v-if="location.type === 'styro'">
          <v-toolbar color="orange" dark>Update Location Status</v-toolbar>
        </div>
        <div v-else>
          <v-toolbar color="green" dark>Update Location Status</v-toolbar>
        </div>
        <v-card-text>
          <div class="text-h5 px-12 pt-8 text-center">
            Please mark the current status of the site
          </div>
        </v-card-text>
        <div class="text-center pb-5">
          <p>Recycle Container</p>
          <v-btn-toggle
            v-for="(number, x) in location.recycleBins"
            :key="x"
            v-model="toggle_recycle_none"
          >
            <v-btn @click="recycleToggle(x)" :value="x"> {{ x }} </v-btn>
          </v-btn-toggle>
        </div>
        <div class="text-center pb-5">
          <p>Glass Container</p>
          <v-btn-toggle
            v-for="(bin, y) in location.glassBins"
            :key="y"
            v-model="toggle_glass_none"
          >
            <v-btn @click="recycleToggle(y)" :value="y"> {{ parseInt(y) / 10 }} </v-btn>
          </v-btn-toggle>
        </div>
        <v-card-actions class="justify-center pb-4">
          <v-btn
            raised
            color="green"
            @click="submit('Empty'), (dialog.value = false)"
            >{{ status[0] }}</v-btn
          >
          <v-btn
            raised
            color="light-green"
            @click="submit('25% Full'), (dialog.value = false)"
            >{{ status[1] }}</v-btn
          >
          <v-btn
            raised
            color="yellow"
            @click="submit('50% Full'), (dialog.value = false)"
            >{{ status[2] }}</v-btn
          >
          <v-btn
            raised
            color="orange"
            @click="submit('75% Full'), (dialog.value = false)"
            >{{ status[3] }}</v-btn
          >
          <v-btn
            raised
            color="red"
            @click="submit('Full'), (dialog.value = false)"
            >{{ status[4] }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { db } from "../firebase/db";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";

export default {
  data() {
    return {
      status: ["Empty", "25%", "50%", "75%", "Full"],
      toggle_recycle_none: null,
      toggle_glass_none: null,
    };
  },
  props: {
    location: { type: Object },
  },
  created() {
    console.log(this.location);
  },
  methods: {
    recycleToggle: function(val){
      if(parseInt(val) < 10){
        this.toggle_recycle_none = val;
        this.toggle_glass_none = null;
      }else{
        this.toggle_recycle_none = null;
      this.toggle_glass_none = val;
      }
    },
    submit: function (status) {
      var dbType = "";
      if (this.location.type === "full") {
        dbType = "fullSites";
      }
      if (this.location.type === "styro") {
        dbType = "styroSites";
      }
      if (this.location.type === "glass") {
        dbType = "glassSites";
      }
      console.log(this.location.recycleBins[this.toggle_recycle_none]);
      console.log(this.location.id);
      if (this.toggle_recycle_none != null) {
        console.log("recycle toggle: ", this.toggle_recycle_none);
        console.log("glass toggle: ", this.toggle_glass_none);
        const docRef = doc(db, dbType, this.location.id);
        console.log("this works: ", this.location);
        updateDoc(docRef, {
          ["recycleBins." + this.toggle_recycle_none + ".status"]: status,
          ["recycleBins." + this.toggle_recycle_none + ".reported"]:
            serverTimestamp(),
        }).then(() => {
          console.log(status);
        });
      }

      if (this.toggle_glass_none != null) {
        console.log(this.location);
        const docRef = doc(db, dbType, this.location.id);
        console.log("this works: ", this.location);
        updateDoc(docRef, {
          ["glassBins." + this.toggle_glass_none + ".status"]: status,
          ["glassBins." + this.toggle_glass_none + ".reported"]:
            serverTimestamp(),
        }).then(() => {
          console.log(status);
        });
      }
    },
  },
};
</script>

<style>
@media screen and (max-width: 599px) {
  .v-dialog{
    margin: 0;
  }
}
</style>
