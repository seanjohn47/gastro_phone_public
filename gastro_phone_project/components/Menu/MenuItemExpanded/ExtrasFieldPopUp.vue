<template>
  <PopUp @closePopUp="$emit('closeExtrasFieldPopUp')" :title="title">
    <template #default>
      <div
        class="form-control-container"
        v-bind:class="{ hideScrollbar: hideScrollbar }"
      >
        <div
          class="form-element-wrapper"
          v-for="extra in extras"
          :key="extra.name"
        >
          <label class="form-element" :for="extra.name">
            <input
              :id="extra.name"
              name="selected"
              type="checkbox"
              :value="extra.name"
              v-model="selected"
              @change="emitExtraSelected(extra.name)"
            />
            {{ extra.name }}<span v-if="extra.price !== ''">: </span>
            {{ extra.price }}
            <span class="checkmark"></span>
          </label>
          <div
            class="info-btn"
            @click="openInfoPopUp(extra.infos)"
            v-if="extra.infos.length > 0"
          >
            <img src="/info_btn.svg" alt="Info Button" />
          </div>
        </div>
      </div>
      <transition name="PopUp" mode="out-in">
        <InfoPopUp
          v-if="showInfoPopUp"
          @closeInfoPopUp="closeInfoPopUp"
          :allergene="infosToShow"
        />
      </transition>
    </template>
  </PopUp>
</template>

<script>
import PopUp from '@/components/UI/PopUp'
import InfoPopUp from '@/components/Menu/MenuItemExpanded/InfoPopUp'

export default {
  emits: ['closeExtrasFieldPopUp'],
  components: {
    PopUp,
    InfoPopUp,
  },
  emits: ['extra_selected'],
  props: {
    title: {
      required: true,
    },
    extras: {
      required: true,
    },
  },
  data() {
    return {
      selected: [],
      showInfoPopUp: false,
      infosToShow: [],
      hideScrollbar: false,
    }
  },
  created() {
    for (let extra of this.extras) {
      if (extra.selected) {
        this.selected.push(extra.name)
      }
    }
  },
  methods: {
    emitExtraSelected(extra_name) {
      this.$emit('extra_selected', extra_name, this.title)
    },
    openInfoPopUp(infos) {
      this.hideScrollbar = true
      this.infosToShow = infos
      this.showInfoPopUp = true
    },
    closeInfoPopUp() {
      this.hideScrollbar = false
      this.showInfoPopUp = false
    },
  },
}
</script>

<style scoped>
.form-control-container {
  height: 110px;
  width: 100%;
  overflow: auto;
}

.form-control-container::-webkit-scrollbar {
  width: 5px;
}

.form-control-container::-webkit-scrollbar-thumb {
  background-color: #999;
  border-radius: 8px;
}

.form-control-container::-webkit-scrollbar-track {
  background-color: #d9d9d9;
  border-radius: 8px;
}

.form-control-container {
  overflow-x: hidden;
}

.form-element-wrapper {
  margin-bottom: 18px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding-right: 15px;
}

.form-element-wrapper:last-of-type {
  margin-bottom: 0px;
}

label {
  width: 100%;
  font-weight: 600;
  font-size: 18px;
  color: var(--descr-text-grey);
}

.form-element {
  position: relative;
  padding-left: 43px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.form-element input {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 27px;
  width: 27px;
  background-color: var(--main-bg-white);
  border-style: solid;
  border-color: var(--descr-text-grey);
  border-width: 3px;
}

.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

.form-element input:checked ~ .checkmark:after {
  display: block;
}

.form-element .checkmark:after {
  top: 2px;
  left: 6px;
  width: 10px;
  height: 16px;
  border: solid;
  border-width: 0px 3px 3px 0;
  border-color: var(--descr-text-grey);
  transform: rotate(45deg);
}

.info-btn {
  position: relative;
  top: 1px;
}

.hideScrollbar {
  overflow: hidden;
}
</style>