import store from '~/store/index';
import { computed } from 'vue';

export default defineNuxtRouteMiddleware((to, from) => {
 
  const isLogged = computed(() => {
    return store.state.isLogged;
  });

  // Se o usuário tentar acessar a página de administração e não estiver autenticado, redirecione para a tela de login
  if (to.path === '/AdminView' && !isLogged.value) {
    console.log("Usuário não autenticado, redirecionando para a tela de login");
    return navigateTo('/LoginView');
  }

  // Caso contrário, permita o acesso à rota desejada
});
