<template>
  <div class="wrapper">
    <div class="main-flex-container">
      <div @click="toggleOutputExtended" class="left-side">
        <p class="name">{{ nameOutput }}</p>
        <p class="price">{{ orderItemPrice }}</p>
        <p v-if="orderItem.variations || orderItem.extras" class="details">
          {{ detailsOutput }}
        </p>
        <p v-if="orderItem.note && showNote" class="details note">
          {{ noteOutput }}
        </p>
      </div>
      <div class="right-side">
        <QuantityOrderItem
          :orderItem="orderItem"
          @openEditQuantityPopUp="openEditQuantityPopUp"
        />
        <EditOrderItem
          :orderItem="orderItem"
          @openEditNotePopUp="openEditNotePopUp"
        />
        <DeleteOrderItem :orderItemId="orderItem.id" />
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
import QuantityOrderItem from '@/components/OrderOverview/OrderItem/QuantityOrderItem'
import EditOrderItem from '@/components/OrderOverview/OrderItem/EditOrderItem'
import DeleteOrderItem from '@/components/OrderOverview/OrderItem/DeleteOrderItem'

export default {
  components: {
    QuantityOrderItem,
    EditOrderItem,
    DeleteOrderItem,
  },
  emits: ['openEditQuantityPopUp', 'openEditNotePopUp'],
  props: {
    orderItem: {
      required: true,
    },
  },
  data() {
    return {
      outputExtended: false,
      showNote: true,
    }
  },
  computed: {
    nameOutput() {
      if (this.outputExtended === false && this.orderItem.name.length > 17) {
        return this.orderItem.name.slice(0, 17) + '...'
      } else {
        return this.orderItem.name
      }
    },
    noteOutput() {
      if (this.outputExtended === false && this.orderItem.note.length > 27) {
        return this.orderItem.note.slice(0, 27) + '...'
      } else {
        return this.orderItem.note
      }
    },
    detailsOutput() {
      let output = ''
      for (let variation of this.orderItem.variations) {
        for (let option of variation.options) {
          if (option.selected) {
            output += option.name + ', '
          }
        }
      }
      for (let extra of this.orderItem.extras) {
        if (extra.selected) {
          output += 'mit ' + extra.name + ', '
        }
      }
      // remove trailing comma and whitespace
      output = output.slice(0, output.length - 2)

      if (this.outputExtended === false) {
        if (output) {
          this.showNote = false
          if (output.length > 27) {
            output = output.slice(0, 27) + '...'
          }
        } else {
          this.showNote = true
        }
        if (output && this.orderItem.note) {
          output = output + '...'
        }
      } else {
        this.showNote = true
      }

      return output
    },
    orderItemPrice() {
      let total = 0.0
      // price
      total = parseFloat(this.orderItem.price.slice(0, -2).replace(',', '.'))
      // price has to be the selected one, in case of different sizes and similar cases
      for (let variation of this.orderItem.variations) {
        for (let option of variation.options) {
          if (option.selected && option.price) {
            if (variation.fieldName === 'Größe') {
              total = parseFloat(option.price.slice(0, -2).replace(',', '.'))
            }
          }
        }
      }
      // variations
      for (let variation of this.orderItem.variations) {
        for (let option of variation.options) {
          if (
            option.selected &&
            option.price &&
            variation.fieldName != 'Größe'
          ) {
            total += parseFloat(option.price.slice(0, -2).replace(',', '.'))
            if (variation.fieldName === 'Größe') {
            }
          }
        }
      }
      // extras
      for (let extra of this.orderItem.extras) {
        if (extra.selected && extra.price) {
          total += parseFloat(extra.price.slice(0, -2).replace(',', '.'))
        }
      }
      // quantity
      total *= this.orderItem.quantity
      // transform to euro style
      total = total.toFixed(2).toString()
      total = total.replace('.', ',') + ' €'

      // update the total inside orderItem
      const payload = {
        updatedTotal: total,
        orderItemId: this.orderItem.id,
      }
      this.$store.dispatch('updateTotal', payload)
      return total
    },
  },
  methods: {
    openEditQuantityPopUp() {
      this.$emit('openEditQuantityPopUp', this.orderItem)
    },
    openEditNotePopUp() {
      this.$emit('openEditNotePopUp', this.orderItem)
    },
    toggleOutputExtended() {
      this.outputExtended = !this.outputExtended
    },
  },
}
</script>

<style scoped>
.wrapper {
  padding-right: 15px;
}
.main-flex-container {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.left-side {
  flex-direction: column;
}

.name {
  font-size: 18px;
  font-weight: 900;
  color: var(--main-text-blue);
}

.price {
  font-size: 16px;
  font-weight: 600;
  color: var(--descr-text-grey);
  margin: 5px 0px;
}

.details {
  font-size: 14px;
  color: var(--details-text-lightGrey);
}

.note {
  margin-top: 5px;
}

.right-side {
  display: flex;
  flex-direction: row;
  align-self: flex-start;
}

.line {
  width: 100%;
  height: 1.5px;
  background-color: #999;
  margin-top: 20px;
}
</style>