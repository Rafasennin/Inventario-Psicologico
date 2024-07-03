<template>
  <footer class="bg-grey-lighten-2 text-center d-flex flex-column">
    <div>
      <v-btn color="blue-darken-2" v-for="icon in icons" :key="icon" :icon="icon.icoo" :href="icon.src" size="large" variant="plain"
        target="_blank"></v-btn>
    </div>

    <v-divider></v-divider>

    <div>
      {{ new Date().getFullYear() }} — <strong > Rafael Santos &copy;</strong>
    </div>
  </footer>
</template>

<script>
export default {
  data: () => ({

    icons: [
      { icoo: 'mdi-github', src: 'https://github.com/Rafasennin' },
      { icoo: 'mdi-linkedin', src: 'https://www.linkedin.com/in/rafael-d-santos-24a1098b' },
      { icoo: 'mdi-instagram', src: 'https://www.instagram.com/rafasennin7/' },
      { icoo: 'mdi-youtube', src: 'https://youtube.com/channel/UC7cYXH0h-RylVwe6y9JIUIQ' },
    ],


    links: [

    ]
  }),
}
</script>