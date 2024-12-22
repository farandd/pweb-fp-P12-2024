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

      <h2 class="text-3xl font-bold mt-6">Data Peminjaman</h2>
      <div class="mt-6 flex space-x-4">
        <div>
          <label for="startDate" class="block text-sm font-medium text-gray-700"
            >Start Date</label
          >
          <input
            type="date"
            id="startDate"
            v-model="startDate"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label for="endDate" class="block text-sm font-medium text-gray-700"
            >End Date</label
          >
          <input
            type="date"
            id="endDate"
            v-model="endDate"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label
            for="searchBorrower"
            class="block text-sm font-medium text-gray-700"
            >Search Borrower</label
          >
          <input
            type="text"
            id="searchBorrower"
            v-model="searchBorrower"
            placeholder="Enter borrower name"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <button
          @click="downloadPDF"
          class="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Download PDF
        </button>
      </div>

      <div ref="pdfContent" class="mt-6">
        <table class="min-w-full mt-4 bg-white border border-gray-300">
          <thead>
            <tr>
              <th class="border px-4 py-2">Nama Barang</th>
              <th class="border px-4 py-2">Jumlah Pinjam</th>
              <th class="border px-4 py-2">Tgl. Pinjam</th>
              <th class="border px-4 py-2">Tgl. Kembali</th>
              <th class="border px-4 py-2">Nama Peminjam</th>
              <th class="border px-4 py-2">Nama Petugas</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="borrow in filteredBorrowings" :key="borrow.item_name">
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
      </div>
    </main>
  </div>
</template>

<script>
import { useBorrowingsStore } from "~/stores/borrowings";
import { ref, computed } from "vue";
import html2pdf from "html2pdf.js";

export default {
  setup() {
    const borrowingsStore = useBorrowingsStore();
    const startDate = ref("");
    const endDate = ref("");
    const searchBorrower = ref("");

    const filteredBorrowings = computed(() => {
      return borrowingsStore.borrowings.filter((borrow) => {
        const matchesDate =
          (!startDate.value ||
            new Date(borrow.borrow_date) >= new Date(startDate.value)) &&
          (!endDate.value ||
            new Date(borrow.borrow_date) <= new Date(endDate.value));
        const matchesBorrower = borrow.borrower_name
          .toLowerCase()
          .includes(searchBorrower.value.toLowerCase());
        return matchesDate && matchesBorrower;
      });
    });

    const pdfContent = ref(null);
    const downloadPDF = () => {
      const element = pdfContent.value;
      const opt = {
        margin: 1,
        filename: "Data_Peminjaman.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      if (element) {
        html2pdf().from(element).set(opt).save();
      } else {
        console.error("Elemen PDF tidak ditemukan");
      }
    };

    return {
      borrowingsStore,
      startDate,
      endDate,
      searchBorrower,
      filteredBorrowings,
      pdfContent,
      downloadPDF,
    };
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  text-align: left;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
}
tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
