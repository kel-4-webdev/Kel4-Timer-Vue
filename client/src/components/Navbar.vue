<template>
	<nav>
		<v-toolbar app dark class="secondary">
      <v-toolbar-side-icon @click="isDrawerOpen = !isDrawerOpen" />
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-black primary--text">Kelompok 4 Web Developer </span>
        <span class="font-weight-light">Timer</span>
      </v-toolbar-title>
		</v-toolbar>

    <v-navigation-drawer app dark v-model="isDrawerOpen">
      <v-toolbar class="secondary">
        <v-toolbar-title class="title">History</v-toolbar-title>
      </v-toolbar>
      <v-list>
        <v-list-tile v-for="(lap, index) in history" :key="index">
          History Timer 1: {{ lap.formattedTime }}
        </v-list-tile>

        <v-list-tile v-for="(lap, index) in history1" :key="index">
          History Timer 2: {{ lap.formattedTime1 }}
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
	</nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: ['history', 'history1'],
  data () {
    return {
      isDrawerOpen: false
    }
  }
}
</script>

