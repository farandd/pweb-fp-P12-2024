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

      <h2 class="text-3xl font-bold mt-6">Data Barang</h2>
      <div class="mt-6 flex justify-between items-center">
        <h3 class="text-xl font-semibold">List Barang</h3>
        <button
          @click="showAddItemModal"
          class="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          + Tambah Barang
        </button>
      </div>

      <table class="min-w-full mt-4 bg-white border border-gray-300">
        <thead>
          <tr>
            <th class="border px-4 py-2">No</th>
            <th class="border px-4 py-2">Nama Barang</th>
            <th class="border px-4 py-2">Jumlah</th>
            <th class="border px-4 py-2">Kondisi</th>
            <th class="border px-4 py-2">Tanggal Registrasi</th>
            <th class="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td class="border px-4 py-2">{{ index + 1 }}</td>
            <td class="border px-4 py-2">{{ item.name }}</td>
            <td class="border px-4 py-2">{{ item.amount }}</td>
            <td class="border px-4 py-2">{{ item.condition }}</td>
            <td class="border px-4 py-2">
              {{ new Date(item.created_at).toLocaleDateString() }}
            </td>
            <td class="border px-4 py-2">
              <button
                @click="editItem(index)"
                class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
              >
                Edit
              </button>
              <button
                @click="deleteItem(index)"
                class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal Tambah Barang -->
      <div
        v-if="isModalOpen"
        class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      >
        <div class="bg-white p-6 rounded-md shadow-lg w-96">
          <h3 class="text-xl font-semibold mb-4">
            {{ isEditing ? "Edit Barang" : "Tambah Barang" }}
          </h3>
          <div class="mb-4">
            <label class="block text-gray-700">Nama Barang</label>
            <input
              v-model="itemName"
              type="text"
              class="w-full border px-4 py-2 rounded-md"
              placeholder="Masukkan Nama Barang"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Jumlah</label>
            <input
              v-model="itemQuantity"
              type="number"
              class="w-full border px-4 py-2 rounded-md"
              placeholder="Masukkan Jumlah"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Kondisi</label>
            <input
              v-model="itemCondition"
              type="text"
              class="w-full border px-4 py-2 rounded-md"
              placeholder="Masukkan Kondisi Barang"
            />
          </div>
          <div class="flex justify-between">
            <button
              @click="closeModal"
              class="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Batal
            </button>
            <button
              @click="isEditing ? updateItem() : addItem()"
              class="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              {{ isEditing ? "Update" : "Simpan" }}
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { DUMMY_ITEMS } from "~/data/dummy/items";

const items = ref(DUMMY_ITEMS);
const itemName = ref("");
const itemQuantity = ref(0);
const itemCondition = ref("");
const isModalOpen = ref(false);
const isEditing = ref(false);
let editingIndex = ref(null);

const showAddItemModal = () => {
  isModalOpen.value = true;
  isEditing.value = false;
  resetForm();
};

const closeModal = () => {
  isModalOpen.value = false;
};

const addItem = () => {
  items.value.push({
    name: itemName.value,
    amount: itemQuantity.value,
    condition: itemCondition.value,
    created_at: new Date(),
  });
  closeModal();
};

const editItem = (index) => {
  const item = items.value[index];
  itemName.value = item.name;
  itemQuantity.value = item.amount;
  itemCondition.value = item.condition;
  editingIndex.value = index;
  isModalOpen.value = true;
  isEditing.value = true;
};

const updateItem = () => {
  const updatedItem = {
    name: itemName.value,
    amount: itemQuantity.value,
    condition: itemCondition.value,
    created_at: items.value[editingIndex.value].created_at, // keep original date
  };
  items.value[editingIndex.value] = updatedItem;
  closeModal();
};

const deleteItem = (index) => {
  items.value.splice(index, 1); // Hapus item dari daftar
};

const resetForm = () => {
  itemName.value = "";
  itemQuantity.value = 0;
  itemCondition.value = "";
};
</script>

<style scoped>
/* Tambahkan gaya tambahan jika diperlukan */
</style>
