<template>
  <v-row justify="center">
    <v-expansion-panels accordion>
      <GlassRecycle />
      <FullRecycle />
      <Styrofoam />
    </v-expansion-panels>
  </v-row>
</template>

<script>
import GlassRecycle from "./GlassRecycle";
import FullRecycle from "./FullRecycle";
import Styrofoam from "./Styrofoam.vue"
export default {
  components: {
    GlassRecycle,
    FullRecycle,
    Styrofoam
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style>

.v-expansion-panels {
  margin-top: 20px;
}
.v-card {
  margin-bottom: 10px;
}
.v-icon.v-icon {
  justify-content: left;
}
</style>
