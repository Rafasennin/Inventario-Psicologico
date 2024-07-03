<template>
  <v-container class="bg-black">
    <ArticleComponent />

    <!-- Seção de Sobre -->
    <v-row class="text-center mt-5">
      <v-col cols="12">
        <h2>Background</h2>
      </v-col>
    </v-row>

    <!-- Background -->
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="4" v-for="(item, index) in background" :key="index">
        <v-card>
          <v-card-title class="d-flex justify-center text-body-1 font-weight-black">{{ item.title }}</v-card-title>
          <v-card-text class="d-flex justify-center">{{ item.details }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-divider :thickness="1" class="border-opacity-50 mb-5 mt-5" color="white"></v-divider>

    <!-- Skills -->
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <h2>Skills</h2>
      </v-col>
      <v-col cols="12" md="4" v-for="(technology, index) in technologies" :key="index">
        <v-card>
          <v-card-title>{{ technology }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      background: [
        {
          title: 'Analise e Desenvolvimento de Sistemas',
          details: 'Graduação pela Universidade São Francisco',
        },
        {
          title: 'Bacharel em Farmácia',
          details: 'Graduação pela Universidade São Francisco',
        }
      ],

      technologies: [
        'Node.js',
        'Express.js',
        'Vue.js',
        'Socket.IO',
        'MySQL',
        'MongoDB',
        'TDD',
        'Javascript Avançado',
        'Vue Router',
        'Vuex',
        'Vuetify',
        'Express',
        'Nuxt 3'
      ]
    };
  },
};
</script>
