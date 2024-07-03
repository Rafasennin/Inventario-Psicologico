<template>
  <v-container class="bg-black mt-16 h-100">
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="mt-10 mb-5">Seção do Administrador</h1>
      </v-col>
    </v-row>

    <v-divider></v-divider>
    <v-row class="d-flex align-center justify-center" style="height: 400px;">
      <v-col cols="12" sm="8" md="6">
        <v-alert type="info" class="my-4" style="height: 210px;">
          <div>
            <h3 class="mb-2">Instruções para Visualização</h3>
            <p>Para melhor visualização, utilize a rolagem horizontal nas tabelas abaixo.</p>
            <p>Se você estiver utilizando um dispositivo móvel, deslize a tabela para os lados.</p>
            <p>Em caso de dúvidas ou problemas, entre em contato com o suporte.</p>
          </div>
        </v-alert>
      </v-col>
    </v-row>

    <!-- Usuários Registrados -->
    <v-row class="text-center mt-10">
      <v-col cols="12">
        <h2 class="my-3">Usuários Registrados</h2>
      </v-col>
    </v-row>

    <v-row class="overflow-x-auto">
      <v-col cols="12">
        <v-table theme="dark">
          <thead>
            <tr>
              <th class="text-h5 text-center">ID</th>
              <th class="text-h5 text-center">Nome</th>
              <th class="text-h5 text-center">Email</th>
              <th class="text-h5 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center" v-for="usuario in usuarios" :key="usuario._id">
              <td>{{ usuario._id }}</td>
              <td>{{ usuario.userName }}</td>
              <td>{{ usuario.email }}</td>
              <td>
                <v-btn @click="openDeleteModal(usuario._id, 'user')" class="text-decoration-none bg-red-darken-4">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center mt-5">
      <v-progress-circular v-if="isFetchingUsers" color="primary" indeterminate :size="74"
        :width="8"></v-progress-circular>
    </v-row>

    <!-- Contatos Enviados -->
    <v-row class="text-center">
      <v-col cols="12">
        <h2 class="my-3">Contatos Enviados</h2>
      </v-col>
    </v-row>

    <v-row class="overflow-x-auto">
      <v-col cols="12">
        <v-table theme="dark">
          <thead>
            <tr>
              <th class="text-h5 text-center">ID</th>
              <th class="text-h5 text-center">Nome</th>
              <th class="text-h5 text-center">Email</th>
              <th class="text-h5 text-center">Mensagem</th>
              <th class="text-h5 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center" v-for="contato in contatos" :key="contato._id">
              <td>{{ contato._id }}</td>
              <td>{{ contato.name }}</td>
              <td>{{ contato.email }}</td>
              <td>{{ contato.message }}</td>
              <td>
                <v-btn @click="openDeleteModal(contato._id, 'contato')" class="text-decoration-none bg-red-darken-4">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center mt-5">
      <v-progress-circular v-if="isFetching" color="primary" indeterminate :size="74" :width="8"></v-progress-circular>
    </v-row>

    <!-- Modal for delete-->
    <v-dialog v-model="deleteModal" max-width="230px">
      <v-card>
        <v-card-title>
          <span class="headline">Confirma a deleção?</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDeleteModal">Cancelar</v-btn>
          <v-btn color="red darken-1" text @click="confirmDelete">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <FooterComponent />
  </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';


const router = useRouter();
const contatos = ref([]);
const usuarios = ref([]);
const isFetching = ref(false);
const isFetchingUsers = ref(false);
const isLogged = ref(true);
const deleteModal = ref(false);
const deleteId = ref(null);
const deleteType = ref('');

const getContatos = async () => {
  try {
    isFetching.value = true;
    const response = await axios.get('https://lista-de-tarefas-back-end-delta.vercel.app/contatos');
    contatos.value = response.data;
    isFetching.value = false;
  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    isFetching.value = false;
  }
};

const getUsuarios = async () => {
  try {
    isFetchingUsers.value = true;
    const response = await axios.get('https://lista-de-tarefas-back-end-delta.vercel.app/users');
    usuarios.value = response.data;
    isFetchingUsers.value = false;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    isFetchingUsers.value = false;
  }
};

const deleteContato = async (contatoId) => {
  try {
    await axios.delete(`https://lista-de-tarefas-back-end-delta.vercel.app/contatos/${contatoId}`);
    getContatos(); // Atualiza a lista após a exclusão
  } catch (error) {
    console.error('Erro ao excluir contato:', error);
  }
};

const deleteUser = async (userId) => {
  try {
    await axios.delete(`https://lista-de-tarefas-back-end-delta.vercel.app/users/${userId}`);
    getUsuarios(); // Atualiza a lista após a exclusão
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
  }
};

const openDeleteModal = (id, type) => {
  deleteId.value = id;
  deleteType.value = type;
  deleteModal.value = true;
};

const closeDeleteModal = () => {
  deleteModal.value = false;
  deleteId.value = null;
  deleteType.value = '';
};

const confirmDelete = () => {
  if (deleteType.value === 'user') {
    deleteUser(deleteId.value);
  } else if (deleteType.value === 'contato') {
    deleteContato(deleteId.value);
  }
  closeDeleteModal();
};

// Chama getContatos e getUsuarios ao montar o componente
onMounted(() => {
  getContatos();
  getUsuarios();
});

definePageMeta({
  middleware: 'auth',
});

</script>
