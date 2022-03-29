<template>
  <v-row>
    <v-btn text color="primary" @click.stop="dialog = true" class="mb-3 ml-3"
      >Update Status</v-btn
    >
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      max-width="600"
    >
      <v-card>
        <v-toolbar color="primary" dark>Update Location Status</v-toolbar>

        <v-expand-transition>
          <v-alert
            v-show="alert"
            transition="expand-transition"
            border="bottom"
            class="mt-8 mb-0 text-center secondary"
            dense
            elevation="10"
            icon="mdi-help-circle"
            type="info"
            >Thank you for your update. To prevent spamming we do not allow
            updates within 15 minutes of the previous report. If you received
            this message in error please contact us, thank you.</v-alert
          >
        </v-expand-transition>
        <v-card-text>
          <div class="text-h6 px-12 pt-8 text-center">
            Please mark the current status of the site
          </div>
        </v-card-text>
        <v-divider class="primary"></v-divider>
        <v-card-actions class="justify-center mt-4">
          <v-btn raised color="green" @click="submit('Empty')">{{
            status[0]
          }}</v-btn>
          <v-btn color="light-green" @click="submit('25% Full')">{{
            status[1]
          }}</v-btn>
          <v-btn color="yellow" @click="submit('50% Full')">{{
            status[2]
          }}</v-btn>
          <v-btn color="orange" @click="submit('75% Full')">{{
            status[3]
          }}</v-btn>
          <v-btn color="red" @click="submit('Full')">{{ status[4] }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { db } from "../firebase/db";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";

export default {
  data() {
    return {
      dialog: false,
      alert: false,
      status: ["Empty", "25%", "50%", "75%", "Full"],
    };
  },
  watch:{
    dialog: function(newValue){
      if(!newValue){
        this.alert = false;
      }
    }
  },
  props: {
    location: { type: Array },
  },
  methods: {
    submit: function (status) {
      const currentTime = Date.now();
      console.log(this.location[1]);
      console.log(
        this.location[0].recycleBins[this.location[1]].reported.toMillis()
      );
      const reportedTime =
        this.location[0].recycleBins[this.location[1]].reported.toMillis();
      console.log("Reported time");
      if (currentTime - reportedTime > 900000) {
        const docRef = doc(db, "fullSites", this.location[0].id);
        updateDoc(docRef, {
          ["recycleBins." + this.location[1] + ".status"]: status,
          ["recycleBins." + this.location[1] + ".reported"]: serverTimestamp(),
        });
        this.dialog = false;
      } else {
        this.alert = true;
        setTimeout(() => {
          this.alert = false;
        }, 10000);
      }
    },
  },
};
</script>

<style scoped>
.v-divider {
  margin-left: auto;
  margin-right: auto;
  width: 75%;
  border-width: 2px 0 0 0;
}

.v-icon{
  margin-top: 12px;
}

.v-alert {
  margin-left: auto;
  margin-right: auto;
  max-width: 90%;
  font-size: 12px;
  opacity: .9;
}

@media screen and (max-width: 599px) {
  .v-dialog {
    margin: 0;
  }
}
</style>