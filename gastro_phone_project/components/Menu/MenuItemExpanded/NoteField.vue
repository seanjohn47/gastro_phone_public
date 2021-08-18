<template>
<div class="extras-wrapper" @click="$emit('openNoteFieldPopUp')">
  <div class="field-container">
    <p class="label">{{ fieldName }}</p>
    <div class="field">
      <div class="content">
        <div class="content-wrapper" :class="{ placeholder__: note_is_empty }">
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
  emits: ['openNoteFieldPopUp'],
  props: {
    fieldName: {
      required: true
    },
    note: {
      required: true,
    },
  },
  computed: {
    output() {
      if(this.note === '') {
        return 'z. B. "ohne Zwiebel"'
      } else if (this.note.length > 25) {
        return this.note.slice(0, 25) + '...'
      } else {
        return this.note
      }
    },
    note_is_empty() {
      return this.note === ''
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

.placeholder__ {
  color: #b2b2b2;
}

.arrow {
  position: relative;
  top: 2px;
}
</style>