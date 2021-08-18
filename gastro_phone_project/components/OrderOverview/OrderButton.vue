<template>
  <div @click="commitOrder" class="order-button">
    <div class="content">Bestellung abgeben</div>
  </div>
</template>

<script>
export default {
  emits: ['commitOrder'],
  methods: {
    commitOrder() {
      this.$emit('commitOrder')
    },
  },
  mounted() {
    this.$el.addEventListener('touchstart', () => {
      this.$el.style['background-color'] = '#59001a'
    })
    this.$el.addEventListener('touchend', () => {
      this.$el.style['background-color'] = 'var(--primary-burgundy)'
    })
  },
}
</script>

<style scoped>
.order-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 335px;
  height: 70px;
  background-color: var(--primary-burgundy);
  border-radius: 80px;
  margin-top: 20px;
}

.content {
  color: #fff;
  font-weight: 700;
  font-size: 22px;
}
</style>