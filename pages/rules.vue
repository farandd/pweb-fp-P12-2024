<template>
  <div class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Aturan & Alur Peminjaman
        </h2>
      </div>

      <div class="mt-10">
        <div class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          <!-- Aturan Peminjaman -->
          <div class="relative">
            <div class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
              <ClipboardDocumentListIcon class="h-6 w-6" aria-hidden="true" />
            </div>
            <p class="ml-16 text-lg font-semibold leading-6 text-gray-900">Aturan Peminjaman</p>
            <div class="mt-2 ml-16 text-base text-gray-500">
              <ul class="list-disc pl-5 space-y-2">
                <li>Peminjaman harus melalui petugas laboratorium</li>
                <li>Maksimal peminjaman 7 hari kerja</li>
                <li>Wajib membawa kartu identitas yang masih berlaku</li>
                <li>Bertanggung jawab atas kondisi barang yang dipinjam</li>
              </ul>
            </div>
          </div>

          <!-- Alur Peminjaman -->
          <div class="relative">
            <div class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
              <ArrowPathIcon class="h-6 w-6" aria-hidden="true" />
            </div>
            <p class="ml-16 text-lg font-semibold leading-6 text-gray-900">Alur Peminjaman</p>
            <div class="mt-2 ml-16 text-base text-gray-500">
              <ol class="list-decimal pl-5 space-y-2">
                <li>Mengisi form peminjaman melalui petugas</li>
                <li>Menyerahkan kartu identitas</li>
                <li>Pengecekan kondisi barang bersama petugas</li>
                <li>Penandatanganan form peminjaman</li>
                <li>Pengembalian sesuai tanggal yang ditentukan</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ClipboardDocumentListIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
</script>