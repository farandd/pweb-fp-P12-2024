<template>
  <div>
    <OperatorNavigation />
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-2xl font-semibold text-gray-900">Form Peminjaman</h1>
          </div>
        </div>

        <div class="mt-8">
          <form @submit.prevent="handleSubmit" class="space-y-6 max-w-2xl">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nama Barang</label>
              <select
                v-model="form.item_name"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Pilih Barang</option>
                <option v-for="item in itemsStore.items" :key="item.name" :value="item.name">
                  {{ item.name }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Jumlah Pinjam</label>
              <input
                v-model="form.amount"
                type="number"
                required
                min="1"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Tanggal Pengembalian</label>
              <input
                v-model="form.return_date"
                type="date"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Nama Peminjam</label>
              <input
                v-model="form.borrower_name"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div class="flex justify-end">
              <Button variant="primary" type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useItemsStore } from '~/stores/items';
import { useBorrowingsStore } from '~/stores/borrowings';
import { useAuthStore } from '~/stores/auth';

const itemsStore = useItemsStore();
const borrowingsStore = useBorrowingsStore();
const authStore = useAuthStore();

const form = ref({
  item_name: '',
  amount: '',
  return_date: '',
  borrower_name: '',
});

const handleSubmit = () => {
  borrowingsStore.addBorrowing({
    ...form.value,
    borrow_date: new Date(),
    officer_name: authStore.user?.username || '',
  });

  form.value = {
    item_name: '',
    amount: '',
    return_date: '',
    borrower_name: '',
  };
};
</script>