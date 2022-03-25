<template>
  <v-dialog transition="dialog-bottom-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <div v-if="location.type === 'glass'">
        <v-btn text color="purple" v-bind="attrs" v-on="on"
          >Update Status</v-btn
        >
      </div>
      <div v-else>
        <v-btn text color="orange" v-bind="attrs" v-on="on"
          >Update Status</v-btn
        >
      </div>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <div v-if="location.type === 'glass'">
          <v-toolbar color="purple" dark>Update Location Status</v-toolbar>
        </div>
        <div v-else>
          <v-toolbar color="orange" dark>Update Location Status</v-toolbar>
        </div>
        <v-card-text>
          <div class="text-h5 px-12 pt-8 text-center">
            Please mark the current status of the site
          </div>
        </v-card-text>
        <div v-if="location.type === 'glass'">
          <v-divider class="purple"></v-divider>
        </div>
        <div v-else>
          <v-divider class="orange"></v-divider>
        </div>
        <v-card-actions class="justify-center">
          <v-btn
            raised
            color="green"
            @click="submit('Empty'), (dialog.value = false)"
            >{{ status[0] }}</v-btn
          >
          <v-btn
            color="light-green"
            @click="submit('25% Full'), (dialog.value = false)"
            >{{ status[1] }}</v-btn
          >
          <v-btn
            color="yellow"
            @click="submit('50% Full'), (dialog.value = false)"
            >{{ status[2] }}</v-btn
          >
          <v-btn
            color="orange"
            @click="submit('75% Full'), (dialog.value = false)"
            >{{ status[3] }}</v-btn
          >
          <v-btn color="red" @click="submit('Full'), (dialog.value = false)">{{
            status[4]
          }}</v-btn>
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
    };
  },
  props: {
    location: { type: Object },
  },
  created() {
    console.log(this.location.type);
  },
  methods: {
    submit: function (status) {
      var dbType = "";
      if (this.location.type === "styro") {
        dbType = "styroSites";
      }
      if (this.location.type === "glass") {
        dbType = "glassSites";
      }
      const docRef = doc(db, dbType, this.location.id);
      updateDoc(docRef, {
        status: status,
        reported: serverTimestamp(),
      }).then(() => {
        console.log("worked");
      });
    },
  },
};
</script>

<style>
.v-divider {
  margin-left: auto;
  margin-right: auto;
  width: 75%;
  border-width: 2px 0 0 0;
}

@media screen and (max-width: 599px) {
  .v-dialog {
    margin: 0;
  }
}
</style>
