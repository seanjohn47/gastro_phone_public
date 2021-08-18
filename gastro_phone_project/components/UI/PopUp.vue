<template>
  <div class="popup__container">
    <div class="backdrop" @click="$emit('closePopUp')"></div>
    <div class="pop-up">
      <div class="content">
        <div v-if="title" class="heading">{{ title }}</div>
        <slot></slot>
      </div>
      <div class="action">
        <slot name="action">
          <div class="default-action" @click="$emit('closePopUp')">
            <div class="action-text">Schließen</div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['closePopUp'],
  transitions: {
    name: 'PopUp',
    mode: 'out-in',
  },
  props: {
    title: {
      required: true,
    },
  },
}
</script>

<style scoped>
.popup__container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 11;
}

.pop-up {
  height: 272px;
  width: 335px;
  position: relative;
  bottom: 90px;
  border-radius: 8px;
  background-color: var(--main-bg-white);
  z-index: 11;
}

.content {
  height: 212px;
  width: 100%;
  padding: 20px 5px 0px 20px;
}

.heading {
  font-weight: 700;
  font-size: 23px;
  margin-bottom: 24px;
  color: var(--main-text-blue);
}

.action {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  border-top-style: solid;
  border-top-color: #999;
  border-top-width: 2px;
}

.default-action {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.action-text {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-burgundy);
}

.PopUp-enter-active,
.PopUp-leave-active {
  transition: opacity 0.3s ease;
}

.PopUp-enter,
.PopUp-leave-to {
  opacity: 0;
}
</style>