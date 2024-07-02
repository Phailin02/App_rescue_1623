<template>
  <v-card> ahehe</v-card>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' },
      ],
      mini: false,
    }
  },
}
</script>
