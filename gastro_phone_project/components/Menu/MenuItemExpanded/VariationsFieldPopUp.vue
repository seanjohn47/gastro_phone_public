<template>
  <PopUp @closePopUp="$emit('closeVariationsFieldPopUp')" :title="title">
    <template #default>
      <div
        class="form-control-container"
        v-bind:class="{ hideScrollbar: hideScrollbar }"
      >
        <div
          class="form-element-wrapper"
          v-for="variation in variations"
          :key="variation.name"
        >
          <label class="form-element" :for="variation.name">
            <input
              :id="variation.name"
              name="selected"
              type="radio"
              :value="variation.name"
              v-model="selected"
              @change="emitVariationSelected(variation.name)"
            />
            {{ variation.name }}<span v-if="variation.price !== ''">: </span>
            {{ variation.price }}
            <span class="checkmark"></span>
          </label>
          <div
            class="info-btn"
            @click="openInfoPopUp(variation.infos)"
            v-if="variation.infos.length > 0"
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
  emits: ['closeVariationsFieldPopUp'],
  components: {
    PopUp,
    InfoPopUp,
  },
  emits: ['variation_selected'],
  props: {
    title: {
      required: true,
    },
    variations: {
      required: true,
    },
  },
  data() {
    return {
      selected: null,
      showInfoPopUp: false,
      infosToShow: [],
      hideScrollbar: false,
    }
  },
  created() {
    for (let variation of this.variations) {
      if (variation.selected) {
        this.selected = variation.name
      }
    }
  },
  methods: {
    emitVariationSelected(variation_name) {
      this.$emit('variation_selected', variation_name, this.title)
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
  height: 29px;
  width: 29px;
  background-color: var(--main-bg-white);
  border-radius: 50%;
  border-style: solid;
  border-color: var(--descr-text-grey);
  border-width: 2px;
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
  top: 4px;
  left: 4px;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: var(--descr-text-grey);
}

.info-btn {
  position: relative;
  top: 1px;
}

.hideScrollbar {
  overflow: hidden;
}
</style>