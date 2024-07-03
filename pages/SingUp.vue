<template>
  <v-container class="bg-black mt-16">
    <v-row class="mt-2">
      <v-col cols="12" class="text-center">
        <h1>Registrar usuário</h1>
      </v-col>
    </v-row>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-form class="mb-10" ref="form">
            <v-row>
              <v-col cols="12" lg="12" md="6">
                <v-text-field label="Nome" v-model="userName" :rules="nameRules" prepend-inner-icon="mdi-account"
                  variant="outlined" placeholder="Digite seu nome de usuario"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field prepend-inner-icon="mdi-email" v-model="email" label="Email" :rules="emailRules"
                  variant="outlined" placeholder="Digite seu email" required></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field prepend-inner-icon="mdi-email" v-model="confirmEmail" label="Confirme seu email"
                  :rules="confirmEmailRules" variant="outlined" placeholder="Confirme seu email"
                  required></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field prepend-inner-icon="mdi-lock"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="togglePasswordVisibility" :type="showPassword ? 'text' : 'password'"
                  v-model="password" label="Senha" :rules="passwordRules" variant="outlined"
                  placeholder="Digite sua senha" required></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field prepend-inner-icon="mdi-lock"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="togglePasswordVisibility" :type="showPassword ? 'text' : 'password'"
                  v-model="confirmPassword" label="Confirme sua senha" :rules="confirmPasswordRules" variant="outlined"
                  placeholder="Confirme sua senha" required></v-text-field>
              </v-col>

              <v-col cols="12" class="d-flex justify-center">
                <v-btn color="success" @click="registerUser" size="large" type="button" variant="elevated">
                  Registrar
                </v-btn>
              </v-col>
              <v-col class=" d-flex justify-center mt-4 mb-2">
                <v-btn :to="homeLink" color="primary" size="large" variant="elevated" width="144">
                  Voltar
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-progress-linear v-if="isLoading" indeterminate color="primary"></v-progress-linear>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import store from '~/store/index';



const router = useRouter();

const userName = ref('');
const email = ref('');
const confirmEmail = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const homeLink = '/';
const isLoading = computed(() => store.state.isLoading);


const nameRules = [
  (value) => !!value || 'Digite seu nome.',
  (value) => (value && value.length >= 3) || 'Digite um nome válido.'
];

const emailRules = [
  (value) => !!value || 'E-mail é obrigatório.',
  (value) => /.+@.+\..+/.test(value) || 'O E-mail deve ser válido.',
];

const confirmEmailRules = [
  (value) => !!value || 'Confirmação de e-mail é obrigatória.',
  (value) => value === email.value || 'Os e-mails não coincidem.',
];

const passwordRules = [
  (value) => !!value || 'A senha é necessária.',
  (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value) ||
    'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número.',
];

const confirmPasswordRules = [
  (value) => !!value || 'Confirmação de senha é obrigatória.',
  (value) => value === password.value || 'As senhas não coincidem.',
];

const validateFields = () => {
  const nameValid = nameRules.every((rule) => rule(userName.value) === true);
  const emailValid = emailRules.every((rule) => rule(email.value) === true);
  const confirmEmailValid = confirmEmailRules.every((rule) => rule(confirmEmail.value) === true);
  const passwordValid = passwordRules.every((rule) => rule(password.value) === true);
  const confirmPasswordValid = confirmPasswordRules.every((rule) => rule(confirmPassword.value) === true);

  if (nameValid && emailValid && confirmEmailValid && passwordValid && confirmPasswordValid) {
    const userData = {
      userName: userName.value,
      email: email.value,
      password: password.value,
    };

    return userData;
  } else {
    alert('Por favor, preencha todos os campos corretamente.');
    return false;
  }
};
const registerUser = async () => {
  const userData = validateFields();
  if (!userData) {
    return;
  }

  store.commit('SET_LOADING', true);
  console.log('Loading state after SET_LOADING true:', store.state.isLoading);  // Verificação do estado
  try {
    const response = await axios.post('https://lista-de-tarefas-back-end-delta.vercel.app/users', userData);
    if (response.status === 201) {
      alert('Usuário registrado com sucesso!');
      console.log('Registration successful, navigating to LoginView');
      router.push('/LoginView');
      return true;
    } else {
      console.error('Erro ao registrar usuário:', response.data.message);
      alert(`Erro ao registrar usuário: ${response.data.message}`);
      return false;
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      alert('Email já está em uso. Por favor, use outro email.');
    } else {
      console.error('Erro na solicitação de registro:', error);
      alert('Erro ao registrar usuário. Por favor, tente novamente mais tarde.');
    }
    return false;
  } finally {
    store.commit('SET_LOADING', false);
    console.log('Loading state after SET_LOADING false:', store.state.isLoading);  // Verificação do estado
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>
