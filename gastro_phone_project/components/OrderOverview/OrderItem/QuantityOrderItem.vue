<template>
  <div class="quantity-wrapper" @click="$emit('openEditQuantityPopUp')">
    <p class="quantity">{{ orderItem.quantity }}x</p>
  </div>
</template>

<script>
export default {
  props: {
    orderItem: {
      required: true
    },
    emits: ['openEditQuantityPopUp'],
  },
}
</script>

<style scoped>
.quantity-wrapper {
  width: 39px;
  height: 32px;
  background-color: var(--descr-text-grey);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.quantity {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  position: relative;
  right: 1px;
}
</style>