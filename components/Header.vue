<template>
  <v-app class="h-0">
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list nav dense>
        <nuxt-link to="/" exact>
          <v-list-item prepend-icon="mdi-clipboard-list-outline" title="Lista"></v-list-item>
        </nuxt-link>
        <nuxt-link to="/Contact">
          <v-list-item prepend-icon="mdi-email" title="Contato"></v-list-item>
        </nuxt-link>
        <nuxt-link to="/About">
          <v-list-item prepend-icon="mdi-book-open-blank-variant" title="Sobre"></v-list-item>
        </nuxt-link>
      </v-list>
      <v-divider :thickness="1" class="border-opacity-50" color="black"></v-divider>
      <LoginComponent />
      <div class="bg-black d-flex align-center">
        <v-btn v-for="icon in icons" :key="icon.icoo" :icon="icon.icoo" :href="icon.src" size="small" variant="plain"
          target="_blank" class="ml-5"></v-btn>
      </div>
      <h3 class="d-flex justify-center">Rafael Santos &copy;</h3>
    </v-navigation-drawer>

    <v-app-bar color="grey-lighten-2" prominent>
      <!--Menu para telas pequenas-->
      <v-row class="d-flex justify-space-between ml-16">
        <v-btn icon @click.stop="drawer = !drawer">
          <v-icon color="blue-darken-2" size="large">mdi-menu</v-icon>
          <span class="text-blue-darken-2">Menu</span>
        </v-btn>

        <nuxt-link to="/" exact class="hidden-sm-and-down">
          <v-btn icon>
            <v-icon color="blue-darken-2" size="large">mdi-clipboard-list-outline</v-icon>
            <span>Lista</span>
          </v-btn>
        </nuxt-link>

        <nuxt-link to="/Contact" class="hidden-sm-and-down">
          <v-btn icon>
            <v-icon color="blue-darken-2" size="large">mdi-account-box</v-icon>
            <span>Contato</span>
          </v-btn>
        </nuxt-link>

        <nuxt-link to="/About" class="hidden-sm-and-down mr-16">
          <v-btn icon>
            <v-icon color="blue-darken-2" size="large">mdi-book-open-blank-variant</v-icon>
            <span>Sobre</span>
          </v-btn>
        </nuxt-link>
      </v-row>
    </v-app-bar>
  </v-app>
</template>

<script>
import { START_LOCATION } from 'vue-router';

export default {
  data() {
    return {
      drawer: false,
      icons: [
        { icoo: 'mdi-github', src: 'https://github.com/Rafasennin' },
        { icoo: 'mdi-linkedin', src: 'https://www.linkedin.com/in/rafael-d-santos-24a1098b' },
        { icoo: 'mdi-instagram', src: 'https://www.instagram.com/rafasennin7/' },
        { icoo: 'mdi-youtube', src: 'https://youtube.com/channel/UC7cYXH0h-RylVwe6y9JIUIQ' },
      ],
    };
  }
};
</script>

<style scoped>
.v-app {}
</style>
