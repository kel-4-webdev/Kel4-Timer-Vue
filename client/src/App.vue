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
          <v-btn color="success" elevation="2" v-on:click="isHidden = false">Add</v-btn>
          <v-btn color="error" elevation="2" v-on:click="isHidden = true">Remove</v-btn>
        </v-card>
      </div>
      <Timer v-if="!isHidden"
        :timer="formattedTime1"
        :state="timerState1"
        @start="start1"
        @pause="pause1"
        @stop="stop1"
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

    <v-snackbar
      v-model="snackbar1"
      color="info"
      :timeout="2000"
    >
      New History {{ this.latestHistory1 }}
      <v-btn dark flat @click="snackbar1 = false">Close</v-btn>
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
  mounted() {
    window.addEventListener('beforeunload', () => {

      localStorage.setItem('Closed-Time', new Date().getTime());
      localStorage.setItem('Time', this.currentTimer);
      localStorage.setItem('Status', this.timerState);
    }),
    window.addEventListener('load', () => {
      this.timerState = localStorage.getItem('Status')
      if(this.timerState == 'running') {
        let totalTime = parseInt(Math.round(new Date().getTime()/1000)) - parseInt(Math.round(localStorage.getItem('Closed-Time')/1000))
        this.currentTimer = parseInt(localStorage.getItem('Time')) + totalTime
        this.tick();
      } else {
        this.currentTimer = parseInt(localStorage.getItem('Time'))
      }
      this.formattedTime = this.formatTime(this.currentTimer)
    })
  },
  data () {
    return {
      timerState: 'stopped',
      timerState1: 'stopped',
      currentTimer: 0,
      currentTimer1: 0,
      formattedTime: "00:00:00",
      formattedTime1: "00:00:00",
      ticker: undefined,
      ticker1: undefined,
      history: [],
      history1: [],
      latestHistory: "",
      latestHistory1: "",
      snackbar: false,
      snackbar1: false,
      isHidden : true,
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
      window.clearInterval(this.ticker);
      this.currentTimer = 0;
      this.formattedTime = "00:00:00";
      this.timerState = "stopped";
      localStorage.clear()
    },
    tick () {
      this.ticker = setInterval(() => {
        this.currentTimer++;
        this.formattedTime = this.formatTime(this.currentTimer);
      }, 1000)
    },
    formatTime (seconds) {
      let measuredTime = new Date(null);
      measuredTime.setSeconds(seconds);
      let MHSTime = measuredTime.toISOString().substr(11, 8);
      return MHSTime;
    },
    timeToSecond(varDate) {
      let oldTime = Math.round(varDate.getTime() / 1000);
      return oldTime;
    },
    start1 () {
      if (this.timerState1 !== 'running') {
        this.tick1();
        this.timerState1 = 'running';
      }
    },
    pause1 () {
      window.clearInterval(this.ticker1);
      this.timerState1 = 'paused';
    },
    stop1 () {
      this.snackbar1 = true;
      this.history1.push({
        seconds: this.currentTimer1,
        formattedTime1: this.formatTime1(this.currentTimer1)
      });
      this.latestHistory1 = this.formatTime1(this.currentTimer1);
      window.clearInterval(this.ticker1)
      this.currentTimer1 = 0;
      this.formattedTime1 = "00:00:00";
      this.timerState1 = "stopped";
    },
    tick1 () {
      this.ticker1 = setInterval(() => {
        this.currentTimer1++;
        this.formattedTime1 = this.formatTime1(this.currentTimer1);
      }, 1000)
    },
    formatTime1 (seconds) {
      let measuredTime1 = new Date(null);
      measuredTime1.setSeconds(seconds);
      let MHSTime1 = measuredTime1.toISOString().substr(11, 8);
      return MHSTime1;
    }
  }
}
</script>
