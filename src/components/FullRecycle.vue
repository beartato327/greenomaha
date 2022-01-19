<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-h5 green--text"
      >Full Service Recycling<v-icon color="green"
        >mdi-recycle</v-icon
      ></v-expansion-panel-header
    >
    <v-expansion-panel-content>
      <v-card v-for="location in locations" :key="location.site">
        <v-card-title class="text-h5 green--text">
          {{ location.site }}
        </v-card-title>
        <v-card-subtitle
          ><div>{{ location.address }}</div>
          <div>{{ location.hours }}</div></v-card-subtitle
        >
        <v-card-text>
          <div>{{ location.description }}</div>
          <div>Status:{{ location.status }}</div>
          <div>Last reported:{{ location.reported }}</div>
        </v-card-text>
        <v-card-actions>
          <v-dialog transition="dialog-bottom-transition" max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-btn text color="green" v-bind="attrs" v-on="on"
                >Update Status</v-btn
              >
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <v-toolbar color="green" dark
                  >Update Location Status</v-toolbar
                >
                <v-card-text>
                  <div class="text-h2 pa-12">Hello world!</div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn text color="green" @click="dialog.value = false"
                    >Close</v-btn
                  >
                  <v-btn text color="green" @click="submit">Submit</v-btn>
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
export default {
  data() {
    return {
      locations: [
        {
          site: "West Drop-off Site",
          address: "20801 Elkhorn Drive",
          hours: "Open Daily: 7AM – 7PM",
          description:
            "This site is located in a parking lot near a football field",
          status: "TODO",
          reported: "TODO",
        },

        {
          site: "Northwest Drop-off Site",
          address: "3615 North 120th Street",
          hours: "Open Daily: 7AM – 7PM",
          description:
            "This site is located south of Mulhall's in a parking lot",
          status: "TODO",
          reported: "TODO",
        },
        {
          site: "Northeast Drop-off Site",
          address: "North 17th and Burt Streets",
          hours:
            "Open Daily: 7:30AM – 6:00PM – (September – March) or 7:30AM – 8:00PM – (April – August)",
          description:
            "This site is fenced and is on the southwest corn of the intersection",
          status: "TODO",
          reported: "TODO",
        },
        {
          site: "Central Drop-off Site",
          address: "151 North 72nd Street",
          hours: "Open Daily: 7AM – 7PM",
          description:
            "This site is located in the parking lot of West Lanes Bowling",
          status: "TODO",
          reported: "TODO",
        },
        {
          site: "Southeast Drop-off Site",
          address: "6404 South 60th Street",
          hours:
            "Monday through Friday: 8AM – 4:30PM, year ’round. Saturday: 8AM – 4:30PM, Spring, Summer and Fall Saturday: 8AM – NOON, Winter",
          description:
            "This site accepts recyclables free and is a dump location for bulky items and general household waste (there is a fee for all materials except recyclables).",
          status: "TODO",
          reported: "TODO",
        },
        {
          site: "Southwest Drop-off Site",
          address: "10330 I Street",
          hours: "Open Daily: 7AM – 7PM",
          description:
            "This site is located near Firstar, please use the east driveway to Firstar.",
          status: "TODO",
          reported: "TODO",
        },
      ],
    };
  },
  methods: {
    submit: function () {
      console.log("you have clicked me");
    },
  },
};
</script>

<style></style>
