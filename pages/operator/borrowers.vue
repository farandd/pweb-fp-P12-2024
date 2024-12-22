<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-grow container mx-auto mt-8">
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

      <h1 class="text-3xl font-bold mt-6">Daftar Peminjaman</h1>
      <input
        v-model="searchQuery"
        placeholder="Cari Nama Barang atau Peminjam"
        class="p-2 border rounded w-full mb-4 mt-4"
      />
      <table
        v-if="filteredBorrowings.length"
        class="min-w-full border-collapse border border-gray-300"
      >
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
          <tr
            v-for="(borrow, index) in filteredBorrowings"
            :key="borrow.item_name"
          >
            <td class="border px-4 py-2 text-center">{{ index + 1 }}</td>
            <td class="border px-4 py-2">{{ borrow.item_name }}</td>
            <td class="border px-4 py-2">{{ borrow.amount }}</td>
            <td class="border px-4 py-2">
              {{ new Date(borrow.borrow_date).toLocaleDateString() }}
            </td>
            <td class="border px-4 py-2">
              {{ new Date(borrow.return_date).toLocaleDateString() }}
            </td>
            <td class="border px-4 py-2">{{ borrow.borrower_name }}</td>
            <td class="border px-4 py-2">{{ borrow.officer_name }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="text-gray-500 text-center mt-4">
        Tidak ada data untuk ditampilkan.
      </p>
    </main>
  </div>
</template>

<script>
import { useBorrowingsStore } from "~/stores/borrowings";

export default {
  data() {
    return {
      searchQuery: "",
      sortKey: "item_name",
      sortOrder: "asc",
      columns: [
        { key: "item_name", label: "Nama Barang" },
        { key: "amount", label: "Jumlah Pinjam" },
        { key: "borrow_date", label: "Tanggal Pinjam" },
        { key: "return_date", label: "Tanggal Kembali" },
        { key: "borrower_name", label: "Nama Peminjam" },
        { key: "officer_name", label: "Nama Petugas" },
      ],
    };
  },
  computed: {
    borrowings() {
      const borrowingsStore = useBorrowingsStore();
      return borrowingsStore.borrowings;
    },
    filteredBorrowings() {
      let filtered = this.borrowings.filter(
        (borrow) =>
          borrow.item_name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          borrow.borrower_name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );

      return filtered.sort((a, b) => {
        const aValue = a[this.sortKey];
        const bValue = b[this.sortKey];

        if (this.sortKey === "borrow_date" || this.sortKey === "return_date") {
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
body {
  font-family: Arial, sans-serif;
}
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
</style>
