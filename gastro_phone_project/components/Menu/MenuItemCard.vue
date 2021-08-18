<template>
  <div @click="$emit('openMenuItemExpanded')" class="item-card">
    <div class="left-side">
      <h2>{{ itemData.name }}</h2>
      <p>{{ itemData.description }}</p>
    </div>
    <div class="right-side">
      <div class="price-badge">{{ itemData.price }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuItemCard',
  emits: ['openMenuItemExpanded'],
  props: {
    itemData: {
      required: true,
    },
  },
  mounted() {
    this.$el.addEventListener('touchstart', () => {
      this.$el.style['box-shadow'] = '0px 1.5px 3px rgba(0, 0, 0, 0.25)'
      this.$el.style['background-color'] = '#f5f5f5'
    })
    this.$el.addEventListener('touchend', () => {
      this.$el.style['box-shadow'] = '0px 3px 6px rgba(0, 0, 0, 0.25)'
      this.$el.style['background-color'] = 'var(--item-bg-white)'
    })
  },
}
</script>

<style scoped>
.item-card {
  display: flex;
  justify-content: space-between;
  min-height: 109px;
  margin: 14px 12px 0px 12px;
  padding: 14px 0px 0px 19px;
  border: solid 1px rgba(0, 0, 0, 0, 0.25);
  border-radius: 20px;
  background-color: var(--item-bg-white);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
}

.item-card:first-of-type {
  margin-top: 0px;
}

.right-side {
  min-width: 77px;
  position: relative;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

.left-side {
  padding-right: 2px;
  padding-bottom: 30px;
}

h2 {
  color: var(--main-text-blue);
  margin-bottom: 6px;
}

p {
  font-weight: 500;
  font-size: 16px;
  color: var(--descr-text-grey);
}

.price-badge {
  font-weight: 500;
  font-size: 16px;
  color: #fafafa;
  background-color: var(--primary-burgundy);
  padding: 6px 0px;
  text-align: center;
  height: 30px;
  border-radius: 20px 0px 20px 0px;
  position: relative;
  top: calc(100% - 30px);
}
</style>