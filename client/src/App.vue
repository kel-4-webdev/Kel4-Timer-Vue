<template>
  <v-app>
    <Navbar :history="history" />

    <v-content>
      <Timer
        :timer="formattedTime"
        :state="timerState"
        @start="start"
        @pause="pause"
        @stop="stop"
      />

      <div style="width: 100%">
        <v-card
          class="justify-center mb-6"
          :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
          flat
          tile
        >
          <v-btn color="success" elevation="2">Add</v-btn>
          <v-btn color="error" elevation="2">Remove</v-btn>
        </v-card>
      </div>

      <Timer
        :timer="formattedTime"
        :state="timerState"
        @start="start"
        @pause="pause"
        @stop="stop"
      />
    </v-content>

    <v-snackbar
      v-model="snackbar"
      color="info"
      :timeout="2000"
    >
      New History {{ this.latestHistory }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar';
import Timer from '@/components/Timer';

export default {
  name: 'App',
  components: {
    Navbar,
    Timer
  },
  data () {
    return {
      timerState: 'stopped',
      currentTimer: 0,
      formattedTime: "00:00:00",
      ticker: undefined,
      history: [],
      latestHistory: "",
      snackbar: false,
    }
  },
  methods: {
    start () {
      if (this.timerState !== 'running') {
        this.tick();
        this.timerState = 'running';
      }
    },
    pause () {
      window.clearInterval(this.ticker);
      this.timerState = 'paused';
    },
    stop () {
      this.snackbar = true;
      this.history.push({
        seconds: this.currentTimer,
        formattedTime: this.formatTime(this.currentTimer)
      });
      this.latestHistory = this.formatTime(this.currentTimer);
      window.clearInterval(this.ticker)
      this.currentTimer = 0;
      this.formattedTime = "00:00:00";
      this.timerState = "stopped";
    },
    tick () {
      this.ticker = setInterval(() => {
        this.currentTimer++;
        this.formattedTime = this.formatTime(this.currentTimer);
      }, 250)
    },
    formatTime (seconds) {
      let measuredTime = new Date(null);
      measuredTime.setSeconds(seconds);
      let MHSTime = measuredTime.toISOString().substr(11, 8);
      return MHSTime;
    }
  }
}
</script>
