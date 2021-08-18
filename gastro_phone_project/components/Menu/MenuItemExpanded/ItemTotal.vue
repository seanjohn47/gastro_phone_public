<template>
  <div class="container">{{ total }}</div>
</template>

<script>
export default {
  emits: ['updateTotal'],
  props: {
    itemData_extended: {
      required: true
    },
  },
  computed: {
    total() {
      let total = 0.0
      // price
      total = parseFloat(this.itemData_extended.price.slice(0, -2).replace(',', '.'))
      // price has to be the selected one, in case of different sizes and similar cases
      for (let variation of this.itemData_extended.variations) {
        for (let option of variation.options) {
          if (option.selected && option.price) {
            if (variation.fieldName === 'Größe') {
              total = parseFloat(option.price.slice(0, -2).replace(',', '.'))
            }
          }
        }
      }
      // variations
      for (let variation of this.itemData_extended.variations) {
        for (let option of variation.options) {
          if (option.selected && option.price && variation.fieldName != 'Größe') {
            total += parseFloat(option.price.slice(0, -2).replace(',', '.'))
            if (variation.fieldName === 'Größe') {

            }
          }
        }
      }
      // extras
      for (let extra of this.itemData_extended.extras) {
        if (extra.selected && extra.price) {
          total += parseFloat(extra.price.slice(0, -2).replace(',', '.'))
        }
      }
      // quantity
      total *= this.itemData_extended.quantity
      // transform to euro style
      total = total.toFixed(2).toString()
      total = total.replace('.', ',') + ' €'

      this.$emit('updateTotal', total)
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