<template>
  <div class="modal">
    <div class="heading">
      <h1>Willkommen</h1>
    </div>
    <div class="waiter-img">
      <img
        src="/waiter.svg"
        alt="Waiter"
      />
    </div>
  </div>
</template>

<script>
export default {
  transitions: {
    name: 'Welcome-Modal',
    mode: 'out-in',
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

.heading h1 {
  color: var(--primary-burgundy);
  font-size: 46px;
  font-weight: 700;
}

.heading {
  margin-top: 120px;
  margin-bottom: 60px;
}

.Welcome-Modal-enter-active,
.Welcome-Modal-leave-active {
  transition: all 1s ease;
}

.Welcome-Modal-enter,
.Welcome-Modal-leave-to {
  transform: translateY(100%);
}
</style>