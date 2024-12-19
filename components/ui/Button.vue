<template>
  <button
    :class="[
      'inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium shadow-sm',
      variant === 'primary' && 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700',
      variant === 'secondary' && 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50',
      variant === 'danger' && 'border-transparent text-white bg-red-600 hover:bg-red-700',
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}>();
</script>