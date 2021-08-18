<template>
  <div class="qty-field__container">
    <div class="minus-operator" @click="minus">
      <img src="/minus.svg" alt="minus">
    </div>
    <div class="quantity">{{ quantity }}</div>
    <div @click="plus">
      <img src="/plus.svg" alt="plus">
    </div>
  </div>
</template>

<script>
export default {
  emits: ['updateQuantity'],
  data() {
    return {
      quantity: 1
    }
  },
  methods: {
    minus() {
      if (this.quantity > 1) {
        this.quantity -= 1
      }
    },
    plus() {
      this.quantity += 1
    },
  },
  watch: {
    quantity() {
      this.$emit('updateQuantity', this.quantity)
    }
  },
}
</script>

<style scoped>
.qty-field__container {
  position: relative;
  width: 143px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-color: var(--descr-text-grey);
  border-style: solid;
  border-width: 2px;
  border-radius: 2px;
  padding: 15px;
  color: var(--descr-text-grey);
}

.quantity {
  font-weight: 600;
  font-size: 18px;
}

.minus-operator {
  position: relative;
  bottom: 4px;
}
</style>