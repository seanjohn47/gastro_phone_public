<template>
  <div @click="addItem" class="add-button">
    <div class="content">Hinzufügen</div>
  </div>
</template>

<script>
export default {
  emits: ['closeMenuItemExpanded'],
  props: {
    itemData_extended: {
      required: true,
    },
  },
  methods: {
    addItem() {
      this.itemData_extended.id = Date.now()
      this.$store.dispatch('addItem', this.itemData_extended)
      this.$emit('closeMenuItemExpanded')
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
.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 40px);
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