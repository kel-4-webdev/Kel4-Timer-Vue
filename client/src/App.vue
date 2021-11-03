<template>
  <v-app>
    <Navbar 
      :history="history" 
      :history1="history1"  
    />

    <v-content>
      <Timer
        :timer="formattedTime"
        :state="timerState"
        @start="start"
        @pause="pause"
        @stop="stop"
      />
       <Timer v-if="!isHidden"
        :timer="formattedTime1"
        :state="timerState1"
        @start="start1"
        @pause="pause1"
        @stop="stop1"
      />
      <div style="width: 100%">
        <v-card
        
          class="justify-center mb-6"
          :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'"
          flat
          tile
        >
          <v-container style="display:flex; justify-content:center">
            <v-btn color="success" elevation="2" v-on:click="isHidden = false">ADD TIMER</v-btn>
            <v-btn color="error" elevation="2" v-on:click="isHidden = true">REMOVE TIMER</v-btn>
          </v-container>
        </v-card>
      </div>
     

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
import HistoryDataService from "@/services/HistoryDataService"

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
      localStorage.setItem('Time1', this.currentTimer1);
      localStorage.setItem('Status1', this.timerState1);
      localStorage.setItem('Is_Hidden', this.isHidden);
    }),
    window.addEventListener('load', () => {
      let getClosedTime = localStorage.getItem('Closed-Time');
      let getTime = localStorage.getItem('Time');
      let getStatus = localStorage.getItem('Status');
      let getTime1 = localStorage.getItem('Time1');
      let getStatus1 = localStorage.getItem('Status1');
      let getIsHidden = localStorage.getItem('Is_Hidden');

      if(getClosedTime == null) {getClosedTime = 0}
      if(getTime == null) {getTime = 0}
      if(getStatus == null) {getStatus = 'stopped'}
      if(getTime1 == null) {getTime1 = 0}
      if(getStatus1 == null) {getStatus1 = 'stopped'}
      if(getIsHidden == null) {getIsHidden == 'true'}
      if(getTime == isNaN() && getStatus == 'running') {
        getStatus = 'stopped'
        getTime = 0
      }

      if(getIsHidden == 'false') {
        this.isHidden = false;
      } else {
        this.isHidden = true;
      }
      this.timerState = getStatus;
      if(this.timerState == 'running') {
        let totalTime = parseInt(Math.round(new Date().getTime()/1000)) - parseInt(Math.round(getClosedTime/1000))
        this.currentTimer = parseInt(getTime) + totalTime
        this.tick();
      } else {
        this.currentTimer = parseInt(getTime)
      }
        this.formattedTime = this.formatTime(this.currentTimer)
      
      this.timerState1 = getStatus1
      if(this.timerState1 == 'running') {
        let totalTime1 = parseInt(Math.round(new Date().getTime()/1000)) - parseInt(Math.round(getClosedTime/1000))
        this.currentTimer1 = parseInt(getTime1) + totalTime1
        this.tick1();
      } else {
        this.currentTimer1 = parseInt(getTime1)
      }
        this.formattedTime1 = this.formatTime(this.currentTimer1)
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
      history_timer: {
        timer_id: null,
        first_timer: 0,
        second_timer: 0
      }
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
    saveHistory() {
      var data = {
        first_timer: this.currentTimer,
        second_timer: this.currentTimer1
      };
      HistoryDataService.create(data)
        .then((response) => {
          this.history.timer_id = response.data.timer_id;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    stop () {
      this.snackbar = true;
      this.history.push({
        seconds: this.currentTimer,
        formattedTime: this.formatTime(this.currentTimer)
      });
      this.latestHistory = this.formatTime(this.currentTimer);
      this.saveHistory();
      window.clearInterval(this.ticker);
      this.currentTimer = 0;
      this.formattedTime = "00:00:00";
      this.timerState = "stopped";
      localStorage.clear();
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
      var MHSTime = measuredTime.toISOString().substr(11, 8);
      return MHSTime;
    },
    timeToSecond(varDate) {
      let oldTime = Math.round(varDate.getTime() / 1000);
      return oldTime;
    },
    start1 () {
      if (this.timerState1 !== 'running') {
        this.tick1();
        this.timerState1 = 'running'
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
      this.saveHistory();
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
