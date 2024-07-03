<template>
  <v-container class="bg-black mt-2">
    <form @submit.prevent="addTask">
      <v-text-field v-model="taskAuthor" label="Autor"></v-text-field>
      <v-text-field v-model="taskName" label="Título da tarefa"></v-text-field>
      <v-text-field v-model="taskDate" label="Data de criação" readonly></v-text-field>
      <v-text-field v-model="taskReminderDate" label="Data do lembrete" type="date"></v-text-field>
      <v-text-field v-model="taskReminderHour" label="Hora do lembrete" type="time"></v-text-field>
      <v-textarea v-model="taskContent" label="Descreva sua tarefa"></v-textarea>
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
          <th class="text-h5 text-center">Autor</th>
          <th class="text-h5 text-center">Tarefa</th>
          <th class="text-h5 text-center">Data</th>
          <th class="text-h5 text-center">Descrição</th>
          <th class="text-h5 text-center">Data de aviso</th>
          <th class="text-h5 text-center">Hora de aviso</th>
          <th class="text-h5 text-center">Deletar</th>
          <th class="text-h5 text-center">Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr class="text-center" v-for="task in tasks" :key="task._id">
          <td>{{ task.author }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.date }}</td>
          <td class="word-wrap-break">{{ task.text }}</td>
          <td>{{ task.reminderDate }}</td>
          <td>{{ task.reminderHour }}</td>
          <td>
            <v-btn v-if="loginStatus" @click="openDeleteModal(task._id, 'task')"
              class="text-decoration-none bg-red-darken-4">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn @click="openEditModal(task)" class="text-decoration-none bg-blue-darken-4">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <tr class="d-flex justify-center">
      {{ currentDate }}
      <v-progress-circular v-if="loadingFlag" color="primary" indeterminate :size="74" :width="8"></v-progress-circular>
    </tr>

    <!-- Modal for editing the task -->
    <v-dialog v-model="editModal" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Editar Tarefa</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="editForm">
            <v-text-field v-model="editTaskAuthor" label="Autor"></v-text-field>
            <v-text-field v-model="editTaskName" label="Título da tarefa"></v-text-field>
            <v-date-input v-model="editTaskReminderDate" label="Data do lembrete"></v-date-input>
            <v-text-field v-model="editTaskReminderHour" label="Hora do lembrete" type="time"></v-text-field>
            <v-textarea v-model="editTaskContent" label="Conteúdo da Tarefa"></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeEditModal">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="confirmEditTask">Salvar</v-btn>
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

const taskAuthor = ref('');
const taskName = ref('');
const taskDate = ref(getCurrentDate());
const taskContent = ref('');
const taskReminderDate = ref("");
const taskReminderHour = ref('');
const tasks = ref([]);
const isAdding = ref(false);
const isFetching = ref(false);

const editModal = ref(false);
const editTaskId = ref('');
const editTaskAuthor = ref('');
const editTaskName = ref('');
const editTaskContent = ref('');
const editTaskReminderDate = ref('');
const editTaskReminderHour = ref('');
const deleteModal = ref(false);
const deleteId = ref(null);
const deleteType = ref('');

const getTasks = async () => {
  try {
    isFetching.value = true;
    const response = await axios.get("https://lista-de-tarefas-back-end-delta.vercel.app/tasks", {
      params: {
        userId: userId.value // Enviando o userId como parâmetro
      }
    });
    tasks.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
  } finally {
    isFetching.value = false;
  }
};

const addTask = async () => {
  if (taskName.value && taskAuthor.value && taskContent.value) {
    isAdding.value = true;
    try {
      const task = {
        author: taskAuthor.value,
        title: taskName.value,
        date: getCurrentDate(),
        text: taskContent.value,
        reminderDate: taskReminderDate.value,
        reminderHour: taskReminderHour.value,
        userId: userId.value
      };

      const response = await axios.post("https://lista-de-tarefas-back-end-delta.vercel.app/tasks", task);

      if (response) {
        console.log("Tarefa adicionada com sucesso:", response.data);


      } else {
        console.error("Erro ao adicionar tarefa, status da resposta:", response.status);
      }
    } catch (error) {
      console.error("Erro ao enviar tarefa:", error);
    } finally {
      // Limpar os campos após a adição bem-sucedida da tarefa
      taskAuthor.value = '';
      taskName.value = '';
      taskContent.value = '';
      taskReminderDate.value = '';
      taskReminderHour.value = '';
      isAdding.value = false;
      getTasks();
    }
  } else {
    alert("Por favor, preencha todos os campos obrigatórios.");
  }
};


const deleteTask = async (taskId: string) => {
  try {
    await axios.delete(`https://lista-de-tarefas-back-end-delta.vercel.app/tasks/${taskId}`);
    getTasks();
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
  }
};

const openEditModal = (task: any) => {
  editTaskId.value = task._id;
  editTaskAuthor.value = task.author;
  editTaskName.value = task.title;
  editTaskContent.value = task.text;
  editTaskReminderDate.value = task.reminderDate;
  editTaskReminderHour.value = task.reminderHour;
  editModal.value = true;
};

const closeEditModal = () => {
  editModal.value = false;
  editTaskId.value = '';
  editTaskAuthor.value = '';
  editTaskName.value = '';
  editTaskContent.value = '';
  editTaskReminderDate.value = '';
  editTaskReminderHour.value = '';
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
  if (deleteType.value === 'task') {
    deleteTask(deleteId.value);
  }
  closeDeleteModal();
};

const confirmEditTask = async () => {
  try {
    const updatedTask = {
      author: editTaskAuthor.value,
      title: editTaskName.value,
      date: getCurrentDate(),
      text: editTaskContent.value,
      reminderDate: editTaskReminderDate.value,
      reminderHour: editTaskReminderHour.value
    };

    await axios.put(`https://lista-de-tarefas-back-end-delta.vercel.app/tasks/${editTaskId.value}`, updatedTask);
    closeEditModal();
    getTasks();
  } catch (error) {
    console.error("Erro ao editar a tarefa:", error);
  }
};

getTasks();
</script>
