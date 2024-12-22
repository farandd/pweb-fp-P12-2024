<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-grow container mx-auto mt-8">
      <!-- Navigasi -->
      <div>
        <nav class="flex space-x-4 border-b">
          <NuxtLink
            to="/operator/book-equipment"
            class="px-4 py-2 text-gray-700"
            active-class="text-blue-500 border-b-2 border-blue-500"
          >
            Form Peminjaman
          </NuxtLink>
          <NuxtLink
            to="/operator/equipment"
            class="px-4 py-2 text-gray-700"
            active-class="text-blue-500 border-b-2 border-blue-500"
          >
            Data Barang
          </NuxtLink>
          <NuxtLink
            to="/operator/borrowers"
            class="px-4 py-2 text-gray-700"
            active-class="text-blue-500 border-b-2 border-blue-500"
          >
            Data Peminjam
          </NuxtLink>
        </nav>
      </div>

      <!-- Data Barang -->
      <div class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900">Data Barang</h1>

          <div class="mt-4">
            <input
              v-model="searchQuery"
              placeholder="Cari Nama Barang"
              class="p-3 border-2 border-gray-300 rounded-md w-full mb-4"
            />
          </div>

          <table class="min-w-full border-collapse border border-gray-300">
            <thead class="bg-gray-200">
              <tr>
                <th class="border px-4 py-2">No</th>
                <th class="border px-4 py-2">Nama Barang</th>
                <th class="border px-4 py-2">Kondisi</th>
                <th class="border px-4 py-2">Jumlah</th>
                <th class="border px-4 py-2">Tanggal Registrasi</th>
                <th class="border px-4 py-2">Kategori</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in filteredItems"
                :key="index"
                class="hover:bg-gray-100"
              >
                <td class="border px-4 py-2 text-center">{{ index + 1 }}</td>
                <td class="border px-4 py-2">{{ item.name }}</td>
                <td class="border px-4 py-2">{{ item.condition }}</td>
                <td class="border px-4 py-2 text-center">{{ item.amount }}</td>
                <td class="border px-4 py-2 text-center">
                  {{ new Date(item.created_at).toLocaleDateString() }}
                </td>
                <td class="border px-4 py-2">{{ item.category || "-" }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useItemsStore } from "~/stores/items";

const itemsStore = useItemsStore();
const searchQuery = ref("");

const filteredItems = computed(() => {
  return itemsStore.items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<style scoped>
/* Gaya tabel */
th {
  text-align: left;
  padding: 10px;
  font-weight: bold;
}
td {
  text-align: left;
  padding: 10px;
}
tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
