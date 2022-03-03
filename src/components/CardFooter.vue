<template>
  <v-dialog transition="dialog-bottom-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text color="purple" v-bind="attrs" v-on="on">Update Status</v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="blue" dark>Update Location Status</v-toolbar>
        <v-card-text>
          <div class="text-h5 pa-12">
            Please mark the current status of the site
          </div>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn raised color="green" @click="submit('Empty')"
          >{{status[0]}}</v-btn
          >
          <v-btn color="light-green" @click="submit('25% Full')">{{status[1]}}</v-btn>
          <v-btn color="yellow" @click="submit('50% Full')">{{status[2]}}</v-btn>
          <v-btn color="orange" @click="submit('75% Full')">{{status[3]}}</v-btn>
          <v-btn color="red" @click="submit('Full'), dialog.value=false">{{status[4]}}</v-btn>
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
  methods: {
    submit: function (status) {
      const docRef = doc(db, "glassSites", this.location.id);
      updateDoc(docRef, {
        status: status,
        reported: serverTimestamp(),
      }).then(() => {
        console.log("worked")
      });
    },
  },
};
</script>

<style>
</style>