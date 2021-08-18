<template>
  <PopUp @closePopUp="$emit('closeInfoPopUp')" :title="title">
    <template #default>
      <div class="empty-state" v-if="allergene.length == 0">Es liegen keine weiteren Informationen vor.</div>
      <ul>
        <li v-for="allergen in allergene" :key="allergen">{{ allergen }}</li>
      </ul>
    </template>
  </PopUp>
</template>

<script>
import PopUp from '@/components/UI/PopUp'

export default {
  emits: ['closeInfoPopUp'],
  components: {
    PopUp,
  },
  props: {
    title: {
      required: false,
      default: 'Allergene'
    },
    allergene: {
      required: true
    },
  },
}
</script>

<style scoped>
ul {
  padding-left: 17px;
  padding-right: 15px;
  height: 110px;
  overflow: auto;
}

ul::-webkit-scrollbar {
  width: 5px;
}

ul::-webkit-scrollbar-thumb {
  background-color: #999;
  border-radius: 8px;
}

ul::-webkit-scrollbar-track {
  background-color: #d9d9d9;
  border-radius: 8px;
}

ul {
  overflow-x: hidden;
}

li {
  font-weight: 600;
  font-size: 17px;
  color: var(--descr-text-grey);
}
</style>