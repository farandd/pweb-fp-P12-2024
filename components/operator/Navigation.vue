<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex space-x-8 h-16 items-center">
        <NuxtLink
          to="/operator/book-equipment"
          class="text-gray-900 hover:text-gray-500 px-3 py-2 text-sm font-medium"
          :class="{ 'border-b-2 border-indigo-500': $route.path === '/operator/book-equipment' }"
        >
          Form Peminjaman
        </NuxtLink>
        <NuxtLink
          to="/operator/equipment"
          class="text-gray-900 hover:text-gray-500 px-3 py-2 text-sm font-medium"
          :class="{ 'border-b-2 border-indigo-500': $route.path === '/operator/equipment' }"
        >
          Data Barang
        </NuxtLink>
        <NuxtLink
          to="/operator/borrowers"
          class="text-gray-900 hover:text-gray-500 px-3 py-2 text-sm font-medium"
          :class="{ 'border-b-2 border-indigo-500': $route.path === '/operator/borrowers' }"
        >
          Data Peminjam
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>