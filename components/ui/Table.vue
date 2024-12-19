<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
          >
            <div class="flex items-center gap-2 cursor-pointer" @click="sort(column.key)">
              {{ column.label }}
              <span v-if="sortKey === column.key" class="text-xs">
                {{ sortOrder === 'asc' ? '↑' : '↓' }}
              </span>
            </div>
          </th>
          <th v-if="actions" class="py-3.5 px-3 text-right text-sm font-semibold text-gray-900">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="item in sortedItems" :key="item.id">
          <td
            v-for="column in columns"
            :key="column.key"
            class="whitespace-nowrap py-4 px-3 text-sm text-gray-500"
          >
            {{ item[column.key] }}
          </td>
          <td v-if="actions" class="whitespace-nowrap py-4 px-3 text-sm text-right">
            <slot name="actions" :item="item"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: any[];
  columns: { key: string; label: string }[];
  actions?: boolean;
}>();

const sortKey = ref('');
const sortOrder = ref<'asc' | 'desc'>('asc');

const sort = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};

const sortedItems = computed(() => {
  if (!sortKey.value) return props.items;

  return [...props.items].sort((a, b) => {
    const aVal = a[sortKey.value];
    const bVal = b[sortKey.value];
    
    if (sortOrder.value === 'asc') {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });
});
</script>