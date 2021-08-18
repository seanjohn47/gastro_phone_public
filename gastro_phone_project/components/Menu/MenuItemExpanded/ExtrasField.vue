<template>
<div class="extras-wrapper" @click="$emit('openExtrasFieldPopUp')">
  <div class="field-container">
    <p class="label">{{ fieldName }}</p>
    <div class="field">
      <div class="content">
        <div class="content-wrapper">
          {{ output }}
        </div>
      </div>
      <div class="arrow"><img src="/arrow.svg" alt=""></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  emits: ['openExtrasFieldPopUp'],
  props: {
    fieldName: {
      required: true
    },
    extras: {
      required: true,
      type: Array
    },
  },
  computed: {
    output() {
      let total_price = 0
      let count = 0
      for (let extra of this.extras) {
        if (extra.selected) {
          ++count
          total_price += parseFloat(extra.price.slice(0, -2).replace(',', '.'))
        }
      }
      let mehrzahl = (count > 1) ? 's' : ''
      let output = ''
      if(count > 0) {
        total_price = total_price.toFixed(2).toString().replace('.', ',')
        output = `${count}x Extra${mehrzahl} gewählt: ${total_price} €`
      } else {
        output = 'kein Extra gewählt'
      }
      return output
    }
  },
}
</script>

<style scoped>
.extras-wrapper {
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-snap-align: start;
  color: var(--descr-text-grey);

}

.field-container {
  margin-bottom: 20px;
  width: calc(100% - 10px);
}

.field {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  border-color: var(--descr-text-grey);
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
  padding: 0px 15px 0px 12px;
  height: 46px;
  width: 100%;
}

.label {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 5px;
}

.content-wrapper {
  font-weight: 600;
  font-size: 18px;
  color: var(--details-text-lightGrey);
}

.arrow {
  position: relative;
  top: 2px;
}
</style>