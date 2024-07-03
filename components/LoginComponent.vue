<template>
  <v-container class="bg-black">
    <div v-if="adminStatus && loginStatus" class="d-flex justify-center align-center">
      <v-btn class="mb-8" color="blue-darken-2" @click="adminIn" :class="$vuetify.display.mdAndUp ? 'w-50' : 'w-75'" >
        Admin
        <v-icon icon="mdi-arrow-right" end></v-icon>
      </v-btn>
      </div>

      <div v-if="loginStatus" class="d-flex justify-center align-center">
      <v-btn color="red-darken-2" @click="logOut" :class="$vuetify.display.mdAndUp ? 'w-50' : 'w-75'">
        <v-icon icon="mdi-arrow-left" start></v-icon>
        Sair
      </v-btn>
    </div>
    <div v-if="!loginStatus" class="d-flex justify-center mb-5">
      <v-btn color="green-darken-2" @click="singIn" :class="$vuetify.display.mdAndUp ? 'w-50' : 'w-75'">
        Login
        <v-icon icon="mdi-arrow-right" end></v-icon>
      </v-btn>
    </div>

    <div v-if="!loginStatus" class="d-flex justify-center">
      <v-btn color="blue-darken-2" @click="singUp" :class="$vuetify.display.mdAndUp ? 'w-50' : 'w-75'">
        Cadastrar
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import store from '~/store/index';

const router = useRouter();

const loginStatus = computed(() => {
  return store.state.isLogged;
});

const adminStatus = computed(() => {
  return store.state.isAdmin;
});

const singIn = () => {
  router.push('/LoginView');
};

const singUp = () => {
  router.push('/SingUp');
};

const adminIn = () => {
  router.push('/AdminView');
};

const logOut = () => {
  store.commit('SET_LOGGED', false);
  router.push('/');
  window.location.reload();
};
</script>
