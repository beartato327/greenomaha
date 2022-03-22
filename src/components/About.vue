<template>
  <v-dialog v-model="dialog" hide-overlay transition="dialog-top-transition" max-width="600px" :fullscreen="$vuetify.breakpoint.xsOnly">
    <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title class="flex text-center">About Green Omaha</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="text-subtitle-1 pt-5">
            Green Omaha is a community drive application to allow people to report
            the status of recycling sites around the Greater Omaha Area. Together we
            can reduce overfilled dumpsters littering our beautiful city and help each
            other save time and gas from driving around hoping the site is not full.
            <br /><br />
            Please leave comments and submit feedback for future feature requests or if 
            there are any issues with the application.
            <br /><br />
            Next feature update:
            <ul>
                <li>Automated emails to the city when bins are reported 75% or higer</li>
                <li>Provide accessbility features to the site</li>
            </ul>
        </v-card-text>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
    props:{
        value: Boolean,
    },
    computed:{
        dialog:{
            get(){
                return this.value
            },
            set(value){
                this.$emit('input', value)
            }
        }
    }
};
</script>

<style></style>
