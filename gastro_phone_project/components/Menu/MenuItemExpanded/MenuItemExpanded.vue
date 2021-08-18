<template>
  <div class="modal">
    <div class="close-btn">
      <img
        src="/close_btn.svg"
        alt="Close Button"
        @click="$emit('closeMenuItemExpanded')"
      />
    </div>
    <div class="close-btn__spacer"></div>
    <Header
      :name="itemData_extended.name"
      :description="itemData_extended.description"
      @openInfoPopUp="openInfoPopUp"
    />
    <div class="header__spacer"></div>
    <div class="slider">
      <div class="field-container" :class="{ hideScrollbar: hideScrollbar }">
        <VariationsField
          v-for="variations in itemData_extended.variations"
          :key="variations.fieldName"
          :fieldName="variations.fieldName"
          :options="variations.options"
          @openVariationsFieldPopUp="openVariationsFieldPopUp(variations)"
        />
        <ExtrasField
          v-if="itemData_extended.extras.length > 0"
          :fieldName="'Extras'"
          :extras="itemData_extended.extras"
          @openExtrasFieldPopUp="openExtrasFieldPopUp(itemData_extended.extras)"
        />
        <NoteField
          :fieldName="'Anmerkung'"
          :note="itemData_extended.note"
          @openNoteFieldPopUp="openNoteFieldPopUp(itemData_extended.note)"
        />
      </div>
    </div>
    <div class="slider__spacer"></div>
    <div class="swipe-icon" v-if="showSwipeIcon">
      <img src="/swipe_icon.svg" alt="swipe" />
    </div>
    <QuantityField @updateQuantity="updateQuantity" />
    <div class="total-add__spacer"></div>
    <div class="total-add__placeholder"></div>
    <div class="total-add__container">
      <ItemTotal
        @updateTotal="updateTotal"
        :itemData_extended="itemData_extended"
      />
      <AddButton
        @closeMenuItemExpanded="$emit('closeMenuItemExpanded')"
        :itemData_extended="itemData_extended"
      />
    </div>
    <transition name="PopUp" mode="out-in">
      <InfoPopUp
        v-if="showInfoPopUp"
        @closeInfoPopUp="closeInfoPopUp"
        :allergene="itemData_extended.infos"
      />
    </transition>
    <transition name="PopUp" mode="out-in">
      <VariationsFieldPopUp
        v-if="showVariationsFieldPopUp"
        @closeVariationsFieldPopUp="closeVariationsFieldPopUp"
        @variation_selected="updateSelectedOption"
        :title="variationsTitle"
        :variations="variations"
      />
    </transition>
    <transition name="PopUp" mode="out-in">
      <ExtrasFieldPopUp
        v-if="showExtrasFieldPopUp"
        @closeExtrasFieldPopUp="closeExtrasFieldPopUp"
        @extra_selected="updateSelectedExtra"
        :title="extrasTitle"
        :extras="extras"
      />
    </transition>
    <transition name="PopUp" mode="out-in">
      <NoteFieldPopUp
        v-if="showNoteFieldPopUp"
        @closeNoteFieldPopUp="closeNoteFieldPopUp"
        @updateNote="updateNote"
        :title="'Anmerkung'"
        :note="itemData_extended.note"
      />
    </transition>
  </div>
</template>

<script>
import Header from '@/components/Menu/MenuItemExpanded/Header'
import VariationsField from '@/components/Menu/MenuItemExpanded/VariationsField'
import ExtrasField from '@/components/Menu/MenuItemExpanded/ExtrasField'
import NoteField from '@/components/Menu/MenuItemExpanded/NoteField'
import QuantityField from '@/components/Menu/MenuItemExpanded/QuantityField'
import ItemTotal from '@/components/Menu/MenuItemExpanded/ItemTotal'
import AddButton from '@/components/Menu/MenuItemExpanded/AddButton'
import InfoPopUp from '@/components/Menu/MenuItemExpanded/InfoPopUp'
import VariationsFieldPopUp from '@/components/Menu/MenuItemExpanded/VariationsFieldPopUp'
import ExtrasFieldPopUp from '@/components/Menu/MenuItemExpanded/ExtrasFieldPopUp'
import NoteFieldPopUp from '@/components/Menu/MenuItemExpanded/NoteFieldPopUp'

export default {
  components: {
    Header,
    VariationsField,
    ExtrasField,
    NoteField,
    QuantityField,
    ItemTotal,
    AddButton,
    InfoPopUp,
    VariationsFieldPopUp,
    ExtrasFieldPopUp,
    NoteFieldPopUp,
  },
  name: 'ItemExpanded',
  emits: ['closeMenuItemExpanded'],
  props: {
    itemData: {
      required: true,
    },
  },
  transitions: {
    name: 'Modal',
    mode: 'out-in',
  },
  computed: {
    showSwipeIcon() {
      if (
        (this.itemData.variations && this.itemData.variations.length >= 1) ||
        (this.itemData.extras && this.itemData.extras.length >= 1) ||
        (this.itemData.variations && this.itemData.extras)
      ) {
        return true
      } else {
        return false
      }
    },
  },
  data() {
    return {
      showInfoPopUp: false,
      showVariationsFieldPopUp: false,
      showExtrasFieldPopUp: false,
      showNoteFieldPopUp: false,
      variations: [],
      variationsTitle: '',
      extras: [],
      extrasTitle: '',
      itemData_extended: {},
      hideScrollbar: false,
    }
  },
  created() {
    // copy data and extend it with additional properties (quantity, total, note and
    // selected in variations and extras)
    let itemRestructured = {}
    itemRestructured.description = this.itemData.description
      ? this.itemData.description
      : ''
    itemRestructured.name = this.itemData.name ? this.itemData.name : ''
    itemRestructured.price = this.itemData.price ? this.itemData.price : ''
    itemRestructured.note = ''
    itemRestructured.quantity = '1'
    itemRestructured.total = '0'
    // copy infos
    itemRestructured.infos = []
    if (this.itemData.infos) {
      for (let info of this.itemData.infos) {
        itemRestructured.infos.push(info)
      }
    }
    // copy variations and add new property selected
    itemRestructured.variations = []
    if (this.itemData.variations) {
      for (let variation of this.itemData.variations) {
        let tmpVariation = {
          fieldName: '',
          options: [],
        }
        tmpVariation.fieldName = variation.fieldName
        for (let option of variation.options) {
          let tmpInfos = []
          if (option.infos) {
            for (let info of option.infos) {
              tmpInfos.push(info)
            }
          }
          tmpVariation.options.push({
            name: option.name,
            price: option.price,
            infos: tmpInfos,
            selected: false,
          })
        }
        if (tmpVariation.options) {
          tmpVariation.options[0].selected = true
        }
        itemRestructured.variations.push(tmpVariation)
      }
    }
    // copy extras and add new property selected
    itemRestructured.extras = []
    if (this.itemData.extras) {
      for (let extra of this.itemData.extras) {
        let tmpExtra = {
          name: '',
          price: '',
          infos: [],
          selected: false,
        }
        tmpExtra.name = extra.name
        tmpExtra.price = extra.price
        if (extra.infos) {
          for (let info of extra.infos) {
            tmpExtra.infos.push(info)
          }
        }
        itemRestructured.extras.push(tmpExtra)
      }
    }

    this.itemData_extended = itemRestructured
  },
  mounted() {
    document.querySelector('body').style.overflow = 'hidden'
  },
  destroyed() {
    document.querySelector('body').style.overflow = 'auto'
  },
  methods: {
    openInfoPopUp() {
      this.hideScrollbar = true
      this.showInfoPopUp = true
    },
    closeInfoPopUp() {
      this.hideScrollbar = false
      this.showInfoPopUp = false
    },
    openVariationsFieldPopUp(variations) {
      this.hideScrollbar = true
      this.variations = variations.options
      this.variationsTitle = variations.fieldName
      this.showVariationsFieldPopUp = true
    },
    closeVariationsFieldPopUp() {
      this.hideScrollbar = false
      this.showVariationsFieldPopUp = false
    },
    openExtrasFieldPopUp(extras) {
      this.hideScrollbar = true
      this.extras = extras
      this.extrasTitle = 'Extras'
      this.showExtrasFieldPopUp = true
    },
    closeExtrasFieldPopUp() {
      this.hideScrollbar = false
      this.showExtrasFieldPopUp = false
    },
    openNoteFieldPopUp(note) {
      this.hideScrollbar = true
      this.note = note
      this.extrasTitle = 'Anmerkung'
      this.showNoteFieldPopUp = true
    },
    closeNoteFieldPopUp() {
      this.hideScrollbar = false
      this.showNoteFieldPopUp = false
    },
    updateSelectedOption(variation_name, fieldName) {
      for (let variation of this.itemData_extended.variations) {
        if (variation.fieldName == fieldName) {
          for (let option of variation.options) {
            if (option.name == variation_name) {
              option.selected = true
            } else {
              option.selected = false
            }
          }
        }
      }
    },
    updateSelectedExtra(extra_name) {
      for (let extra of this.itemData_extended.extras) {
        if (extra.name == extra_name) {
          extra.selected = !extra.selected
        }
      }
    },
    updateNote(note) {
      this.itemData_extended.note = note
    },
    updateQuantity(quantity) {
      this.itemData_extended.quantity = quantity
    },
    updateTotal(total) {
      this.itemData_extended.total = total
    },
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
  padding: 10px 20px 20px 20px;
  background-color: var(--main-bg-white);
  z-index: 10;
}

.close-btn__spacer {
  height: 15px;
  min-height: 5px;
  flex-shrink: 100;
}

.header__spacer {
  height: 30px;
  min-height: 5px;
  flex-shrink: 100;
}

.slider {
  max-height: 110px;
  width: 100%;
  overflow: hidden;
}

.slider__spacer {
  height: 30px;
  min-height: 26px;
}

.field-container {
  display: flex;
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  scroll-behavior: smooth;
  width: 100%;
}

.field-container::-webkit-scrollbar {
  width: 5px;
}

.field-container::-webkit-scrollbar-track {
  background-color: #d9d9d9;
  border-radius: 8px;
}

.field-container::-webkit-scrollbar-thumb {
  background-color: #999;
  border-radius: 8px;
}

.swipe-icon {
  width: 30px;
  height: 30px;
  position: relative;
  bottom: 29px;
}

.total-add__spacer {
  height: 56px;
  min-height: 5px;
  flex-shrink: 100;
}

.total-add__placeholder {
  flex-shrink: 0;
  height: 128px;
}

.total-add__container {
  position: absolute;
  bottom: 20px;
}

.hideScrollbar {
  overflow: hidden;
}

.Modal-enter-active,
.Modal-leave-active {
  transition: all 0.5s ease;
}

.Modal-enter,
.Modal-leave-to {
  transform: translateY(100%);
}
</style>