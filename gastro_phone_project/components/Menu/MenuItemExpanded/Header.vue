<template>
<section class="header-wrapper-flexbox">
  <div class="header-flexbox">
    <div class="heading-flexbox">
      <h1>{{ name }}</h1>
      <div class="info-btn" @click="$emit('openInfoPopUp')">
        <img src="/info_btn.svg" alt="Info Button">
      </div>
    </div>
    <p class="description">{{ description }}</p>
  </div>
</section>
</template>

<script>
export default {
  name: 'Header',
  emits: ['openInfoPopUp'],
  props: {
    name: {
      required: true,
    },
    description: {
      required: true,
    },
  },
}
</script>

<style scoped>
.header-wrapper-flexbox {
  display: flex;
  position: relative;
}

.header-flexbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.heading-flexbox {
  display: flex;
  align-items: baseline;
  position: relative;
  margin-bottom: 8px;
}

h1 {
  text-align: center;
}

.info-btn {
  position: relative;
  left: 8px;
  top: 1px; 
}

.description {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  text-align: center;
  position: relative;
  left: -9px;
}
</style>