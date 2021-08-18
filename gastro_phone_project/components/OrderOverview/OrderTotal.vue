<template>
  <div class="container">{{ total }}</div>
</template>

<script>
export default {
  computed: {
    total() {
      let total = 0.0
      for (let order of this.$store.getters.orderList) {
        total += parseFloat(order.total.slice(0, -2).replace(',', '.'))
      }
      total = total.toFixed(2).toString()
      total = total.replace('.', ',') + ' €'

      return total
    },
  },
}
</script>

<style scoped>
.container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 33px;
  color: var(--primary-burgundy);
}
</style>