<template>
  <PopUp @closePopUp="$emit('closeEditQuantityPopUp')" :title="title">
    <template #default>
      <div class="quantity-popup__container">
        <div class="operator" @click="minus">
          <img src="/big_minus.svg" alt="minus" />
        </div>
        <div class="quantity-wrapper">
          <p class="quantity">{{ quantity }}x</p>
        </div>
        <div class="operator" @click="plus">
          <img src="/big_plus.svg" alt="plus" />
        </div>
      </div>
    </template>
  </PopUp>
</template>

<script>
import PopUp from '@/components/UI/PopUp'

export default {
  emits: ['closeEditQuantityPopUp'],
  components: {
    PopUp,
  },
  props: {
    title: {
      required: false,
      default: '',
    },
    orderItem: {
      required: true,
    },
  },
  data() {
    return {
      quantity: parseInt(this.orderItem.quantity),
    }
  },
  methods: {
    plus() {
      this.quantity += 1
      const payload = {
        updatedQuantity: this.quantity.toString(),
        orderItemId: this.orderItem.id,
      }
      this.$store.dispatch('updateQuantity', payload)
    },
    minus() {
      if (this.quantity > 1) {
        this.quantity -= 1
        const payload = {
          updatedQuantity: this.quantity.toString(),
          orderItemId: this.orderItem.id,
        }
        this.$store.dispatch('updateQuantity', payload)
      }
    },
  },
}
</script>

<style scoped>
.quantity-popup__container {
  width: 100%;
  height: 100%;
  padding-right: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.operator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  width: 77px;
  border: 2px solid #000;
  border-radius: 14px;
}

.operator:first-of-type img {
  position: relative;
  top: 2px;
}

.quantity-wrapper {
  width: 60px;
  height: 50px;
  background-color: var(--descr-text-grey);
  border-radius: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.quantity {
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  position: relative;
  right: 1px;
}
</style>