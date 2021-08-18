<template>
<div class="field-wrapper" @click="$emit('openVariationsFieldPopUp')">
  <div class="field-container">
    <p class="label">{{ fieldName }}</p>
    <div class="field">
      <div class="content" v-for="option in options" :key="option.name" v-if="option.selected">
        <div class="content-wrapper">
          {{ option.name }}<span v-if="option.price !== ''">: </span> {{ option.price }}
        </div>
      </div>
      <div class="arrow"><img src="/arrow.svg" alt=""></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  emits: ['openVariationsFieldPopUp'],
  props: {
    fieldName: {
      required: true
    },
    options: {
      required: true,
      type: Array
    },
  },
}
</script>

<style scoped>
.field-wrapper {
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