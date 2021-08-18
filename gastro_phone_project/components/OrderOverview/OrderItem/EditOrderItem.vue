<template>
  <div class="edit-btn">
    <img src="/pen.svg" alt="Edit Button" @click="$emit('openEditNotePopUp')" />
  </div>
</template>

<script>
export default {
  emits: ['openEditNotePopUp'],
  props: {
    orderItem: {
      required: true
    },
  },
}
</script>

<style scoped>
.edit-btn {
  margin: 0px 20px;
}
</style>