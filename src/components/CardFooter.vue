<!-- <template>
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
</template> -->
<template>
  <v-row>
    <div v-if="location.type === 'glass'">
      <v-btn text color="purple" @click.stop="dialog = true" class="mb-3 ml-3 "
        >Update Status</v-btn
      >
    </div>
    <div v-else>
      <v-btn text color="orange" @click.stop="dialog = true" class="mb-2 ml-2"
        >Update Status</v-btn
      >
    </div>

    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      max-width="600"
    >
      <v-card>
        <div v-if="location.type === 'glass'">
          <v-toolbar color="purple" dark>Update Location Status</v-toolbar>
        </div>
        <div v-else>
          <v-toolbar color="orange" dark>Update Location Status</v-toolbar>
        </div>
        <v-expand-transition>
        <v-alert v-show="alert"
          transition="expand-transition"
          border="bottom"
          class="mt-8 mb-0 text-center secondary"
          dense
          elevation="10"
          icon="mdi-help-circle"
          type="info"
          >Thank you for your update. To prevent spamming we do not
          allow updates within 15 minutes of the previous report. If you
          received this message in error please contact us, thank you.</v-alert
        >
        </v-expand-transition>
        <v-card-text>
          <div class="text-h6 px-12 pt-8 text-center">
            Please mark the current status of the site
          </div>
        </v-card-text>
        <div v-if="location.type === 'glass'">
          <v-divider class="purple"></v-divider>
        </div>
        <div v-else>
          <v-divider class="orange"></v-divider>
        </div>
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
    location: { type: Object },
  },
  methods: {
    submit: function (status) {
      const currentTime = Date.now();
      const reportedTime = this.location.reported.toMillis();

      if (currentTime - reportedTime > 900000) {
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
        });
        this.dialog = false;
      } else {
        this.alert = true;
        setTimeout(() =>{
          this.alert = false;
        }, 10000)
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
