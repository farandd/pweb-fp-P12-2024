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
            Data Peminjaman
          </NuxtLink>
        </nav>
      </div>

      <!-- Konten Data Barang -->
      <h1 class="text-2xl font-bold mb-4 mt-6">Daftar Barang yang Tersedia</h1>
      <input
        v-model="searchQuery"
        placeholder="Cari Nama Barang"
        class="p-2 border rounded w-full mb-4"
      />
      <table class="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th class="border px-4 py-2">No</th>
            <th
              v-for="column in columns"
              :key="column.key"
              class="border px-4 py-2 cursor-pointer"
              @click="sort(column.key)"
            >
              {{ column.label }}
              <span v-if="sortKey === column.key">
                {{ sortOrder === "asc" ? "🔼" : "🔽" }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredAndSortedItems" :key="item.name">
            <td class="border px-4 py-2 text-center">{{ index + 1 }}</td>
            <td class="border px-4 py-2">{{ item.name }}</td>
            <td class="border px-4 py-2">{{ item.condition }}</td>
            <td class="border px-4 py-2 text-center">{{ item.amount }}</td>
            <td class="border px-4 py-2">
              {{ new Date(item.created_at).toLocaleDateString() }}
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="filteredAndSortedItems.length === 0" class="text-center mt-4">
        Tidak ada data yang sesuai.
      </p>
    </main>
  </div>
</template>

<script>
import { useItemsStore } from "~/stores/items";

export default {
  data() {
    return {
      searchQuery: "",
      sortKey: "name",
      sortOrder: "asc",
      columns: [
        { key: "name", label: "Nama Barang" },
        { key: "condition", label: "Kondisi" },
        { key: "amount", label: "Jumlah" },
        { key: "created_at", label: "Tanggal Registrasi" },
      ],
    };
  },
  computed: {
    items() {
      const itemsStore = useItemsStore();
      return itemsStore.items;
    },
    filteredAndSortedItems() {
      let filtered = this.items.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      return filtered.sort((a, b) => {
        const aValue =
          this.sortKey === "amount"
            ? parseInt(a[this.sortKey])
            : a[this.sortKey];
        const bValue =
          this.sortKey === "amount"
            ? parseInt(b[this.sortKey])
            : b[this.sortKey];

        if (this.sortKey === "created_at") {
          return this.sortOrder === "asc"
            ? new Date(aValue) - new Date(bValue)
            : new Date(bValue) - new Date(aValue);
        }

        if (typeof aValue === "string") {
          return this.sortOrder === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return this.sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      });
    },
  },
  methods: {
    sort(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortKey = key;
        this.sortOrder = "asc";
      }
    },
  },
};
</script>

<style scoped>
th {
  background-color: #f9f9f9;
  cursor: pointer;
}
td,
th {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}
tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
