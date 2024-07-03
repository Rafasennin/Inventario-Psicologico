<template>
  <v-container class="bg-black mt-16">
    <v-row class="mt-2">
      <v-col cols="12" class="text-center">
        <h1>Contato</h1>
      </v-col>
    </v-row>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-form class="mb-10" ref="form">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="Nome" v-model="contato.name" :rules="nameRules"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Email" v-model="contato.email" :rules="emailRules"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="Mensagem" v-model="contato.message"></v-textarea>
              </v-col>
              <v-col cols="12" class="d-flex justify-center">
                <v-btn color="primary" @click="sendContact">Enviar</v-btn>
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
import { ref } from 'vue';
import axios from 'axios';

const router = useRouter();

const contato = useState('contato', () => ({
  name: '',
  email: '',
  message: ''
}));

const isLoading = useState('isLoading', () => false);

const nameRules = [
  (value: string) => !!value || 'Digite seu nome.',
  (value: string) => (value && value.length >= 3) || 'Digite um nome válido.'
];

const emailRules = [
  (value: string) => !!value || 'Digite um email.',
  (value: string) => /.+@.+\..+/.test(value) || 'O E-mail deve ser válido.'
];

const sendContact = async () => {
  if (contato.value.name && contato.value.email && contato.value.message) {
    isLoading.value = true;

    try {
      await axios.post('https://lista-de-tarefas-back-end-delta.vercel.app/contatos', contato.value);
      console.log('Contato enviado:');
      // Limpar campos do formulário
      contato.value.name = '';
      contato.value.email = '';
      contato.value.message = '';
      // Redirecionar para a página principal
      router.push({ path: '/' });
    } catch (error) {
      console.error('Erro ao enviar contato:', error);
    } finally {
      isLoading.value = false;
    }
  } else {
    alert('Por favor, preencha todos os campos obrigatórios.');
  }
};
</script>