<!-- <template> 
  <v-dialog
    v-model="show"
    transition="dialog-bottom-transition"
    max-width="600"
  >
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
          <p class="primary white--text">Recycle Container</p>
          <v-btn-toggle
            v-for="(number, x) in location.recycleBins"
            :key="x"
            v-model="toggle_recycle_none"
          >
            <v-btn
              id="recycle-btn"
              class="pa-0 mx-1"
              color="primary"
              @click="recycleToggle(x)"
              :value="x"
            >
              {{ x }}
            </v-btn>
          </v-btn-toggle>
        </div>
        <div class="text-center pb-5">
          <p class="purple white--text">Glass Container</p>
          <v-btn-toggle
            v-for="(bin, y) in location.glassBins"
            :key="y"
            v-model="toggle_glass_none"
          >
            <v-btn
              id="glass-btn"
              class="pa-0 mx-1 purple white--text"
              @click="recycleToggle(y)"
              :value="y"
            >
              {{ parseInt(y) / 10 }}
            </v-btn>
          </v-btn-toggle>
        </div>
        <v-divider class="green"></v-divider>
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
</template> -->
<template>
  <v-row>
    <div>
      <v-btn text color="primary" @click.stop="dialog = true" class="mb-3 ml-3"
        >Update Status</v-btn
      >
    </div>

    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      max-width="600"
    >
      <v-card>
        <div>
          <v-toolbar color="primary" dark>Update Location Status</v-toolbar>
        </div>
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
        <v-expand-transition>
          <v-alert
            v-show="alertSelection"
            transition="expand-transition"
            border="bottom"
            class="mt-8 mb-0 text-center secondary"
            dense
            elevation="10"
            icon="mdi-alert"
            type="warning"
            dismissible
            >Please make a select the bin you would like to update.</v-alert
          >
        </v-expand-transition>
        <v-card-text>
          <div class="text-h6 px-12 pt-8 text-center">
            Please mark the current status of the site
          </div>
        </v-card-text>
        <div class="text-center pb-5">
          <p class="primary white--text">Recycle Container</p>
          <v-btn-toggle
            v-for="(number, x) in location.recycleBins"
            :key="x"
            v-model="toggle_recycle_none"
          >
            <v-btn
              id="recycle-btn"
              class="pa-0 mx-1"
              color="primary"
              @click="recycleToggle(x)"
              :value="x"
            >
              {{ x }}
            </v-btn>
          </v-btn-toggle>
        </div>
        <div class="text-center pb-5">
          <p class="purple white--text">Glass Container</p>
          <v-btn-toggle
            v-for="(bin, y) in location.glassBins"
            :key="y"
            v-model="toggle_glass_none"
          >
            <v-btn
              id="glass-btn"
              class="pa-0 mx-1 purple white--text"
              @click="recycleToggle(y)"
              :value="y"
            >
              {{ parseInt(y) / 10 }}
            </v-btn>
          </v-btn-toggle>
        </div>
        <div>
          <v-divider class="green"></v-divider>
        </div>
        <v-card-actions class="justify-center">
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
      alertSelection: false,
      transExp: false,
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
  watch: {
    dialog: function (newValue) {
      if (!newValue) {
        this.toggle_recycle_none = null;
        this.toggle_glass_none = null;
        this.transExp = false;
        this.alertSelection = false;
        this.alert = false;
      }
    },
  },
  methods: {
    recycleToggle: function (val) {
      if (parseInt(val) < 10) {
        this.toggle_recycle_none = val;
        this.toggle_glass_none = null;
      } else {
        this.toggle_recycle_none = null;
        this.toggle_glass_none = val;
      }
    },
    submit: function (status) {
      const currentTime = Date.now();

      if (this.toggle_recycle_none == null && this.toggle_glass_none == null) {
        console.log("MAKE SELECTION");
        this.transExp = true;
        this.alertSelection = true;
        setTimeout(() => {
          this.alertSelection = false;
          this.transExp = false;
        }, 10000);
      } else {
        if (this.toggle_recycle_none != null) {
          const reportedTime =
            this.location.recycleBins[
              this.toggle_recycle_none
            ].reported.toMillis();
          if (currentTime - reportedTime > 900000) {
            console.log("recycle toggle: ", this.toggle_recycle_none);
            console.log("glass toggle: ", this.toggle_glass_none);
            const docRef = doc(db, "fullSites", this.location.id);
            console.log("this works: ", this.location);
            updateDoc(docRef, {
              ["recycleBins." + this.toggle_recycle_none + ".status"]: status,
              ["recycleBins." + this.toggle_recycle_none + ".reported"]:
                serverTimestamp(),
            }).then(() => {
              console.log(status);
            });
            this.dialog = false;
          } else {
            this.alert = true;
            setTimeout(() => {
              this.alert = false;
            }, 10000);
          }
        }

        if (this.toggle_glass_none != null) {
          const reportedTime =
            this.location.glassBins[this.toggle_glass_none].reported.toMillis();
          if (currentTime - reportedTime > 900000) {
            console.log(this.toggle_glass_none);
            const docRef = doc(db, "fullSites", this.location.id);
            console.log("this works: ", this.location);
            updateDoc(docRef, {
              ["glassBins." + this.toggle_glass_none + ".status"]: status,
              ["glassBins." + this.toggle_glass_none + ".reported"]:
                serverTimestamp(),
            }).then(() => {
              console.log(status);
            });
            this.dialog = false;
          } else {
            this.transExp = true;
            this.alert = true;

            setTimeout(() => {
              this.alert = false;
              this.transExp = false;
            }, 10000);
          }
        }
      }
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
.v-btn-toggle > .v-btn.v-btn--active {
  background-color: #0d6efd !important;
  color: white !important;
  opacity: 0.75;
}
.v-icon{
 margin-bottom: 16px;
}

.v-alert {
/*   margin-left: auto;
  margin-right: auto; */
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
