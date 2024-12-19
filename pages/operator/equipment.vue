<template>
  <div>
    <OperatorNavigation />
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-2xl font-semibold text-gray-900">Data Barang</h1>
          </div>
        </div>

        <div class="mt-8">
          <Table
            :items="itemsStore.items"
            :columns="columns"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useItemsStore } from '~/stores/items';

const itemsStore = useItemsStore();

const columns = [
  { key: 'name', label: 'Nama Barang' },
  { key: 'amount', label: 'Jumlah' },
  { key: 'condition', label: 'Kondisi' },
  { key: 'created_at', label: 'Tanggal Registrasi' },
];
</script>