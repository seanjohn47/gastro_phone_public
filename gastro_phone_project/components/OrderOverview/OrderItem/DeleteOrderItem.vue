<template>
  <div class="trash-btn" @click="deleteOrderItem">
    <img
      src="/trash.svg"
      alt="Trash Button"
      @click="$emit('deleteOrderItem')"
    />
  </div>
</template>

<script>
export default {
  emits: ['deleteOrderItem'],
  props: {
    orderItemId: {
      required: true,
    },
  },
  methods: {
    deleteOrderItem() {
      this.$store.dispatch('deleteOrderItem', this.orderItemId)
    }
  },
}
</script>
