<template>
  <v-row justify="center">
    <v-expansion-panels accordion>
      <GlassRecycle />
      <FullRecycle />
    </v-expansion-panels>
  </v-row>
</template>

<script>
import GlassRecycle from "./GlassRecycle";
import FullRecycle from "./FullRecycle";
export default {
  components: {
    GlassRecycle,
    FullRecycle
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
