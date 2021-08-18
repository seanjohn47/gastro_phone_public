<template>
  <div class="order-success__modal">
    <div class="checkmark-img">
      <img src="/checkmark.svg" alt="Checkmark" />
    </div>
    <div class="heading">
      <h1>Danke für Ihre Bestellung</h1>
    </div>
    <div class="sub-heading">
      <h2>Wir machen uns gleich ans Werk</h2>
    </div>
    <div class="cookin-img">
      <img src="/cookin.svg" alt="Cookin" />
    </div>
    <div @click="$emit('closeOrderSuccess')" class="close-button">
      Schließen
    </div>
  </div>
</template>

<script>
export default {
  transitions: {
    name: 'OrderSuccess-Modal',
    mode: 'out-in',
  },
  mounted() {
    this.$el
      .querySelector('.close-button')
      .addEventListener('touchstart', (e) => {
        e.target.style['background-color'] = 'var(--primary-burgundy)'
        e.target.style['color'] = '#fff'
      })
    this.$el
      .querySelector('.close-button')
      .addEventListener('touchend', (e) => {
        e.target.style['background-color'] = 'var(--main-bg-white)'
        e.target.style['color'] = 'var(--primary-burgundy)'
      })
  },
}
</script>

<style scoped>
.order-success__modal {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
  left: 0;
  height: 100%;
  width: 100vw;
  padding: 10px 20px 20px 20px;
  background-color: var(--main-bg-white);
  z-index: 10;
}

.checkmark-img {
  margin-top: 40px;
  margin-bottom: 30px;
}

.heading h1 {
  color: var(--descr-text-grey);
  font-size: 22px;
  font-weight: 700;
}

.heading {
  margin-bottom: 10px;
}

.sub-heading h2 {
  color: var(--descr-text-grey);
  font-size: 16px;
  font-weight: 500;
}

.sub-heading {
  margin-bottom: 80px;
}

.OrderSuccess-Modal-enter-active,
.OrderSuccess-Modal-leave-active {
  transition: all 0.5s ease;
}

.OrderSuccess-Modal-enter,
.OrderSuccess-Modal-leave-to {
  transform: translateY(100%);
}

.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 40px);
  height: 70px;
  background-color: var(--main-bg-white);
  border: 4px solid var(--primary-burgundy);
  border-radius: 80px;
  margin-top: 20px;
  position: absolute;
  bottom: 20px;
  color: var(--primary-burgundy);
  font-weight: 700;
  font-size: 22px;
}
</style>