<template>
  <div class="modal">
    <div class="close-btn">
      <img
        src="/close_btn.svg"
        alt="Close Button"
        @click="$emit('closeOrderOverview')"
      />
    </div>
    <div class="heading">
      <h1>Bestellung</h1>
    </div>
    <div class="order-items__container">
      <OrderItem
        v-for="orderItem in $store.getters.orderList"
        :key="orderItem.id"
        :orderItem="orderItem"
        @openEditQuantityPopUp="openEditQuantityPopUp"
        @openEditNotePopUp="openEditNotePopUp"
      />
    </div>
    <div class="total-order__placeholder"></div>
    <div class="total-order__container">
      <OrderTotal />
      <OrderButton @commitOrder="commitOrder" />
    </div>
    <transition name="PopUp" mode="out-in">
      <EditQuantityPopUp
        :orderItem="orderItem"
        v-if="showEditQuantityPopUp"
        @closeEditQuantityPopUp="closeEditQuantityPopUp"
      />
    </transition>
    <transition name="PopUp" mode="out-in">
      <EditNotePopUp
        :orderItem="orderItem"
        v-if="showEditNotePopUp"
        @closeEditNotePopUp="closeEditNotePopUp"
      />
    </transition>
    <transition name="OrderSuccess-Modal" mode="out-in">
      <OrderSuccess 
      v-if="showOrderSuccess" 
      @closeOrderSuccess="closeOrderSuccess"
      />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OrderTotal from '@/components/OrderOverview/OrderTotal'
import OrderButton from '@/components/OrderOverview/OrderButton'
import OrderItem from '@/components/OrderOverview/OrderItem/OrderItem'
import EditQuantityPopUp from '@/components/OrderOverview/OrderItem/EditQuantityPopUp'
import EditNotePopUp from '@/components/OrderOverview/OrderItem/EditNotePopUp'
import OrderSuccess from '@/components/OrderOverview/OrderSuccess'

export default {
  components: {
    OrderTotal,
    OrderButton,
    OrderItem,
    EditQuantityPopUp,
    EditNotePopUp,
    OrderSuccess,
  },
  emits: ['closeOrderOverview'],
  transitions: {
    name: 'Modal',
    mode: 'out-in',
  },
  data() {
    return {
      showEditQuantityPopUp: false,
      showEditNotePopUp: false,
      orderItem: null,
      showOrderSuccess: false,
    }
  },
  computed: {
    ...mapGetters(['orderList']),
  },
  watch: {
    orderList() {
      if (this.orderList.length === 0) {
        this.$emit('closeOrderOverview')
      }
    },
  },
  mounted() {
    document.querySelector('body').style.overflow = 'hidden'
  },
  destroyed() {
    document.querySelector('body').style.overflow = 'auto'
  },
  methods: {
    closeEditQuantityPopUp() {
      this.showEditQuantityPopUp = false
    },
    openEditQuantityPopUp(orderItem) {
      this.orderItem = orderItem
      this.showEditQuantityPopUp = true
    },
    closeEditNotePopUp() {
      this.showEditNotePopUp = false
    },
    openEditNotePopUp(orderItem) {
      this.orderItem = orderItem
      this.showEditNotePopUp = true
    },
    commitOrder() {
      this.showOrderSuccess = true
      // setTimeout(() => {
      //   this.showOrderSuccess = false
      //   this.$store.dispatch('clearOrderList')
      // }, 6000)
    },
    closeOrderSuccess() {
      this.showOrderSuccess = false
      this.$store.dispatch('clearOrderList')
    },
  },
}
</script>

<style scoped>
.modal {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  padding: 10px 5px 20px 20px;
  background-color: var(--main-bg-white);
  z-index: 10;
}

.close-btn {
  margin-bottom: 15px;
  flex-shrink: 0;
  padding-right: 15px;
}

.heading {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  flex-shrink: 0;
  padding-right: 15px;
}

.order-items__container {
  width: 100%;
  overflow: auto;
  padding-right: 15px;
}

.order-items__container::-webkit-scrollbar {
  width: 5px;
}

.order-items__container::-webkit-scrollbar-track {
  background-color: #d9d9d9;
  border-radius: 8px;
}

.order-items__container::-webkit-scrollbar-thumb {
  background-color: #999;
  border-radius: 8px;
}

.order-items__container {
  overflow-x: hidden;
}

.total-order__placeholder {
  margin-top: 60px;
  flex-shrink: 0;
  height: 128px;
  padding-right: 15px;
}

.total-order__container {
  margin-top: 56px;
  position: absolute;
  bottom: 20px;
  padding-right: 15px;
}

.Modal-enter-active,
.Modal-leave-active {
  transition: all 0.5s ease;
}

.Modal-enter,
.Modal-leave-to {
  transform: translateY(100%);
}
</style>