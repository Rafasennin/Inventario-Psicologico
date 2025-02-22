<template>
  <v-container class="bg-black py-5 h-100">
    <!-- Banner Explicativo -->
    <v-row class="d-flex justify-center my-16 body-row" v-if="!isLoggedStatus">
      <v-col cols="12" class="text-center">
        <div ref="banner">
          <h1 class="display-1 font-weight-bold text-red mb-4">Invetário Psicológico</h1>
          <v-parallax height="400" src="../assets/matrix_1.jpg">
            <div class="d-flex justify-center">
              <v-avatar class="ma-10 opacity-80" size="300">
                <img src="../assets/reflexao.jpg" width="300">
              </v-avatar>
            </div>
          </v-parallax>
          <p class="text-h5 text-red-lighten-1 my-4">Bem-vindo ao inventário psicológico, uma ferramenta poderosa que
            fornece insights valiosos sobre a mente humana e auxilia no desenvolvimento pessoal através do
            autoconhecimento, rumo ao despertar da consciência.</p>
          <v-alert type="info" class="mt-16" color="blue-darken-2" icon="$info" >
            <p class="text-h5">
              Para começar, faça login se já estiver cadastrado ou cadastre-se para acessar sua lista de tarefas.
            </p>
          </v-alert>
        </div>
      </v-col>
    </v-row>

    <!-- Validação de Login -->
    <v-row v-if="isLoggedStatus" class="d-flex justify-center mt-16">
      <v-col cols="12" class="text-center">
        <div ref="loggedStatus">
          <h2 class="headline text-vivid">Logado como {{ getUserName }}</h2>
          <LoginComponent />
        </div>
      </v-col>
    </v-row>
    <v-row v-if="isLoggedStatus" class="d-flex justify-center mt-4">
      <v-col cols="12" class="text-center">
        <div ref="card">
          <Card />
        </div>
      </v-col>
    </v-row>

    <!-- Mensagem para Usuário Não Logado -->
    <v-row v-else class="d-flex justify-center mt-4">
      <v-col cols="12" class="text-center">
        <div ref="loginComponent">
          <LoginComponent />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { gsap } from "gsap";
import store from '~/store/index'; // Substitua pelo seu store Vuex ou Pinia

// Verifica se o usuário está logado
const getUserName = computed(() => {
  return store.state.isUserName;
});

// Verifica se o usuário está logado
const isLoggedStatus = computed(() => {
  return store.state.isLogged;
});

// Refs para os elementos
const banner = ref(null);
const loggedStatus = ref(null);
const card = ref(null);
const loginComponent = ref(null);

// Animações GSAP
onMounted(() => {
  gsap.from(banner.value, {
    duration: 1,
    opacity: 0,
    y: -50,
    ease: "power3.out"
  });
  if (isLoggedStatus.value) {
    gsap.from(loggedStatus.value, {
      duration: 1,
      opacity: 0,
      y: 50,
      delay: 0.5,
      ease: "power3.out"
    });
    gsap.from(card.value, {
      duration: 1,
      opacity: 0,
      x: -50,
      delay: 1,
      ease: "power3.out"
    });
  } else {
    gsap.from(loginComponent.value, {
      duration: 1,
      opacity: 0,
      y: 50,
      delay: 0.5,
      ease: "power3.out"
    });
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

.display-1 {
  font-size: 3rem;
  font-family: 'Lobster', cursive;
}
</style>