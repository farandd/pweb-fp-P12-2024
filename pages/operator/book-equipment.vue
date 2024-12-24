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

      <!-- Form Peminjaman -->
      <div class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-3xl font-bold text-gray-900">Form Peminjaman</h1>
            </div>
          </div>

          <div class="mt-8">
            <form @submit.prevent="handleSubmit" class="space-y-6 max-w-2xl">
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Nama Barang
                </label>
                <select
                  v-model="form.item_name"
                  required
                  class="mt-1 block w-full h-10 px-4 py-2 rounded-md border-2 border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                >
                  <option value="">Pilih Barang</option>
                  <option
                    v-for="item in itemsStore.items"
                    :key="item.name"
                    :value="item.name"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Jumlah Pinjam
                </label>
                <input
                  v-model="form.amount"
                  type="number"
                  required
                  min="1"
                  class="mt-1 block w-full h-10 px-4 py-2 rounded-md border-2 border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Tanggal Pengembalian
                </label>
                <input
                  v-model="form.return_date"
                  type="date"
                  required
                  class="mt-1 block w-full h-10 px-4 py-2 rounded-md border-2 border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Nama Peminjam
                </label>
                <input
                  v-model="form.borrower_name"
                  type="text"
                  required
                  class="mt-1 block w-full h-10 px-4 py-2 rounded-md border-2 border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Nama Petugas
                </label>
                <select
                  v-model="form.officer_name"
                  required
                  class="mt-1 block w-full h-10 px-4 py-2 rounded-md border-2 border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
                >
                  <option value="">Pilih Petugas</option>
                  <option
                    v-for="operator in operators"
                    :key="operator.username"
                    :value="operator.name"
                  >
                    {{ operator.name }}
                  </option>
                </select>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  class="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 shadow-md"
                >
                  Submit
                </button>
              </div>
            </form>
            <!-- Feedback setelah Submit -->
            <p v-if="submitSuccess" class="text-green-500 mt-4">
              Data berhasil disubmit!
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useItemsStore } from "~/stores/items";
import { useBorrowingsStore } from "~/stores/borrowings";

// Data petugas diambil dari LocalStorage
const operators = ref([]);

// Fungsi untuk memuat data operator dari LocalStorage
const loadOperatorsFromLocalStorage = () => {
  const storedOperators = localStorage.getItem("operators");
  if (storedOperators) {
    operators.value = JSON.parse(storedOperators);
  }
};

const itemsStore = useItemsStore();
const borrowingsStore = useBorrowingsStore();

const form = ref({
  item_name: "",
  amount: "",
  return_date: "",
  borrower_name: "",
  officer_name: "", // Menambahkan field untuk Nama Petugas
});

// Menambahkan feedback untuk submit success
const submitSuccess = ref(false);

// Fungsi untuk menangani submit
const handleSubmit = () => {
  // Menambahkan peminjaman ke store
  borrowingsStore.addBorrowing({
    ...form.value,
    borrow_date: new Date(),
  });

  // Reset form dengan cara reaktif
  form.value = {
    item_name: "",
    amount: "",
    return_date: "",
    borrower_name: "",
    officer_name: "",
  };

  // Menandakan bahwa submit berhasil
  submitSuccess.value = true;

  // Reset feedback setelah beberapa detik
  setTimeout(() => {
    submitSuccess.value = false;
  }, 2000); // Reset setelah 2 detik
};

// Memuat data petugas saat halaman di-mount
onMounted(() => {
  loadOperatorsFromLocalStorage();
});
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}
</style>
