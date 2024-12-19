<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-2xl font-semibold text-gray-900">Data Barang</h1>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button variant="primary" @click="openAddModal">Tambah Barang</Button>
        </div>
      </div>

      <div class="mt-8">
        <Table
          :items="itemsStore.items"
          :columns="columns"
          :actions="true"
        >
          <template #actions="{ item }">
            <div class="flex justify-end space-x-2">
              <Button variant="secondary" @click="editItem(item)">Edit</Button>
              <Button variant="danger" @click="deleteItem(item)">Delete</Button>
            </div>
          </template>
        </Table>
      </div>
    </div>

    <Modal
      :is-open="isModalOpen"
      :title="isEditing ? 'Edit Barang' : 'Tambah Barang Baru'"
      @close="closeModal"
    >
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nama Barang</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Jumlah</label>
          <input
            v-model="form.amount"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Kondisi</label>
          <input
            v-model="form.condition"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div class="flex justify-end space-x-2">
          <Button variant="secondary" @click="closeModal">Cancel</Button>
          <Button variant="primary" type="submit">{{ isEditing ? 'Update' : 'Add' }}</Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { useItemsStore } from '~/stores/items';
import type { Item } from '~/types';

const itemsStore = useItemsStore();

const columns = [
  { key: 'name', label: 'Nama Barang' },
  { key: 'amount', label: 'Jumlah' },
  { key: 'condition', label: 'Kondisi' },
  { key: 'created_at', label: 'Tanggal Registrasi' },
];

const isModalOpen = ref(false);
const isEditing = ref(false);
const editingIndex = ref(-1);

const form = ref({
  name: '',
  amount: '',
  condition: '',
});

const openAddModal = () => {
  isEditing.value = false;
  form.value = {
    name: '',
    amount: '',
    condition: '',
  };
  isModalOpen.value = true;
};

const editItem = (item: Item) => {
  isEditing.value = true;
  form.value = { ...item };
  editingIndex.value = itemsStore.items.indexOf(item);
  isModalOpen.value = true;
};

const deleteItem = (item: Item) => {
  const index = itemsStore.items.indexOf(item);
  itemsStore.deleteItem(index);
};

const handleSubmit = () => {
  const newItem: Item = {
    ...form.value,
    created_at: isEditing.value ? itemsStore.items[editingIndex.value].created_at : new Date(),
  };

  if (isEditing.value) {
    itemsStore.updateItem(editingIndex.value, newItem);
  } else {
    itemsStore.addItem(newItem);
  }

  closeModal();
};

const closeModal = () => {
  isModalOpen.value = false;
  form.value = {
    name: '',
    amount: '',
    condition: '',
  };
};
</script>