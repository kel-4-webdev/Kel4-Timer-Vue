<template>
	<v-container fluid>
    <v-layout>
      <v-flex xs12 pa-3>
        
        <v-card 
          class = "flex-xl-column justify-center mb-50 background-color"
          :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
          flat
          tile
        >

          <v-card-title class="secondary white--text font-weight-light display-2 text-uppercase justify-center">
            {{ timer }}
          </v-card-title>

          <v-container style="display:flex; justify-content:center">
              <v-button
                @click="$emit('start')"
                :disabled="state == 'running'"
                style="cursor:pointer"
              >
                <span class="success white--text font-weight-bold text-uppercase padding">Start</span>
              </v-button>
              <!-- <v-list-tile
                class="info mb-3"
                @click="$emit('lap')"
                :disabled="state == 'stopped' || state == 'paused'"
              >
                <span class="white--text font-weight-bold text-uppercase">Lap</span>
              </v-list-tile> -->
              <v-button
                @click="$emit('pause')"
                :disabled="state == 'stopped' || state == 'paused'"
                style="cursor:pointer"
              >
                <span class="warning  white--text font-weight-bold text-uppercase padding">Pause</span>
              </v-button>

              <v-button
                @click="$emit('stop')"
                :disabled="state == 'stopped'"
                style="cursor:pointer"
              >
                <span class="error white--text font-weight-bold text-uppercase padding">Stop</span>
              </v-button>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Timer',
  props: ['timer', 'state']
}

</script>

<style>
  @import '../style/style.css';
</style>