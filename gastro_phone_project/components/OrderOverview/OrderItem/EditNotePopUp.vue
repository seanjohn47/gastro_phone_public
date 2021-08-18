<template>
  <PopUp @closePopUp="$emit('closeEditNotePopUp')" :title="title">
    <template #default>
      <div class="note-field__wrapper">
        <div class="field-container">
          <div class="field">
            <textarea
              @blur="updateNote"
              class="content"
              placeholder='z.B. "ohne Zwiebeln"'
              v-model="noteInput"
              id="noteInput"
              rows="5"
            ></textarea>
          </div>
        </div>
      </div>
    </template>
  </PopUp>
</template>

<script>
import PopUp from '@/components/UI/PopUp'

export default {
  emits: ['closeEditNotePopUp'],
  components: {
    PopUp,
  },
  props: {
    title: {
      required: false,
      default: 'Anmerkung bearbeiten',
    },
    orderItem: {
      required: true,
    },
  },
  data() {
    return {
      noteInput: this.orderItem.note,
    }
  },
  methods: {
    updateNote() {
      const payload = {
        updatedNote: this.noteInput,
        orderItemId: this.orderItem.id,
      }
      this.$store.dispatch('updateNote', payload)
    },
  },
}
</script>

<style scoped>
.note-field__wrapper {
  min-width: 100%;
  display: flex;
  align-items: center;
  padding-right: 15px;
}

.field-container {
  width: 100%;
}

.content {
  font-weight: 600;
  font-size: 18px;
  background-color: var(--main-bg-white);
  border-color: var(--descr-text-grey);
  border-style: solid;
  border-width: 2px;
  border-radius: 8px;
  padding: 12px 12px 12px 12px;
  height: 92px;
  width: 100%;
  resize: none;
  user-select: text;
}

.content:focus {
  outline: none;
  border-width: 3px;
  border-color: rgba(0, 106, 255, 0.7);
}

.label {
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 5px;
}

.hideScrollbar {
  overflow: hidden;
}
</style>