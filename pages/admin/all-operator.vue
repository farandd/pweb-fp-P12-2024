<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-grow container mx-auto mt-8">
      <!-- Navigasi -->
      <div>
        <nav class="flex space-x-4 border-b">
          <NuxtLink
            to="/admin"
            class="px-4 py-2 text-gray-700"
            active-class="text-blue-500 border-b-2 border-blue-500"
          >
            Data Barang
          </NuxtLink>
          <NuxtLink
            to="/admin/all-operator"
            class="px-4 py-2 text-gray-700"
            active-class="text-blue-500 border-b-2 border-blue-500"
          >
            Data Petugas
          </NuxtLink>
          <NuxtLink
            to="/admin/summary"
            class="px-4 py-2 text-gray-700"
            active-class="text-blue-500 border-b-2 border-blue-500"
          >
            Data Peminjaman
          </NuxtLink>
        </nav>
      </div>

      <h2 class="text-3xl font-bold mt-6">Data Petugas</h2>
      <div class="mt-6 flex justify-between items-center">
        <h3 class="text-xl font-semibold">List Petugas</h3>
        <button
          @click="showAddOperatorModal"
          class="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          + Tambah Petugas
        </button>
      </div>

      <!-- Tabel Petugas -->
      <table class="min-w-full mt-4 bg-white border border-gray-300">
        <thead>
          <tr>
            <th class="border px-4 py-2">No</th>
            <th class="border px-4 py-2">Nama Petugas</th>
            <th class="border px-4 py-2">Username</th>
            <th class="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(operator, index) in operators" :key="index">
            <td class="border px-4 py-2">{{ index + 1 }}</td>
            <td class="border px-4 py-2">{{ operator.name }}</td>
            <td class="border px-4 py-2">{{ operator.username }}</td>
            <td class="border px-4 py-2">
              <button
                @click="editOperator(index)"
                class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
              >
                Edit
              </button>
              <button
                @click="deleteOperator(index)"
                class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal untuk menambah/edit petugas -->
      <div
        v-if="isModalOpen"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h3 class="text-lg font-semibold">
            {{ isEditing ? "Edit Petugas" : "Tambah Petugas" }}
          </h3>
          <form @submit.prevent="isEditing ? updateOperator() : addOperator()">
            <div class="mb-4">
              <label
                for="operatorName"
                class="block text-sm font-medium text-gray-700"
                >Nama Petugas</label
              >
              <input
                type="text"
                id="operatorName"
                v-model="operatorName"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div class="mb-4">
              <label
                for="operatorUsername"
                class="block text-sm font-medium text-gray-700"
                >Username</label
              >
              <input
                type="text"
                id="operatorUsername"
                v-model="operatorUsername"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div class="flex justify-end">
              <button
                type="button"
                @click="closeModal"
                class="mr-2 text-gray-500 hover:underline"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="bg-indigo-600 text-white px-4 py-2 rounded-md"
              >
                {{ isEditing ? "Update" : "Add" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Data awal petugas
const defaultOperators = [
  { name: "Radit", username: "RaditGay" },
  { name: "Syela", username: "SyelaGamink" },
];

// Data petugas
const operators = ref([]);

// State untuk modal
const operatorName = ref("");
const operatorUsername = ref("");
const isModalOpen = ref(false);
const isEditing = ref(false);
let editingIndex = ref(null);

// Fungsi untuk menyimpan data ke LocalStorage
const saveToLocalStorage = () => {
  localStorage.setItem("operators", JSON.stringify(operators.value));
};

// Fungsi untuk memuat data dari LocalStorage
const loadFromLocalStorage = () => {
  const storedOperators = localStorage.getItem("operators");
  if (storedOperators) {
    operators.value = JSON.parse(storedOperators);
  } else {
    operators.value = defaultOperators; // Jika tidak ada data, gunakan data default
    saveToLocalStorage(); // Simpan data default ke LocalStorage
  }
};

// Fungsi untuk membuka modal tambah
const showAddOperatorModal = () => {
  isModalOpen.value = true;
  isEditing.value = false;
  resetForm();
};

// Fungsi untuk menutup modal
const closeModal = () => {
  isModalOpen.value = false;
};

// Fungsi untuk menambahkan petugas baru
const addOperator = () => {
  operators.value.push({
    name: operatorName.value,
    username: operatorUsername.value,
  });
  saveToLocalStorage(); // Simpan ke LocalStorage
  closeModal();
};

// Fungsi untuk membuka modal edit
const editOperator = (index) => {
  const operator = operators.value[index];
  operatorName.value = operator.name;
  operatorUsername.value = operator.username;
  editingIndex.value = index;
  isModalOpen.value = true;
  isEditing.value = true;
};

// Fungsi untuk memperbarui data petugas
const updateOperator = () => {
  operators.value[editingIndex.value] = {
    name: operatorName.value,
    username: operatorUsername.value,
  };
  saveToLocalStorage(); // Simpan ke LocalStorage
  closeModal();
};

// Fungsi untuk menghapus petugas
const deleteOperator = (index) => {
  operators.value.splice(index, 1);
  saveToLocalStorage(); // Simpan ke LocalStorage
};

// Fungsi untuk mereset form modal
const resetForm = () => {
  operatorName.value = "";
  operatorUsername.value = "";
};

// Muat data dari LocalStorage saat komponen di-mount
onMounted(() => {
  loadFromLocalStorage();
});
</script>

<style scoped>
/* Tambahkan gaya tambahan jika diperlukan */
</style>
