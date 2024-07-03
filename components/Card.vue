<template>
  <v-container class="bg-black mt-2">
    <form @submit.prevent="addReport">
      <v-text-field v-model="reportVirtue" label="Virtude"></v-text-field>
      <v-text-field v-model="reportMVirtue" label="Descrição da Virtude"></v-text-field>
      <v-text-field v-model="reportDefect" label="Defeito"></v-text-field>
      <v-text-field v-model="reportMDefect" label="Descrição do Defeito"></v-text-field>
      <v-text-field v-model="reportDate" label="Data de criação" readonly></v-text-field>
      
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn color="primary" type="submit">Adicionar</v-btn>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-progress-linear v-if="isAdding" indeterminate color="primary"></v-progress-linear>
          </v-row>
        </v-col>
      </v-row>
    </form>

    <v-table theme="dark" class="overflow-x-auto">
      <thead>
        <tr>
          <th class="text-h5 text-center">Virtude</th>
          <th class="text-h5 text-center">Descrição da Virtude</th>
          <th class="text-h5 text-center">Defeito Psicológico</th>
          <th class="text-h5 text-center">Descrição do Defeito</th>
          <th class="text-h5 text-center">Data</th>
          <th class="text-h5 text-center">Deletar</th>
          <th class="text-h5 text-center">Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="report in reports" :key="report._id">
          <td>{{ report.virtue }}</td>
          <td class="word-wrap-break">{{ report.vmessage }}</td>
          <td>{{ report.defect }}</td>
          <td>{{ report.dmessage }}</td>
          <td>{{ report.date }}</td>
          <td>
            <v-btn v-if="loginStatus" @click="openDeleteModal(report._id, 'report')"
              class="text-decoration-none bg-red-darken-4">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn @click="openEditModal(report)" class="text-decoration-none bg-blue-darken-4">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <tr class="d-flex justify-center">
      {{ currentDate }}
      <v-progress-circular v-if="isFetching" color="primary" indeterminate :size="74" :width="8"></v-progress-circular>
    </tr>

    <!-- Modal for editing the report -->
    <v-dialog v-model="editModal" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Editar Relato</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="editForm">
            <v-text-field v-model="editReportVirtue" label="Virtude"></v-text-field>
            <v-text-field v-model="editReportMVirtue" label="Descrição da Virtude"></v-text-field>
            <v-text-field v-model="editReportDefect" label="Defeito Psicológico"></v-text-field>
            <v-text-field v-model="editReportMDefect" label="Descrição do Defeito"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeEditModal">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="confirmEditReport">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import store from '~/store/index';

const router = useRouter();
const userId = computed(() => store.state.userId);
const loginStatus = computed(() => store.state.isLogged);

const getCurrentDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const reportVirtue = ref('');
const reportMVirtue = ref('');
const reportDefect = ref("");
const reportMDefect = ref('');
const reportDate = ref(getCurrentDate());
const reports = ref([]);
const isAdding = ref(false);
const isFetching = ref(false);

const editModal = ref(false);
const editReportId = ref('');
const editReportVirtue = ref('');
const editReportMVirtue = ref('');
const editReportDefect = ref('');
const editReportMDefect = ref('');
const deleteModal = ref(false);
const deleteId = ref(null);
const deleteType = ref('');

const getReports = async () => {
  try {
    isFetching.value = true;
    const response = await axios.get("https://inventario-psicologico-back-end.vercel.app/report", {
      params: {
        userId: userId.value
      }
    });
    reports.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar relatos:", error);
  } finally {
    isFetching.value = false;
  }
};

const addReport = async () => {
  if (reportVirtue.value && reportMVirtue.value && reportDefect.value && reportMDefect.value) {
    isAdding.value = true;
    try {
      const report = {
        virtue: reportVirtue.value,
        vmessage: reportMVirtue.value,
        defect: reportDefect.value,
        dmessage: reportMDefect.value,
        date: getCurrentDate(),
        userId: userId.value
      };

      const response = await axios.post("https://inventario-psicologico-back-end.vercel.app/report", report);

      if (response) {
        console.log("Relato adicionado com sucesso:", response.data);
      } else {
        console.error("Erro ao adicionar relato, status da resposta:", response.status);
      }
    } catch (error) {
      console.error("Erro ao enviar relato:", error);
    } finally {
      // Limpar os campos após a adição bem-sucedida do relato
      reportVirtue.value = '';
      reportMVirtue.value = '';
      reportDefect.value = '';
      reportMDefect.value = '';
      isAdding.value = false;
      getReports();
    }
  } else {
    alert("Por favor, preencha todos os campos obrigatórios.");
  }
};

const deleteReport = async (reportId: string) => {
  try {
    await axios.delete(`https://inventario-psicologico-back-end.vercel.app/report/${reportId}`);
    getReports();
  } catch (error) {
    console.error("Erro ao excluir relato:", error);
  }
};

const openEditModal = (report: any) => {
  editReportId.value = report._id;
  editReportVirtue.value = report.virtue;
  editReportMVirtue.value = report.vmessage;
  editReportDefect.value = report.defect;
  editReportMDefect.value = report.dmessage;
  editModal.value = true;
};

const closeEditModal = () => {
  editModal.value = false;
  editReportId.value = '';
  editReportVirtue.value = '';
  editReportMVirtue.value = '';
  editReportDefect.value = '';
  editReportMDefect.value = '';
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
  if (deleteType.value === 'report') {
    deleteReport(deleteId.value);
  }
  closeDeleteModal();
};

const confirmEditReport = async () => {
  try {
    const updatedReport = {
      virtue: editReportVirtue.value,
      vmessage: editReportMVirtue.value,
      defect: editReportDefect.value,
      dmessage: editReportMDefect.value,
      date: getCurrentDate()
    };

    await axios.put(`https://inventario-psicologico-back-end.vercel.app/report/${editReportId.value}`, updatedReport);
    closeEditModal();
    getReports();
  } catch (error) {
    console.error("Erro ao editar o relato:", error);
  }
};

getReports();
</script>
