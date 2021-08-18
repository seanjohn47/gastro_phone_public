<template>
  <div id="badge" class="badge" @click="$emit('openOrderOverview')">
    <div class="container">
      <div class="icon-container">
        <div class="img_wrapper">
          <img src="/order_board.svg" alt="order board" />
        </div>
        <div class="num_of_orders">{{ num_of_orders }}</div>
      </div>
      <div class="label-price__wrapper">Bestellung ({{ total }})</div>
    </div>
  </div>
</template>

<script>
export default {
  transitions: {
    name: 'OrderBadge',
    mode: 'out-in',
  },
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
    num_of_orders() {
      return this.$store.getters.orderList.length
    },
  },
  mounted() {
    this.$el.addEventListener('touchstart', (e) => {
      this.$el.style['background-color'] = '#59001a'
    })
    this.$el.addEventListener('touchend', (e) => {
      this.$el.style['background-color'] = 'var(--primary-burgundy)'
    })
  },
}
</script>

<style scoped>
.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
  background-color: var(--primary-burgundy);
  position: fixed;
  top: calc(100% - 70px);
}

.icon-container {
  display: flex;
  position: absolute;
  left: 13px;
  top: 18px;
}

.num_of_orders {
  position: absolute;
  top: calc(100% - 15px);
  left: calc(100% - 11px);
  height: 22px;
  width: 22px;
  font-weight: 700;
  font-size: 13px;
  background-color: var(--main-text-blue);
  color: #fff;
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.label-price__wrapper {
  font-weight: 700;
  font-size: 20px;
  color: #fff;
  align-self: center;
}

.OrderBadge-enter-active,
.OrderBadge-leave-active {
  transition: opacity 2s ease;
}

.OrderBadge-enter,
.OrderBadge-leave-to {
  opacity: 0;
}

.hide {
  visibility: hidden;
}
</style>

