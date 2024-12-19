<template>
  <div>
    <OperatorNavigation />
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-2xl font-semibold text-gray-900">Data Peminjam</h1>
          </div>
        </div>

        <div class="mt-8">
          <Table
            :items="borrowingsStore.borrowings"
            :columns="columns"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBorrowingsStore } from '~/stores/borrowings';

const borrowingsStore = useBorrowingsStore();

const columns = [
  { key: 'item_name', label: 'Nama Barang' },
  { key: 'amount', label: 'Jumlah Pinjam' },
  { key: 'borrow_date', label: 'Tgl. Pinjam' },
  { key: 'return_date', label: 'Tgl. Kembali' },
  { key: 'borrower_name', label: 'Peminjam' },
  { key: 'officer_name', label: 'Petugas' },
];
</script>